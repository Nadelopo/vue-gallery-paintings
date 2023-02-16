<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import PaintingsList from '@/components/PaintingsList.vue'
import Pagination from '@/components/Pagination.vue'
</script>

<template>
  <header class="container">
    <Navbar />
  </header>

  <main class="container">
    <PaintingsList />
    <Pagination />
  </main>
</template>

<style scoped></style>
