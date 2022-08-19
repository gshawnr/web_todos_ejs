const db = require(__dirname + "../../db");

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
  try {
    const todoObj = new Todo(todo);
    await todoObj.save();
    return todoObj;
  } catch (err) {
    throw new Error("Unable to create new todo: ", { cause: err });
  }
};

exports.getTodos = async (filterObj = {}, projectionObj = []) => {
  return await Todo.find(filterObj, projectionObj);
};

exports.deleteById = async (id) => {
  try {
    return await Todo.deleteOne({ _id: id });
  } catch (err) {
    throw new Error("Unable to delete todo: ", { cause: err });
  }
};
