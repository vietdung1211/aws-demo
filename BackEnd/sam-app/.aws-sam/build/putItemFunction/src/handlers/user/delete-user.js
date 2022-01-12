const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;

exports.handler = async (event) => {

    const id = event.pathParameters.id;

    var params = {
        TableName : tableName,
        Key: {
            id : id
        }
    };

    console.log(id);

    const result = await docClient.delete(params).promise();

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,GET,PATCH",
        }
    };

    return response;
}
