import { ref } from 'vue'
import { defineStore } from 'pinia'
import { get } from '@/utils/queries'

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
  const searchValue = ref('')
  const isLoad = ref<'pending' | 'fulfilled' | 'rejected'>('pending')

  const setPaintings = async () => {
    const { result, allItems } = await get<Ipainting>(
      'paintings',
      limit.value,
      page.value,
      searchValue.value
    )
    const dataPaintings = ref<Ipainting[]>(result)

    totalPages.value = Math.ceil(allItems / limit.value)
    authors.value = (await get<Iauthor>('authors')).result
    locations.value = (await get<Ilocation>('locations')).result

    paintings.value = dataPaintings.value.map((e) => {
      const authorName: string =
        authors.value.find((a) => a.id == e.authorId)?.name || ''
      const locationName: string =
        locations.value.find((a) => a.id == e.locationId)?.location || ''

      return { ...e, author: authorName, location: locationName }
    })
  }

  return {
    paintings,
    setPaintings,
    page,
    limit,
    totalPages,
    isLoad,
    searchValue
  }
})
