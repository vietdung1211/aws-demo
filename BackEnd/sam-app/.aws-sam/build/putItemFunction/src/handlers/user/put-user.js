const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;
exports.handler = async (event) => {

    const body = JSON.parse(event.body)
    const id = body.id;
    const username = body.username;
    const password = body.password;

    var params = {
        TableName : tableName,
        Item: {
            id : id, 
            username: username,
            password: password
        }
    };

    const result = await docClient.put(params).promise();

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
