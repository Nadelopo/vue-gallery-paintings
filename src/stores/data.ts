import { ref } from 'vue'
import { defineStore } from 'pinia'
import { get } from '@/utils/queries'
import { useFiltersStore } from './filters'

interface Painting {
  authorId: number
  created: string
  id: number
  imageUrl: string
  locationId: number
  name: string
}

export interface VisiblePainting extends Painting {
  author: string
  location: string
}

interface Author {
  id: number
  name: string
}

interface Location {
  id: number
  location: string
}

export const useDataStore = defineStore('data', () => {
  const paintings = ref<VisiblePainting[]>([])
  const authors = ref<Author[]>([])
  const locations = ref<Location[]>([])
  const page = ref(1)
  const limit = ref(window.screen.width >= 1024 ? 9 : 12)
  const totalPages = ref(0)
  const isLoad = ref<'pending' | 'fulfilled' | 'rejected'>('pending')

  const setPaintings = async () => {
    const filters = useFiltersStore()
    isLoad.value = 'pending'
    paintings.value = []
    const { result, allItems } = await get<Painting>('paintings', {
      _limit: limit.value,
      _page: page.value,
      q: filters.searchValue,
      authorId: filters.authorId,
      locationId: filters.locationId,
      created_gte: filters.createdFrom,
      created_lte: filters.createdBefore
    })
    const dataPaintings = ref<Painting[]>(result)

    totalPages.value = Math.ceil(allItems / limit.value)
    if (!authors.value.length) {
      authors.value = (await get<Author>('authors')).result
    }
    if (!locations.value.length) {
      locations.value = (await get<Location>('locations')).result
    }

    paintings.value = dataPaintings.value.map((e) => {
      const authorName: string =
        authors.value.find((a) => a.id == e.authorId)?.name || ''
      const locationName: string =
        locations.value.find((a) => a.id == e.locationId)?.location || ''

      return { ...e, author: authorName, location: locationName }
    })
    isLoad.value = 'fulfilled'
  }

  return {
    paintings,
    setPaintings,
    page,
    limit,
    totalPages,
    isLoad,
    authors,
    locations
  }
})
