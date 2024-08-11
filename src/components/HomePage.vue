<template>
  <div class="flex justify-start p-5 bg-sky-800 min-h-screen">
    <div class="flex flex-col">
      <p class="text-4xl font-bold pb-3 text-sky-50">Todo List</p>
      <form-todo @add="addTodo" />
      <div class="flex flex-col gap-3">
        <div v-for="todo in todos" :key="todo.id">
          <item-todo :todo="todo" @update="updateTodo" @delete="deleteTodo" />
        </div>
        <div class="flex flex-row gap-2 bg-amber-300 w-fit rounded-lg">
          <button @click="prev" :disabled="page === 1" class="px-2 py-1 bg-amber-600 rounded-l-lg font-bold text-amber-100 text-base hover:bg-amber-800">Previous</button>
          <p class="text-xl px-3 text-amber-800">{{ this.page }}</p>
          <button @click="next" :disabled="todos.length === 0" class="px-2 py-1 bg-amber-600 rounded-r-lg font-bold text-amber-100 text-base hover:bg-amber-800">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/todos"
import ItemTodo from "@/components/todo/Item.vue";
import FormTodo from "@/components/todo/Form.vue";

export default {
  name: "HomePage",
  components: { ItemTodo, FormTodo },
  data() {
    return {
      todos: [],
      page: 1,
      size: 5
    };
  },

  methods: {
    async fetchTodo() {
      const response = await api.getTodo(this.page, this.size);
      this.todos = response.data;
    },
    async addTodo(todo) {
      const response = await api.addTodo(todo);
      this.todos.unshift(response.data);
    },
    async updateTodo(id, todo) {
      await api.updateTodo(id, todo);
      const idx = this.todos.findIndex((item) => item.id === id);
      if (idx !== -1) {
        this.todos[idx] = { ...this.todos[idx], ...todo }
      }
    },
    async deleteTodo(id) {
      await api.deleteTodo(id);
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    prev() {
      if (this.page > 1) {
        this.page--;
        this.fetchTodo();
      }
    },
    next() {
      this.page++;
      this.fetchTodo();
    }
  },

  mounted() {
    this.fetchTodo();
  }
};
</script>