const express = require("express");
const bodyParser = require("body-parser");

const { createTodo, getTodos, deleteById } = require(__dirname +
  "/models/todo");

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

app.post("/", async (req, res) => {
  try {
    const { newItem = null, button = null } = req.body;

    switch (button) {
      case "Work":
        await createTodo({ name: newItem, category: "work" });
        res.redirect("/work");
        break;
      default:
        await createTodo({ name: newItem, category: "general" });
        res.redirect("/");
    }
  } catch (err) {
    console.log("Error: unable to create new todo: ", err);
  }
});

app.post("/delete/:category", async (req, res) => {
  try {
    const category = req.params.category || null;
    const root = category === "root" ? "/" : `/${category}`;
    await deleteById(req.body.checkboxId);
    res.redirect(root);
  } catch (err) {
    console.log("Error: unable to delete todo: ", err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
