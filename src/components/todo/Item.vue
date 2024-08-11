<template>
  <div class="px-5 py-2 flex flex-col space-y-3 bg-sky-500 rounded">
    <div class="flex flex-row">
      <input v-if="!isEdit" type="checkbox" :checked="todo.completed" @change="handleComplete" class="w-4 mr-3 accent-amber-300 hover:accent-amber-200" />
      <div class="flex flex-col justify-between gap-2">
        <p v-if="!isEdit" :class="{ completed: todo.completed }" class="text-sky-50 text-lg">{{ todo.title }}</p>
        <div class="flex flex-row gap-2 ">
          <button v-if="!isEdit" @click="handleEdit" class="px-2 py-1 bg-sky-600 rounded font-bold text-sky-100 text-base hover:bg-sky-800">Edit</button>
          <button v-if="!isEdit" @click="handleDelete" class="px-2 py-1 bg-red-600 rounded font-bold text-red-100 text-base hover:bg-red-800">Delete</button>
        </div>
      </div>
    </div>

    <div v-if="isEdit" class="flex flex-col p-3">
      <div class="flex flex-row gap-2">
        <input v-model="title" @keyup.enter="save" class="px-3 rounded bg-sky-200" />
        <button @click="save" class="px-2 py-1 bg-sky-600 rounded font-bold text-sky-100 text-base hover:bg-sky-800">Save</button>
        <button @click="cancel" class="px-2 py-1 bg-red-600 rounded font-bold text-red-100 text-base hover:bg-red-800">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['todo'],

  data() {
    return {
      isEdit: false,
      title: this.todo.title
    };
  },

  methods: {
    handleEdit() {
      this.isEdit = true;
      this.title = this.todo.title;
    },
    handleComplete() {
      this.$emit('update', this.todo.id, { completed: !this.todo.completed });
    },
    save() {
      if (this.title.trim() !== this.todo.title) {
        this.$emit('update', this.todo.id, { title: this.title.trim() });
      }
      this.isEdit = false;
    },
    cancel() {
      this.isEdit = false;
      this.title = this.todo.title;
    },
    handleDelete() {
      if (confirm('Are you sure?')) {
        this.$emit('delete', this.todo.id);
      }
    }
  }
}
</script>