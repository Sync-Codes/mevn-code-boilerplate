<script>
export default {
  name: 'App',
  data() {
    return {
      // reactive data properties
    }
  },
  methods: {
    // custom methods
  }
}
</script>

<template>
  // cannot have multiple root elements inside template in vue 2
  <div class="container m-auto p-3 font-inter">
    <main class="flex flex-col items-center">
      <h1 class="mt-10 text-white font-semibold text-5xl">Vue Todo App</h1>
      <div class="flex justify-center mt-12">
        <input
          type="text"
          class="w-full rounded-md py-3 px-4"
          placeholder="Add todo"
        />
        <button class="bg-teal-500 rounded-md py-3 px-4 ml-2">Create</button>
      </div>
      <ul class="mt-6 flex justify-start flex-col">
        <li class="text-white text-xl">
          <input
            class="peer mr-2"
            type="checkbox"
            name=""
            id="isCompleted"
          />
          <span
            class="font-medium peer-checked:line-through peer-checked:text-gray-300"
            ></span
          >
        </li>
      </ul>
    </main>
  </div>
</template>
