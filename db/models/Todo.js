const mongoose = require('mongoose')

// Define a schema
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  createdAt: String,
  updatedAt: String
})

// Create a model based on the schema
const Todo = mongoose.model('Todo', todoSchema)

// Export the model
module.exports = Todo
