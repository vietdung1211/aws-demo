const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;

var crypto = require('crypto-js');

exports.handler = async (event) => {

    const id = event.pathParameters.id;

    const body = JSON.parse(event.body)
    const username = body.username;
    const password = body.password;

    var params = {
        TableName : tableName,
        Key: {
            id : id
        },
        UpdateExpression: 'set #a = :a, #p = :p ',
        // ConditionExpression: '#a < :MAX',
        ExpressionAttributeNames: {'#a' : 'username','#p' : 'password'},
        ExpressionAttributeValues: {
          ':a' : username,
          ':p' : password,
        }
    };

    const result = await docClient.update(params).promise();

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,GET,PATCH",
        },
        body: JSON.stringify(body)
    };

    return response;
}
