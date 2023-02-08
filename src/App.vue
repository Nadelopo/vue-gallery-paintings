<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import PaintingsList from '@/components/PaintingsList.vue'
</script>

<template>
  <header class="container">
    <Navbar />
  </header>

  <main class="container">
    <PaintingsList />
  </main>
</template>

<style scoped></style>
