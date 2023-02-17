<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'
import Dropdown from './Dropdown.vue'
import Search from './Search.vue'
import { useFiltersStore } from '@/stores/filters'
import { computed } from 'vue'

const { authors, locations } = storeToRefs(useDataStore())
const { authorId, locationId } = storeToRefs(useFiltersStore())

const formatedLocations = computed(() => {
  return locations.value.map((l) => ({
    id: l.id,
    name: l.location
  }))
})
</script>

<template>
  <div class="root">
    <Search />
    <Dropdown
      :list="authors"
      title-default="author"
      v-model:name-id="authorId"
    />
    <Dropdown
      :list="formatedLocations"
      title-default="location"
      v-model:name-id="locationId"
    />
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
