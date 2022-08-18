const db = require("mongoose");

const url = "mongodb://localhost:27017/TodoDB";
db.connect(url);

exports.createModel = (inputName, inputSchema) => {
  const modelSchema = new db.Schema(inputSchema);
  return db.model(inputName, modelSchema);
};
