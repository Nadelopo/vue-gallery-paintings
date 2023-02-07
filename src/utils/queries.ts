type Tpath = 'paintings' | 'authors' | 'locations'

export const get = async <T>(path: Tpath) => {
  let result: T[] = []
  try {
    const response = await fetch(import.meta.env.VITE_API + '/' + path)
    const data = await response.json()
    if (data?.length) result = data
  } catch (err) {
    console.log(err)
  }
  return result
}
