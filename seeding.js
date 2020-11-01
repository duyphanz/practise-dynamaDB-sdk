const MtoMItems = [
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
    SK: { S: "CLASS#Physics101" },
    ClassName: { S: "Physics 101" },
  },
  {
    PK: { S: "CLASS#Physics101" },
    SK: { S: "STUDENT#alex" },
    ClassName: { S: "Physics 101" },
  },
  {
    PK: { S: "CLASS#Physics101" },
    SK: { S: "STUDENT#alber" },
    ClassName: { S: "Physics 101" },
  },
  {
    PK: { S: "CLASS#Gym202" },
    SK: { S: "CLASS#Gym202" },
    ClassName: { S: "Gym 202" },
  },
  {
    PK: { S: "CLASS#Gym202" },
    SK: { S: "STUDENT#dracomalfoy" },
    ClassName: { S: "Gym 202" },
  },
  {
    PK: { S: "CLASS#Gym202" },
    SK: { S: "STUDENT#alex" },
    ClassName: { S: "Gym 202" },
  },
];

module.exports = { MtoMItems };
