<script setup>
import AppHeader from './components/AppHeader.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <AppHeader />
  <NavBar />
  <main class="page">
    <router-view />
  </main>
</template>
