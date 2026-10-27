<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import api, { errorText } from '../api/axios'
import { auth } from '../auth'
import Loader from '../components/Loader.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const props = defineProps({ id: String }) // comes from the dynamic route /recipes/:id
const router = useRouter()
const recipe = ref(null)
const loading = ref(true)
const error = ref('')
const deleting = ref(false)

async function load() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await api.get(`/recipes/${props.id}`)
    recipe.value = data
  } catch (e) {
    error.value = e.response?.status === 404 ? 'This recipe does not exist.' : errorText(e)
  } finally {
    loading.value = false
  }
}

async function remove() {
  if (!confirm(`Delete "${recipe.value.name}"?`)) return
  deleting.value = true
  try {
    await api.delete(`/recipes/${props.id}`)
    router.push({ name: 'recipes' })
  } catch (e) {
    error.value = errorText(e)
  } finally {
    deleting.value = false
  }
}

watch(() => props.id, load, { immediate: true })
</script>

<template>
  <Loader v-if="loading" />
  <ErrorMessage v-else-if="error" :message="error" @retry="load" />
  <article v-else-if="recipe" class="details">
    <img :src="recipe.image" :alt="recipe.name" />
    <div>
      <h1>{{ recipe.name }}</h1>
      <p class="meta">
        {{ recipe.cuisine }} · {{ recipe.difficulty }} · prep {{ recipe.prepTimeMinutes }} min · cook {{ recipe.cookTimeMinutes }} min · {{ recipe.servings }} servings
      </p>
      <div v-if="auth.token" class="actions">
        <router-link :to="{ name: 'recipe-edit', params: { id } }" class="btn">Edit</router-link>
        <button class="btn btn-danger" :disabled="deleting" @click="remove">{{ deleting ? 'Deleting…' : 'Delete' }}</button>
      </div>
      <h2>Ingredients</h2>
      <ul><li v-for="(item, i) in recipe.ingredients" :key="i">{{ item }}</li></ul>
      <h2>Steps</h2>
      <ol><li v-for="(step, i) in recipe.instructions" :key="i">{{ step }}</li></ol>
      <router-link to="/recipes" class="back">Back to recipes</router-link>
    </div>
  </article>
</template>
