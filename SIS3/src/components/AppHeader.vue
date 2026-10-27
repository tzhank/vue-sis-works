<script setup>
import { useRouter } from 'vue-router'
import { auth, logout } from '../auth'

const router = useRouter()
function signOut() {
  logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="header">
    <router-link to="/" class="brand">Recipe Book</router-link>
    <div class="who">
      <template v-if="auth.user">
        <span>Hi, {{ auth.user.firstName || auth.user.username }}</span>
        <button class="btn btn-ghost" @click="signOut">Log out</button>
      </template>
      <router-link v-else to="/login" class="btn">Log in</router-link>
    </div>
  </header>
</template>
