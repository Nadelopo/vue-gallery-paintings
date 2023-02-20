export const debounce = <T extends any[]>(
  func: (...args: T) => void,
  ms: number = 400
) => {
  let timeout = 0
  return (...args: T) => {
    clearTimeout(timeout)
    timeout = window.setTimeout(() => func(...args), ms)
  }
}
