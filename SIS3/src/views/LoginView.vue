<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api, { errorText } from '../api/axios'
import { setSession } from '../auth'

const MY_USERNAME = 'zhankylysh'
const MY_PASSWORD = '12345'
const MY_NAME = 'Zhankylysh'

const route = useRoute()
const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  if (username.value !== MY_USERNAME || password.value !== MY_PASSWORD) {
    error.value = 'Wrong username or password.'
    return
  }
  loading.value = true
  try {
    // DummyJSON accepts only its own users, so we get a real token with its demo account
    const { data } = await api.post('/auth/login', {
      username: 'emilys',
      password: 'emilyspass',
      expiresInMins: 60,
    })
    setSession({ ...data, username: MY_USERNAME, firstName: MY_NAME })
    router.push(route.query.redirect || { name: 'recipes' })
  } catch (e) {
    error.value = errorText(e)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="panel narrow">
    <h1>Log in</h1>
    <p class="hint">Demo account: zhankylysh / 12345</p>
    <div v-if="error" class="error" role="alert"><p>{{ error }}</p></div>
    <form @submit.prevent="submit">
      <label>Username <input v-model="username" required autocomplete="username" /></label>
      <label>Password <input v-model="password" type="password" required autocomplete="current-password" /></label>
      <button class="btn" :disabled="loading">{{ loading ? 'Logging in…' : 'Log in' }}</button>
    </form>
  </div>
</template>
