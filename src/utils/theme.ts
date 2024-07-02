import { ref } from 'vue'

const isOsDark =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

const isDark = ref(
  localStorage.theme ? localStorage.theme === 'dark' : isOsDark
)
const setTheme = () => {
  const theme = isDark.value ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
  document.documentElement.setAttribute('data-theme', theme)
}
setTheme()
const toggleTheme = () => {
  isDark.value = !isDark.value
  setTheme()
}
export const useTheme = () => ({ isDark, toggleTheme })
