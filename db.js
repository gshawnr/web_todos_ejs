const db = require("mongoose");

require("dotenv").config();
console.log(
  "#########",
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@gsr-mongo-cluster.kkuknqw.mongodb.net/TodoDB`
);

const url = "mongodb://localhost:27017/TodoDB";
const onlineUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@gsr-mongo-cluster.kkuknqw.mongodb.net/TodoDB`;

db.connect(onlineUrl);

exports.createModel = (inputName, inputSchema) => {
  const modelSchema = new db.Schema(inputSchema);
  return db.model(inputName, modelSchema);
};
