/* eslint-disable no-undef */
const mongoose = require('mongoose')
const Todo = require('./db/models/Todo')
require('dotenv').config()

const moment = require('moment')

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) => console.log(err))
})

app.post('/newTodo', (req, res) => {
  const newTodo = new Todo({
    title: 'New Todo',
    completed: false,
    createdAt: moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')
  })
})

app.listen(5000, () => {
  console.log('Server started on port 5000')
})
