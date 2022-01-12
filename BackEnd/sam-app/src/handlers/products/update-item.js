const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;

exports.handler = async (event) => {

    const id = event.pathParameters.id;

    const body = JSON.parse(event.body)
    const avatar = body.avatar;
    const price = body.price;
    const product_name = body.product_name;

    var params = {
        TableName : tableName,
        Key: {
            id : id
        },
        UpdateExpression: 'set #a = :a, #p = :p, #pn = :pn ',
        // ConditionExpression: '#a < :MAX',
        ExpressionAttributeNames: {'#a' : 'avatar','#p' : 'price','#pn' : 'product_name'},
        ExpressionAttributeValues: {
          ':a' : avatar,
          ':p' : price,
          ':pn' : product_name,
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
