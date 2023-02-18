<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'
import FirstSVG from '@/assets/icons/first.svg?component'
import PrevSVG from '@/assets/icons/left.svg?component'
import NextSVG from '@/assets/icons/right.svg?component'
import LastSVG from '@/assets/icons/last.svg?component'

const { page, totalPages } = storeToRefs(useDataStore())

const maxPage = 3

const listPaginate = computed<number[]>(() => {
  if (page.value < maxPage) {
    if (totalPages.value > maxPage) {
      return [1, 2, 3]
    }
    return Array.from(Array(totalPages.value + 1).keys()).slice(1)
  } else if (page.value === totalPages.value) {
    return [page.value - 2, page.value - 1, page.value]
  } else {
    return [page.value - 1, page.value, page.value + 1]
  }
})
</script>
<template>
  <div v-if="totalPages" class="root">
    <ul>
      <li>
        <button @click="page = 1" :disabled="page === 1" className="first">
          <FirstSVG />
        </button>
      </li>
      <li>
        <button @click="page -= 1" :disabled="page === 1">
          <PrevSVG />
        </button>
      </li>
      <li v-for="number in listPaginate" :key="number">
        <button @click="page = number" :class="{ active: page === number }">
          {{ number }}
        </button>
      </li>
      <li>
        <button @click="page += 1" :disabled="page === totalPages">
          <NextSVG />
        </button>
      </li>
      <li>
        <button
          @click="page = totalPages"
          :disabled="page === totalPages"
          class="last"
        >
          <LastSVG />
        </button>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="sass">
.root
  margin-bottom: 70px
  text-align: start
  li
    display: inline-block
    button
      font-weight: 500
      font-size: 18px
      display: inline-block
      transition: .3s
      text-align: center
      width: 41px
      line-height: 42px
      background: var(--background-color)
      height: 41px
      cursor: pointer
      color: var(--color)
      border: 1px solid var(--color)
      border-right: none
      &:not(.active):not([disabled]):hover
        background-color: var(--background-pages)
        color: var(--color)
        svg
          fill: var(--color)
      svg
        width: 8px
        height: 13px
        fill: var(--color)
      &:disabled
        border: 1px solid var(--tick)
        border-right: none
        cursor: default
        &:hover
          background: none
        svg
          fill: var(--tick)
    .first
      border-radius: 8px 0 0 8px
      svg
        width: 14px
    .last
      border-radius: 0 8px 8px 0
      border-right: 1px solid
      &:disabled
        border-right: 1px solid var(--tick)
      svg
        width: 14px

  .active
    background: var(--color)
    color: var(--background-color)

    .next
      button
        transition: .3s
        background: var(--background-color)
        border-radius: 0 8px 8px 0
        width: 41px
        height: 41px

    .previous
      button
        transition: .3s
        background: var(--background-color)
        border-radius: 8px 0 0 8px
        width: 41px
        height: 41px

@media (max-width: 767px)
  .root
    text-align: center
</style>
