import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFiltersStore = defineStore('filters', () => {
  const searchValue = ref('')
  const authorId = ref<number | null>(null)
  const locationId = ref<number | null>(null)
  const createdFrom = ref('')
  const createdBefore = ref('')

  return {
    authorId,
    locationId,
    searchValue,
    createdFrom,
    createdBefore
  }
})
