const db = require("../db");

const Todo = db.createModel("todo", {
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  category: {
    type: String,
    enum: ["work", "general"],
    required: true,
  },
});

exports.createTodo = async (todo) => {
  const todoObj = new Todo(todo);
  await todoObj.save();
  return todoObj;
};

exports.getTodos = async (filterObj = {}, projectionObj = []) => {
  return await Todo.find(filterObj, projectionObj);
};