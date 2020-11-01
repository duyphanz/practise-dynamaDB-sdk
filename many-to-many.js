const AWS = require("aws-sdk");
const { MtoMItems } = require("./seeding");
const { handleCallback } = require("./utils");

AWS.config.update({
  region: "us-east-1",
});

const dynamodb = new AWS.DynamoDB({
  endpoint: new AWS.Endpoint("http://localhost:8000"),
});

const TableName = "school";

const createTable = () => {
  var params = {
    TableName,
    KeySchema: [
      {
        AttributeName: "PK",
        KeyType: "HASH",
      },
      {
        AttributeName: "SK",
        KeyType: "RANGE",
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: "PK",
        AttributeType: "S", // (S | N | B) for string, number, binary
      },
      {
        AttributeName: "SK",
        AttributeType: "S", // (S | N | B) for string, number, binary
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: "GS1",
        KeySchema: [
          {
            AttributeName: "SK",
            KeyType: "HASH",
          },
          {
            AttributeName: "PK",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "ALL", // (ALL | KEYS_ONLY | INCLUDE)
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
  };
  dynamodb.createTable(params, handleCallback);
};

const putItem = (Item) => {
  var params = {
    TableName,
    Item,
    ConditionExpression: "attribute_not_exists(PK)",
  };
  dynamodb.putItem(params, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
};

const getItem = (Key) => {
  var params = {
    TableName,
    Key,
  };
  dynamodb.getItem(params, handleCallback);
};

const queryClassesOfAStudent = ({ IndexName, PK, SK }) => {
  var params = {
    TableName,
    IndexName,
    KeyConditionExpression: "#SK = :SK and begins_with(#PK, :PK)",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#SK": "SK",
    },
    ExpressionAttributeValues: {
      ":PK": { S: PK },
      ":SK": { S: SK },
    },
  };
  dynamodb.query(params, handleCallback);
};

const queryStudentsOfAClass = ({ PK, SK }) => {
  var params = {
    TableName,
    KeyConditionExpression: "#PK = :PK and begins_with(#SK, :SK)",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#SK": "SK",
    },
    ExpressionAttributeValues: {
      ":PK": { S: PK },
      ":SK": { S: SK },
    },
  };
  dynamodb.query(params, handleCallback);
};

// CALLING FUNCTIONS

// createTable();
// MtoMItems.forEach((i) => putItem(i));
// getItem({ PK: { S: "STUDENT#alex" }, SK: { S: "STUDENT#alex" } });
// getItem({ PK: { S: "CLASS#Physics101" }, SK: { S: "CLASS#Physics101" } });
// queryStudentsOfAClass({ PK: "CLASS#Physics101", SK: "STUDENT" });
// queryClassesOfAStudent({ PK: "CLASS", SK: "STUDENT#alex", IndexName: "GS1" });
