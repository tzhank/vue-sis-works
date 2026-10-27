<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api, { errorText } from '../api/axios'
import Loader from '../components/Loader.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const isEdit = computed(() => !!id)

const form = ref({ name: '', cuisine: '', difficulty: 'Easy', prepTimeMinutes: 10, cookTimeMinutes: 20, ingredients: '', instructions: '' })
const loading = ref(isEdit.value)
const saving = ref(false)
const error = ref('')
const done = ref('')

async function load() {
  if (!isEdit.value) return
  loading.value = true
  error.value = ''
  try {
    const { data } = await api.get(`/recipes/${id}`)
    form.value = {
      name: data.name,
      cuisine: data.cuisine,
      difficulty: data.difficulty,
      prepTimeMinutes: data.prepTimeMinutes,
      cookTimeMinutes: data.cookTimeMinutes,
      ingredients: data.ingredients.join('\n'),
      instructions: data.instructions.join('\n'),
    }
  } catch (e) {
    error.value = errorText(e)
  } finally {
    loading.value = false
  }
}

const lines = (text) => text.split('\n').map((s) => s.trim()).filter(Boolean)

async function save() {
  saving.value = true
  error.value = ''
  const payload = { ...form.value, ingredients: lines(form.value.ingredients), instructions: lines(form.value.instructions) }
  try {
    if (isEdit.value) {
      await api.put(`/recipes/${id}`, payload)           // UPDATE
      done.value = 'Recipe updated.'
    } else {
      const { data } = await api.post('/recipes/add', payload) // CREATE
      done.value = `Recipe created (id ${data.id}).`
    }
    // DummyJSON only simulates saving, so the list will not show the change.
    setTimeout(() => router.push({ name: 'recipes' }), 1200)
  } catch (e) {
    error.value = errorText(e)
  } finally {
    saving.value = false
  }
}
onMounted(load)
</script>

<template>
  <div class="panel">
    <h1>{{ isEdit ? 'Edit recipe' : 'Add recipe' }}</h1>
    <Loader v-if="loading" />
    <template v-else>
      <ErrorMessage v-if="error" :message="error" @retry="isEdit && !form.name ? load() : (error = '')" />
      <p v-if="done" class="success" role="status">{{ done }}</p>
      <form @submit.prevent="save">
        <label>Name <input v-model="form.name" required /></label>
        <label>Cuisine <input v-model="form.cuisine" required /></label>
        <label>Difficulty
          <select v-model="form.difficulty"><option>Easy</option><option>Medium</option><option>Hard</option></select>
        </label>
        <div class="two">
          <label>Prep (min) <input v-model.number="form.prepTimeMinutes" type="number" min="0" required /></label>
          <label>Cook (min) <input v-model.number="form.cookTimeMinutes" type="number" min="0" required /></label>
        </div>
        <label>Ingredients (one per line) <textarea v-model="form.ingredients" rows="5" required></textarea></label>
        <label>Steps (one per line) <textarea v-model="form.instructions" rows="5" required></textarea></label>
        <button class="btn" :disabled="saving">{{ saving ? 'Saving…' : 'Save recipe' }}</button>
      </form>
    </template>
  </div>
</template>
