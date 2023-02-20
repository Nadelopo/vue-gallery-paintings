import { onUnmounted, watchEffect, type Ref } from 'vue'

export const clickOutside = (ref: HTMLElement, value: Ref) => {
  const click = (e: Event) => {
    if (ref && !e.composedPath().includes(ref)) {
      value.value = false
    }
  }

  watchEffect(() => {
    const eventType = value.value ? 'addEventListener' : 'removeEventListener'
    window[eventType]('click', click)
  })

  onUnmounted(() => {
    window.removeEventListener('click', click)
  })
}
