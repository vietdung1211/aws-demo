const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;

exports.lambdaHandler = async (event) => {

    const id = event.pathParameters.id;

    var params = {
        TableName : tableName,
        Key: {
            id : id
        }
    };

    const result = await docClient.delete(params).promise();

    const response = {
        'statusCode': 404,
        'headers': {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,GET,PATCH",
        },
        'body': JSON.stringify({
            message: 'success',
        })
    };

    return response;
}
