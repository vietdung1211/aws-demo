
const tableName = process.env.SAMPLE_TABLE;
const AWS = require('aws-sdk');
var dynDB = new AWS.DynamoDB();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var descriptors = ['L', 'M', 'N', 'S'];

function flatten(o) {

  // flattens single property objects that have descriptors  
  for (let d of descriptors) {
    if (o.hasOwnProperty(d)) {
      return o[d];
    }
  }

  Object.keys(o).forEach((k) => {

    for (let d of descriptors) {
      if (o[k].hasOwnProperty(d)) {
        o[k] = o[k][d];
      }
    }
    if (Array.isArray(o[k])) {
      o[k] = o[k].map(e => flatten(e))
    } else if (typeof o[k] === 'object') {
      o[k] = flatten(o[k])
    }
  });

  return o;
}

exports.lambdaHandler = async (event) => {

    const body = JSON.parse(event.body)
    const username_client = body.username;
    const password_client = body.password;

    var myPassword = crypto.Cipher('aes-128-cbc', password_client);
    var hashPassword = myPassword.update('abc', 'utf8', 'hex')
    hashPassword += myPassword.final('hex');
          
    var statement = `SELECT * FROM "${tableName}"."username-index" WHERE "username"  = '${username_client}' `;
    
    let data = await dynDB.executeStatement({Statement: statement}).promise();

    if(data.Items.length == 0){
      response = {
        'statusCode': 405,
        'headers': {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,GET,PATCH",
        },
        'body': JSON.stringify({
            statusCode: 405,
            message: 'username incorrect',
        })
      };
    }else{
      let listconnect = flatten(data);

      var password_server = listconnect.Items[0].password;

      var older_token = jwt.sign({ username: username_client, password: password_client, iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

    if(password_server == hashPassword){
        response = {
            'statusCode': 200,
            'headers': {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,GET,PATCH",
            },
            'body': JSON.stringify({
                statusCode: 200,
                token: older_token,
                message: 'success',
            })
        };
      }else{
          response = {
              'statusCode': 404,
              'headers': {
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,GET,PATCH",
              },
              'body': JSON.stringify({
                  statusCode: 406,
                  message: 'password incorrect',
              })
          };
      }
    }

  return response;
}
