<template>
  <form @submit.prevent="addTodo" class="flex flex-row py-2 gap-2">
    <input v-model="newTodo" placeholder="New Task" class="px-3 rounded bg-sky-200">
    <button type="submit" class="px-2 py-1 bg-amber-600 rounded font-bold text-amber-100 text-base hover:bg-amber-800">Add Task</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newTodo: ''
    };
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.$emit('add', { title: this.newTodo, completed: false });
        this.newTodo = '';
      }
    }
  }
};
</script>