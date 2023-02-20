<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { debounce } from '@/utils/debounce'
import TickSVG from '@/assets/icons/tick.svg?component'

defineProps({
  title: {
    type: String,
    required: true
  },
  valueFrom: {
    type: [Number, null] as PropType<number | null>,
    required: true
  },
  valueBefore: {
    type: [Number, null] as PropType<number | null>,
    required: true
  }
})
//fix input ot string
const emit = defineEmits(['update:valueFrom', 'update:valueBefore'])

const dropdown = ref<HTMLDivElement>()
const active = ref(false)

const onChange = (input: 'from' | 'before', e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    const value = Number(e.target.value)
    if (input === 'from') {
      emit('update:valueFrom', value)
    }
    if (input === 'before') {
      emit('update:valueBefore', value)
    }
  }
}
const change = debounce(onChange)
</script>

<template>
  <div class="main" ref="dropdown">
    <div class="root filter__wrapper" :class="{ root__activeL: active }">
      <div>{{ title }}</div>
      <TickSVG
        @click="active = !active"
        class="tick"
        :class="{ tick__active: active }"
      />
    </div>
    <div class="drop" :class="{ drop__active: active }">
      <div>
        <input
          type="number"
          @input="change('from', $event)"
          :value="valueFrom"
          placeholder="from"
        />
      </div>
      <div class="line"></div>
      <div>
        <input
          type="number"
          @input="change('before', $event)"
          :value="valueBefore"
          placeholder="before"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import '@/styles/DropDown.sass'

.drop
  height: 45px
  position: absolute
  z-index: 200
  background: var(--background-el)
  width: 100%
  opacity: 0
  border-radius: 0 0 8px 8px
  border: 1px solid var(--color)
  border-top: none
  transition: .3s
  padding: 20px 18px
  visibility: hidden
  display: flex
  align-items: center
  justify-content: space-between
  &__active
    visibility: visible
    height: 85px
    opacity: 1
  input
    width: 95px
    height: 45px
    background: var(--input-back)
    border-radius: 8px
    border: none
    outline: none
    color: var(--background-el)
    font-weight: 400
    font-size: 13px
    padding: 15px 0 15px 15px

.line
  width: 12px
  height: 0
  border: 1px solid var(--color)

.root__active
  transition: .3s
  border-radius: 8px 8px 0 0
  border-bottom: 1px solid var(--background-el)

@media (max-width: 1365px)
  .line
    margin: 15px 0
  .drop
    height: 160px
    flex-direction: column
    input
      width: 110px
      height: 45px

@media (max-width: 767px)
  .drop
    input
      width: 110px
      height: 45px
</style>
