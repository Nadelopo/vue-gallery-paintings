<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useFiltersStore } from '@/stores/filters'
import { debounce } from '@/utils/debounce'
import { ref, watch } from 'vue'
import { useDataStore } from '@/stores/data'

const { searchValue } = storeToRefs(useFiltersStore())
const { page } = storeToRefs(useDataStore())

const search = ref()

const watcher = watch(searchValue, () => {
  if (searchValue.value) {
    search.value = searchValue.value
    watcher()
  }
})

const oInput = debounce(() => {
  searchValue.value = search.value
  page.value = 1
})
</script>
<template>
  <div>
    <input
      v-model="search"
      className="filter__wrapper"
      placeholder="Name"
      type="text"
      @input="oInput"
    />
  </div>
</template>
