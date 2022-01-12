
const tableName = process.env.SAMPLE_TABLE;

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.lambdaHandler = async (event) => {

  const id = event.pathParameters.id;
 
  var params = {
    TableName : tableName,
    Key: { 
      id: id 
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
    body: JSON.stringify(item)
  };

  return response;
}
