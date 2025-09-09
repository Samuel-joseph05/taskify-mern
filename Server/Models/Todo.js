const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: String,
  done: {
    type: Boolean,
    default: false,
  },
});
//model creation (name,schema)|name of the database is todos
const TodoModel = mongoose.model("todos", TodoSchema);
module.exports = TodoModel;
