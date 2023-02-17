<script setup lang="ts">
import Search from './Search.vue'
</script>
<template>
  <div class="root">
    <Search />
  </div>
</template>
<style scoped lang="sass">
.root
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr
  grid-gap: 20px

@media (max-width: 767px)
  .root
    justify-items: center
    grid-template-columns: 1fr
</style>
