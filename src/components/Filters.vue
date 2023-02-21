<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'
import Dropdown from './Dropdown.vue'
import Search from './Search.vue'
import { useFiltersStore } from '@/stores/filters'
import { computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import DropdownInputs from './DropdownInputs.vue'

const router = useRouter()
const route = useRoute()

const { setPaintings } = useDataStore()
const { authors, locations, page } = storeToRefs(useDataStore())
const { authorId, locationId, searchValue, createdBefore, createdFrom } =
  storeToRefs(useFiltersStore())

const formatedLocations = computed(() => {
  return locations.value.map((l) => ({
    id: l.id,
    name: l.location
  }))
})

watch(
  () => [
    authorId.value,
    locationId.value,
    page.value,
    createdFrom.value,
    createdBefore.value,
    searchValue.value
  ],
  () => {
    router.push({
      query: {
        ...route.query,
        page: page.value,
        authorId: authorId.value,
        locationId: locationId.value,
        createdFrom: createdFrom.value,
        createdBefore: createdBefore.value,
        q: searchValue.value
      }
    })
  }
)

watch(
  () => route.query,
  (cur) => {
    searchValue.value = cur.q ? String(cur.q) : ''
    authorId.value = cur.authorId ? Number(cur.authorId) : null
    locationId.value = cur.locationId ? Number(cur.locationId) : null
    page.value = cur.page ? Number(cur.page) : 1
    createdFrom.value = cur.createdFrom ? String(cur.createdFrom) : ''
    createdBefore.value = cur.createdBefore ? String(cur.createdBefore) : ''
    setPaintings()
  }
)
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
    <DropdownInputs
      title="Created"
      v-model:value-from="createdFrom"
      v-model:value-before="createdBefore"
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
