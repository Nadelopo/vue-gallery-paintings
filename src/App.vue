<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { usePaintingsStore } from '@/stores/paintings'

const { setPaintings } = usePaintingsStore()
setPaintings()
</script>

<template>
  <header class="container">
    <Navbar />
  </header>

  <main class="container"></main>
</template>

<style scoped></style>
