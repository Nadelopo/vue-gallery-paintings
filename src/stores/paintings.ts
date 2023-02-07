import { ref } from 'vue'
import { defineStore } from 'pinia'
import { get } from '@/utils/queries'

interface Ipaintings {
  authorId: number
  created: string
  id: number
  imageUrl: string
  locationId: number
  name: string
}

interface IvisiblePaintings extends Ipaintings {
  author: string
  location: string
}

interface Iauthors {
  id: number
  name: string
}

interface Ilocations {
  id: number
  location: string
}

export const usePaintingsStore = defineStore('counter', () => {
  const paintings = ref<IvisiblePaintings[]>([])

  const setPaintings = async () => {
    const dataPaintings = await get<Ipaintings>('paintings')
    const authors = await get<Iauthors>('authors')
    const locations = await get<Ilocations>('locations')

    paintings.value = dataPaintings.map((e) => {
      const authorName: string =
        authors.find((a) => a.id == e.authorId)?.name || ''
      const locationName: string =
        locations.find((a) => a.id == e.locationId)?.location || ''
      return { ...e, author: authorName, location: locationName }
    })

    console.table(paintings.value)
  }

  return { paintings, setPaintings }
})
