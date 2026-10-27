<script setup>
import { auth } from '../auth'
</script>

<template>
  <nav class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/recipes">Recipes</router-link>
    <router-link v-if="auth.token" to="/recipes/new">Add recipe</router-link>
    <router-link v-else to="/login">Login</router-link>
  </nav>
</template>
