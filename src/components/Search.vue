<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { debounce } from '@/utils/debounce'
import { storeToRefs } from 'pinia'

const { setPaintings } = useDataStore()
const { page, searchValue } = storeToRefs(useDataStore())

const oInput = debounce(300, () => {
  setPaintings()
  page.value = 1
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
