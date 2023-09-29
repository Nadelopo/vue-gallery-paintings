<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'
import { useFiltersStore } from '@/stores/filters'
import Dropdown from './Dropdown.vue'
import Search from './Search.vue'
import DropdownInputs from './DropdownInputs.vue'

const router = useRouter()
const route = useRoute()

const { setPaintings, setAdditionalInformation } = useDataStore()
const { authors, locations, page, limit, totalPages } = storeToRefs(
  useDataStore()
)
const { authorId, locationId, searchValue, createdBefore, createdFrom } =
  storeToRefs(useFiltersStore())

const formatedLocations = computed(() => {
  return locations.value.map((l) => ({
    id: l.id,
    name: l.location
  }))
})

watch(
  [authorId, locationId, page, createdFrom, createdBefore, searchValue, limit],
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

const setValuesFromQueryParams = () => {
  const query = route.query
  searchValue.value = query.q ? String(query.q) : ''
  authorId.value = query.authorId ? Number(query.authorId) : null
  locationId.value = query.locationId ? Number(query.locationId) : null
  page.value = query.page ? Number(query.page) : 1
  createdFrom.value = query.createdFrom ? String(query.createdFrom) : ''
  createdBefore.value = query.createdBefore ? String(query.createdBefore) : ''
}

watch(
  () => route.query,
  async (_, old) => {
    setValuesFromQueryParams()
    if (Object.keys(old).length === 0) {
      await setAdditionalInformation()
      await setPaintings()
      if (page.value > totalPages.value) {
        page.value = totalPages.value
      }
    } else {
      setPaintings()
    }
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
