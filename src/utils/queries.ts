type Tpath = 'paintings' | 'authors' | 'locations'

interface Iget {
  _limit?: number
  _page?: number
  q?: string
  authorId?: number | null
  locationId?: number | null
  created_gte?: number | null
  created_lte?: number | null
}

export const get = async <T>(path: Tpath, params?: Iget) => {
  let result: T[] = []
  let allItems = 0
  try {
    const searchParams: string[][] = []
    for (const key in params) {
      if (params[key as keyof Iget]) {
        searchParams.push([key, String(params[key as keyof Iget])])
      }
    }

    const response1 = await fetch(
      import.meta.env.VITE_API +
        '/' +
        path +
        '?' +
        new URLSearchParams(searchParams)
    )

    result = await response1.json()
    allItems = Number(response1.headers.get('x-Total-Count'))
  } catch (err) {
    console.log(err)
  }
  return { result, allItems }
}
