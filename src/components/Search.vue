<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useFiltersStore } from '@/stores/filters'
import { useDataStore } from '@/stores/data'
import { debounce } from '@/utils/debounce'

const { searchValue } = storeToRefs(useFiltersStore())
const { page } = storeToRefs(useDataStore())

const search = ref('')

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
