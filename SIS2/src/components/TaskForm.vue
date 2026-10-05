<template>
  <BaseCard>
    <template #header>Add new task</template>

    <input v-model="title" placeholder="Title" />
    <input v-model="description" placeholder="Description" />
    <select v-model="priority">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button @click="submit">Add</button>

    <template #footer>
      <span v-if="error" style="color: red">{{ error }}</span>
      <span v-else>Fill in the title and press Add</span>
    </template>
  </BaseCard>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      priority: 'medium',
      error: ''
    }
  },
  methods: {
    submit() {
      if (!this.title.trim()) {
        this.error = 'Title is required'
        return
      }
      this.error = ''
      this.$emit('add-task', {
        title: this.title.trim(),
        description: this.description.trim(),
        priority: this.priority
      })
      this.title = ''
      this.description = ''
      this.priority = 'medium'
    }
  }
}
</script>