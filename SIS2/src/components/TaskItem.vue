<template>
  <div>
    <b>{{ task.title }}</b> - {{ task.description }}
    <span v-if="task.completed"> ✔ Completed</span>
    <span v-else> Active</span>
    <br />
    Created: {{ task.createdAt }}
    Priority:
    <select :value="task.priority" @change="$emit('change-priority', task.id, $event.target.value)">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <button @click="$emit('complete-task', task.id)">Complete</button>
    <button @click="$emit('delete-task', task.id)">Delete</button>
    <hr />
  </div>
</template>

<script>
export default {
  props: {
    task: { type: Object, required: true }
  }
}
</script>