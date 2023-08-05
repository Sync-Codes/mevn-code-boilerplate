<script>
export default {
  name: 'App',
  data() {
    return {
      newTodo: '',
      todos: []
    }
  },
  async mounted() {
    this.getTodos()
  },

  methods: {
    async createTodo() {
      try {
        const response = await fetch('http://localhost:5000/newTodo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: this.newTodo,
            completed: false
          })
        })

        if (!response.ok) {
          throw new Error('Failed to create todo.')
        }

        const todo = await response.json()
        this.todos.push(todo) // Add the new todo to the list
        this.newTodo = '' // Clear the input field
      } catch (error) {
        console.error('Error creating todo:', error.message)
      }
    },

    async getTodos() {
      try {
        const response = await fetch('http://localhost:5000/todos')

        if (!response.ok) {
          throw new Error('Failed to fetch todos.')
        }

        const todos = await response.json()
        this.todos = todos
        console.log(todos)
      } catch (error) {
        console.error('Error fetching todos:', error.message)
      }
    },

    async deleteTodo(todoId) {
      try {
        const response = await fetch(`http://localhost:5000/deleteTodo/${todoId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to delete todo.')
        }

        // Remove the deleted todo from the todos array
        this.todos = this.todos.filter((todo) => todo._id !== todoId)
      } catch (error) {
        console.error('Error deleting todo:', error.message)
      }
    },
    async toggleTodo(todoId) {
      try {
        const response = await fetch(`http://localhost:5000/toggleTodo/${todoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to toggle todo.')
        }

        // Update the todo in the todos array
        this.todos = this.todos.map((todo) => {
          if (todo._id === todoId) {
            todo.completed = !todo.completed
          }
          return todo
        })
      } catch (error) {
        console.error('Error toggling todo:', error.message)
      }
    }
  }
}
</script>

<template>
  <div class="container m-auto p-3 font-inter">
    <main class="flex flex-col items-center">
      <h1 class="mt-10 text-white font-semibold text-5xl">Vue Todo App</h1>
      <div class="flex justify-center mt-12">
        <input
          type="text"
          class="w-full rounded-md py-3 px-4"
          placeholder="Add todo"
          v-model="newTodo"
        />
        <button @click="createTodo" class="bg-teal-500 rounded-md py-3 px-4 ml-2">Create</button>
      </div>
      <ul class="mt-6 flex justify-start flex-col">
        <li v-for="(todo, index) in todos" :key="index" class="text-white text-xl">
          <input
            class="peer mr-2"
            type="checkbox"
            name=""
            id="isCompleted"
            :checked="todo.completed"
            @change="toggleTodo(todo._id)"
          />
          <span
            class="font-medium peer-checked:line-through peer-checked:text-gray-300"
            @dblclick="deleteTodo(todo._id)"
            >{{ todo.title }}</span
          >
        </li>
      </ul>
    </main>
  </div>
</template>
