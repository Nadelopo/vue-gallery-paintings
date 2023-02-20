import { ref, watch } from 'vue'

export const useTheme = () => {
  const theme = ref(Number(JSON.parse(localStorage.getItem('theme') || '0')))
  watch(theme, () => {
    document.documentElement.setAttribute('data-theme', String(theme.value))
    localStorage.setItem('theme', String(theme.value))
  })
  return theme
}
