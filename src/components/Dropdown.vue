<script setup lang="ts">
import { ref, type PropType, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'
import { onclickOutsideClose } from '@/utils/onclickOutsideClose'
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

const name = ref(props.titleDefault)
const dropdown = ref<HTMLElement>()
const active = onclickOutsideClose(dropdown)

const changeData = (value: number | null) => {
  emit('update:nameId', value)
}

const choose = (id: number | null) => {
  changeData(id)
  active.value = false
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
  <div class="main" ref="dropdown">
    <div
      @click="active = !active"
      class="root filter__wrapper"
      :class="{ root__active: active }"
    >
      <div class="head__wrapper">
        <div class="title">{{ title }}</div>
        <CleanSVG
          v-if="title !== name"
          @click.stop="changeData(null)"
          class="clean"
        />
        <div v-else></div>
        <TickSVG class="tick" :class="{ tick__active: active }" />
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
