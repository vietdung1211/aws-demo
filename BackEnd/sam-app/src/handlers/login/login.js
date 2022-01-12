
const tableName = process.env.SAMPLE_TABLE;

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.handler = async (event) => {

  const username = event.pathParameters.username;
  console.log("=============");
  console.log(event.pathParameters);
  
  var params = {
    TableName : tableName,
    Key: { 
        username: username 
    },
  };

  const data = await docClient.get(params).promise();
  const item = data.Item;

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,GET,PATCH",
    },
    body: JSON.stringify(item),
  };

  return response;
}
