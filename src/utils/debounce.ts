export const debounce = (func: (...args: any) => void, ms: number = 300) => {
  let timeout = 0
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = window.setTimeout(() => func(...args), ms)
  }
}
