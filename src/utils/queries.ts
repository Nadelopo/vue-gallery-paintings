import axios from 'axios'

type Tpath = 'paintings' | 'authors' | 'locations'

export const get = async <T>(
  path: Tpath,
  limit?: number,
  page?: number,
  search: string = '',
  authorId: number | null = null,
  locationId: number | null = null
) => {
  let result: T[] = []
  let allItems = 0
  try {
    const response = await axios.get(import.meta.env.VITE_API + '/' + path, {
      params: {
        _page: page,
        _limit: limit,
        q: search,
        authorId,
        locationId
      }
    })
    result = response.data
    allItems = Number(response.headers['x-total-count'])
  } catch (err) {
    console.log(err)
  }
  return { result, allItems }
}
