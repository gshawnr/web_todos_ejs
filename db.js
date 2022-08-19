const db = require("mongoose");
require("dotenv").config();
console.log(process.env);

const url = "mongodb://localhost:27017/TodoDB";
const onlineUrl = `mongodb+srv://${MONGO_USER}:${MONGO_KEY}@gsr-mongo-cluster.kkuknqw.mongodb.net/TodoDB`;

db.connect(onlineUrl);

exports.createModel = (inputName, inputSchema) => {
  const modelSchema = new db.Schema(inputSchema);
  return db.model(inputName, modelSchema);
};
