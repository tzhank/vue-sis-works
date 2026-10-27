<script setup>
defineProps({ recipe: { type: Object, required: true } })
</script>

<template>
  <router-link :to="{ name: 'recipe-details', params: { id: recipe.id } }" class="card">
    <img :src="recipe.image" :alt="recipe.name" loading="lazy" />
    <div class="card-body">
      <h3>{{ recipe.name }}</h3>
      <p class="meta">{{ recipe.cuisine }} · {{ recipe.difficulty }} · {{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }} min</p>
    </div>
  </router-link>
</template>
