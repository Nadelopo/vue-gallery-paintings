import { ref } from 'vue'
import { defineStore } from 'pinia'
import { get } from '@/utils/queries'
import { useFiltersStore } from './filters'

interface Ipainting {
  authorId: number
  created: string
  id: number
  imageUrl: string
  locationId: number
  name: string
}

export interface IvisiblePainting extends Ipainting {
  author: string
  location: string
}

interface Iauthor {
  id: number
  name: string
}

interface Ilocation {
  id: number
  location: string
}

export const useDataStore = defineStore('data', () => {
  const paintings = ref<IvisiblePainting[]>([])
  const authors = ref<Iauthor[]>([])
  const locations = ref<Ilocation[]>([])
  const page = ref(1)
  const limit = ref(window.screen.width >= 1024 ? 9 : 12)
  const totalPages = ref(0)
  const isLoad = ref<'pending' | 'fulfilled' | 'rejected'>('pending')

  const setPaintings = async () => {
    const filters = useFiltersStore()
    isLoad.value = 'pending'
    paintings.value = []
    const { result, allItems } = await get<Ipainting>('paintings', {
      _limit: limit.value,
      _page: page.value,
      q: filters.searchValue,
      authorId: filters.authorId,
      locationId: filters.locationId,
      created_gte: filters.createdFrom,
      created_lte: filters.createdBefore
    })
    const dataPaintings = ref<Ipainting[]>(result)

    totalPages.value = Math.ceil(allItems / limit.value)
    if (!authors.value.length) {
      authors.value = (await get<Iauthor>('authors')).result
    }
    if (!locations.value.length) {
      locations.value = (await get<Ilocation>('locations')).result
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
