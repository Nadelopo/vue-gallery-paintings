<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePaintingsStore } from '@/stores/data'
import PaintingBlock from './PaintingBlock.vue'

const { setPaintings } = usePaintingsStore()
const { paintings } = storeToRefs(usePaintingsStore())

setPaintings()
</script>
<template>
  <div class="grid">
    <PaintingBlock
      :item="painting"
      v-for="painting in paintings"
      :key="painting.id"
    />
  </div>
</template>

<style scoepd lang="sass">
.grid
  justify-items: center
  margin-top: 45px
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  grid-gap: 20px
  margin-bottom: 40px

@media (max-width: 1023px)
  .grid
    grid-template-columns: 1fr 1fr

@media (max-width: 767px)
  .grid
    grid-template-columns: 1fr
</style>
