<script setup>
import { ref, onMounted } from 'vue'
import api, { errorText } from '../api/axios'
import Loader from '../components/Loader.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import RecipeCard from '../components/RecipeCard.vue'

const featured = ref([])
const loading = ref(true)
const error = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await api.get('/recipes', { params: { limit: 3, sortBy: 'rating', order: 'desc' } })
    featured.value = data.recipes
  } catch (e) {
    error.value = errorText(e)
  } finally {
    loading.value = false
  }
}
onMounted(load)
</script>

<template>
  <section class="hero">
    <h1>What are we cooking today?</h1>
    <p>Browse recipes, open the full ingredient list, and keep your own collection after logging in.</p>
    <router-link to="/recipes" class="btn">Browse all recipes</router-link>
  </section>

  <h2>Top rated</h2>
  <Loader v-if="loading" />
  <ErrorMessage v-else-if="error" :message="error" @retry="load" />
  <div v-else class="grid">
    <RecipeCard v-for="r in featured" :key="r.id" :recipe="r" />
  </div>
</template>
