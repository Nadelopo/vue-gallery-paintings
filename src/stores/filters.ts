import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', () => {
  const authorId = ref<number | null>(null)
  const locationId = ref<number | null>(null)
  const searchValue = ref('')

  return { authorId, locationId, searchValue }
})
