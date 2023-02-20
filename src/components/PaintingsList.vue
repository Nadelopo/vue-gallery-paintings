<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'
import PaintingBlock from './PaintingBlock.vue'
import Skeleton from './Skeleton.vue'

const { paintings, limit, isLoad, totalPages } = storeToRefs(useDataStore())
</script>
<template>
  <div class="grid">
    <PaintingBlock
      :item="painting"
      v-for="painting in paintings"
      :key="painting.id"
    />
    <template v-if="isLoad === 'pending'">
      <Skeleton v-for="i in limit" :key="i" />
    </template>
  </div>
  <template v-if="isLoad === 'fulfilled' && !totalPages">
    <div class="empty">ничего не найдено</div>
  </template>
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

.empty
  font-size: 22px
  text-align: center
</style>
