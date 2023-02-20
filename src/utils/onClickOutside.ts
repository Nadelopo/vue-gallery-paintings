import { onUnmounted, watchEffect, type Ref } from 'vue'

export const clickOutside = (ref: HTMLElement, value: Ref) => {
  const click = (e: Event) => {
    console.log(3)
    if (ref && !e.composedPath().includes(ref)) {
      value.value = false
    }
  }

  watchEffect(() => {
    const eventType = value.value ? 'addEventListener' : 'removeEventListener'
    window[eventType]('click', click)
  })

  onUnmounted(() => {
    window.removeEventListener('click', (e) => click(e))
  })
}
