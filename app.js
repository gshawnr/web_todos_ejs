const express = require("express");
const bodyParser = require("body-parser");

const { createTodo, getTodos } = require(__dirname + "/models/todo");

const app = express();

// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const todos = await getTodos({ category: "general" });
  res.render("list", {
    title: "General",
    todos,
  });
});

app.get("/work", async (req, res) => {
  const todos = await getTodos({ category: "work" });
  res.render("work", { title: "Work", todos });
});

app.post("/", (req, res) => {
  const { newItem = null, button = null } = req.body;

  switch (button) {
    case "Work":
      createTodo({ name: newItem, category: "work" });
      res.redirect("/work");
      break;
    default:
      createTodo({ name: newItem, category: "general" });
      res.redirect("/");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => `listening on port ${PORT}`);
