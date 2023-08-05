/* eslint-disable no-undef */
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const moment = require('moment')
const cors = require('cors')

const mongoURL = process.env.MONGO_URL
const Todo = require('./db/models/Todo')

const app = express()
app.use(cors()) // to allow cross-origin requests
app.use(express.json()) // to parse incoming requests with JSON payloads

// Connect to MongoDB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('MongoDB Connected')
})

// Get all todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.json(todos)
  })
})

// Create and save a new todo
app.post('/newTodo', (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    completed: req.body.completed,
    createdAt: moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')
  })

  newTodo.save().then((savedTodo) => {
    console.log('Todo created and saved in db')
    res.json(savedTodo) // Return the saved todo as JSON response
  })
})

// toggling a todo
app.put('/toggleTodo/:id', (req, res) => {
  Todo.findById({ _id: req.params.id }).then((todo) => {
    todo.completed = !todo.completed
    todo.updatedAt = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')

    todo.save().then(() => {
      console.log('Todo updated')
      res.json(todo)
    })
  })
})

// deleting a todo
app.delete('/deleteTodo/:id', (req, res) => {
  Todo.findByIdAndDelete({ _id: req.params.id }).then(() => {
    console.log('Todo deleted')
    res.json({ success: true })
  })
})

app.listen(5000, () => {
  console.log('Server running on port 5000')
})
