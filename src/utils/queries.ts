type Tpath = 'paintings' | 'authors' | 'locations'

export const get = async <T>(
  path: Tpath,
  limit?: number,
  page?: number,
  search: string = ''
) => {
  let result: T[] = []
  let allItems = 0
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API
      }/${path}?_limit=${limit}&_page=${page}&q=${search}`
    )
    const data = await response.json()
    if (data?.length) result = data
    allItems = Number(response.headers.get('X-Total-Count'))
  } catch (err) {
    console.log(err)
  }
  return { result, allItems }
}
