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

export const usePaintingsStore = defineStore('counter', () => {
  const paintings = ref<IvisiblePainting[]>([])
  const authors = ref<Iauthor[]>([])
  const locations = ref<Ilocation[]>([])
  const page = ref(0)
  const limit = ref(window.screen.width >= 1024 ? 9 : 12)
  const totalPages = ref(0)
  const isLoad = ref<'pending' | 'fulfilled' | 'rejected'>('pending')

  const setPaintings = async () => {
    const dataPaintings = await get<Ipainting>('paintings')
    authors.value = await get<Iauthor>('authors')
    locations.value = await get<Ilocation>('locations')

    paintings.value = dataPaintings.map((e) => {
      const authorName: string =
        authors.value.find((a) => a.id == e.authorId)?.name || ''
      const locationName: string =
        locations.value.find((a) => a.id == e.locationId)?.location || ''
      return { ...e, author: authorName, location: locationName }
    })
  }

  return { paintings, setPaintings, page, limit, totalPages, isLoad }
})
