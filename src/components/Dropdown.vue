<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'
import { onclickOutsideClose } from '@/utils/onclickOutsideClose'
import CleanSVG from '@/assets/icons/clean.svg?component'
import TickSVG from '@/assets/icons/tick.svg?component'

const props = defineProps<{
  titleDefault: string
  nameId: number | null
  list: {
    id: number
    name: string
  }[]
}>()

const emit = defineEmits<{
  'update:nameId': [number | null]
}>()

const { page } = storeToRefs(useDataStore())

const name = ref(props.titleDefault)
const dropdownRef = ref<HTMLElement>()
const isActive = onclickOutsideClose(dropdownRef)

const changeData = (value: number | null) => {
  emit('update:nameId', value)
}

const chooseOption = (id: number | null) => {
  changeData(id)
  isActive.value = false
  page.value = 1
}

const title = computed(() => {
  if (props.nameId) {
    return props.list.find((e) => e.id === props.nameId)?.name
  }
  return props.titleDefault
})
</script>

<template>
  <div
    class="main"
    ref="dropdownRef"
  >
    <div
      @click="isActive = !isActive"
      class="root filter__wrapper"
      :class="{ root__active: isActive }"
    >
      <div class="head__wrapper">
        <div class="title">{{ title }}</div>
        <CleanSVG
          v-if="title !== name"
          @click.stop="changeData(null)"
          class="clean"
        />
        <div v-else></div>
        <TickSVG
          class="tick"
          :class="{ tick__active: isActive }"
        />
      </div>
    </div>
    <div
      class="list"
      :class="{ list__active: isActive }"
    >
      <div
        class="li"
        @click="chooseOption(null)"
      >
        all
      </div>
      <div
        v-for="value in list"
        class="li"
        :key="value.id"
        @click="chooseOption(value.id)"
      >
        {{ value.name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import '@/styles/DropDown.sass'

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
