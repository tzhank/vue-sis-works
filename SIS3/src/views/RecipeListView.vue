<script setup>
import { ref, onMounted } from 'vue'
import api, { errorText } from '../api/axios'
import Loader from '../components/Loader.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import RecipeCard from '../components/RecipeCard.vue'

const recipes = ref([])
const search = ref('')
const loading = ref(true)
const error = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    const url = search.value.trim() ? '/recipes/search' : '/recipes'
    const { data } = await api.get(url, { params: { q: search.value.trim() || undefined, limit: 12 } })
    recipes.value = data.recipes
  } catch (e) {
    error.value = errorText(e)
  } finally {
    loading.value = false
  }
}
onMounted(load)
</script>

<template>
  <div class="row">
    <h1>Recipes</h1>
    <form class="search" @submit.prevent="load">
      <input v-model="search" placeholder="Search by name, e.g. pizza" aria-label="Search recipes" />
      <button class="btn">Search</button>
    </form>
  </div>

  <Loader v-if="loading" />
  <ErrorMessage v-else-if="error" :message="error" @retry="load" />
  <p v-else-if="!recipes.length" class="hint">No recipes found. Try another word.</p>
  <div v-else class="grid">
    <RecipeCard v-for="r in recipes" :key="r.id" :recipe="r" />
  </div>
</template>
