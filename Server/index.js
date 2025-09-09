const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express(); // for creating express do this!
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test");

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findById(id);
    if (!todo) return res.status(404).json({ message: "Task not found" });
    const updated = await TodoModel.findByIdAndUpdate(
      id,
      { done: !todo.done }, // This toggles the checkbox
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(3000, () => {
  console.log("Server is Running on port http://localhost:3000");
});
