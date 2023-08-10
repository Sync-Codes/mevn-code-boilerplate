/* eslint-disable no-undef */
const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  createdAt: String,
  updatedAt: String
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
