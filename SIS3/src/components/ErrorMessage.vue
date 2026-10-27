<script setup>
defineProps({ message: String })
defineEmits(['retry'])
</script>

<template>
  <div class="error" role="alert">
    <p>{{ message }}</p>
    <button class="btn" @click="$emit('retry')">Try again</button>
  </div>
</template>
