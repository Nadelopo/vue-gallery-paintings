<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useDataStore } from '@/stores/data'
import { useFiltersStore } from '@/stores/filters'
import { debounce } from '@/utils/debounce'

const router = useRouter()
const route = useRoute()

const { page } = storeToRefs(useDataStore())
const { searchValue } = storeToRefs(useFiltersStore())

const oInput = debounce(300, () => {
  page.value = 1
  router.push({
    query: {
      ...route.query,
      q: searchValue.value
    }
  })
})
</script>
<template>
  <div>
    <input
      v-model="searchValue"
      className="filter__wrapper"
      placeholder="Name"
      type="text"
      @input="oInput"
    />
  </div>
</template>
