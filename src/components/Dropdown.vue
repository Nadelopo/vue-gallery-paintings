<script setup lang="ts">
import { ref, type PropType, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'
import CleanSVG from '@/assets/icons/clean.svg?component'
import TickSVG from '@/assets/icons/tick.svg?component'

const props = defineProps({
  list: {
    type: Array as PropType<
      {
        id: number
        name: string
      }[]
    >,
    required: true
  },
  titleDefault: {
    type: String,
    default: 'title'
  },
  nameId: {
    type: [Number, null] as PropType<number | null>,
    required: true
  }
})

const emit = defineEmits(['update:nameId'])

const { page } = storeToRefs(useDataStore())

const active = ref(false)
const name = ref(props.titleDefault)

const changeData = (value: number | null) => {
  emit('update:nameId', value)
}

const choose = (id: number | null) => {
  changeData(id)
  active.value = !active.value
  page.value = 1
}

const title = computed(() => {
  if (props.nameId) {
    return props.list.find((e) => e.id === props.nameId)?.name
  } else {
    return props.titleDefault
  }
})
</script>

<template>
  <div class="main">
    <div class="root filter__wrapper" :class="{ root_active: active }">
      <div class="head__wrapper">
        <div class="title">{{ title }}</div>
        <CleanSVG
          v-if="title !== name"
          @click="changeData(null)"
          class="clean"
        />
        <div v-else></div>
        <TickSVG
          @click="active = !active"
          class="tick"
          :class="{ tick__active: active }"
        />
      </div>
    </div>
    <div class="list" :class="{ list__active: active }">
      <div class="li" @click="choose(null)">all</div>
      <div v-for="e in list" class="li" :key="e.id" @click="choose(e.id)">
        {{ e.name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

.root
  display: flex
  align-items: center
  justify-content: space-between
  svg
    cursor: pointer
    fill: var(--tick)
  .tick
    width: 12px
    height: 6px
  .clean
    width: 10px
    height: 10px

.main
  position: relative

.list
  position: absolute
  z-index: 200
  background: var(--background-el)
  width: 100%
  padding-top: 10px
  border-radius: 0 0 8px 8px
  border: 1px solid var(--color)
  opacity: 0
  transition: .3s
  overflow-y: scroll
  visibility: hidden
  height: 100px
  &::-webkit-scrollbar
    width: 9px
  &::-webkit-scrollbar-thumb
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3)
    background: #7B7B7B
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.12)
    border-radius: 10px
    transform: matrix(1, 0, 0, -1, 0, 0)
  &.list__active
    border-top: 1px solid var(--border)

.list__active
  visibility: visible
  transition: .3s
  opacity: 1
  height: 305px

.tick
  transition: .3s
  &.tick__active
    transform: rotate(180deg)

.root__active
  transition: .3s
  border-radius: 8px 8px 0 0
  border-bottom: 1px solid var(--tick)



.li
  padding: 10px 22px
  min-height: 40px
  cursor: pointer
  font-weight: 500
  font-size: 16px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  &:hover
    color: var(--background-color)
    background: var(--color)

.title
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  padding-right: 10px

.head__wrapper
  display: grid
  grid-template-columns: 1fr 20px 12px
  align-items: center
  width: 100%
</style>
