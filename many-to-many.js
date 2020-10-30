const AWS = require("aws-sdk");

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
      // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
      {
        // Required HASH type attribute
        AttributeName: "PK",
        KeyType: "HASH",
      },
      {
        // Optional RANGE key type for HASH + RANGE tables
        AttributeName: "SK",
        KeyType: "RANGE",
      },
    ],
    AttributeDefinitions: [
      // The names and types of all primary and index key attributes only
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
  };
  dynamodb.createTable(params, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
};

const items = [
  {
    PK: { S: "STUDENT#alex" },
    SK: { S: "STUDENT#alex" },
    StudentName: { S: "Alex DeBrie" },
    GPA: { N: "3.12" },
    GraduationDate: { S: "2021-05-26" },
  },
  {
    PK: { S: "STUDENT#alber" },
    SK: { S: "STUDENT#alber" },
    StudentName: { S: "Albert Einstein" },
    GPA: { N: "4.0" },
    GraduationDate: { S: "2020-05-14" },
  },
  {
    PK: { S: "STUDENT#dracomalfoy" },
    SK: { S: "STUDENT#dracomalfoy" },
    StudentName: { S: "Draco Malfoy" },
    GPA: { S: "1.87" },
  },
  {
    PK: { S: "CLASS#Physics101" },
    SK: { S: "SEMESTER#Spring2020" },
    ClassName: { S: "Physics 101" },
    Students: { L: [{ S: "Alex DeBrie" }, { S: "Albert Einstein" }] },
  },
  {
    PK: { S: "CLASS#Gym202" },
    SK: { S: "SEMESTER#Spring2020" },
    ClassName: { S: "Gym 202" },
    Students: { L: [{ S: "Draco Malfoy" }, { S: "Alex DeBrie" }] },
  },
];

const putItem = (Item) => {
  var params = {
    TableName,
    Item,
    ConditionExpression: "attribute_not_exists(PK)", // optional String describing the constraint to be placed on an attribute
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
  dynamodb.getItem(params, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
};

// CALLING FUNCTIONS

// createTable();
// items.forEach((i) => putItem(i));
getItem({ PK: { S: "STUDENT#alex" }, SK: { S: "STUDENT#alex" } });
getItem({ PK: { S: "CLASS#Physics101" }, SK: { S: "SEMESTER#Spring2020" } });
