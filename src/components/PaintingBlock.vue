<script setup lang="ts">
import type { VisiblePainting } from '@/stores/data'

defineProps<{
  item: VisiblePainting
}>()

const API = import.meta.env.VITE_API
</script>

<template>
  <div>
    <div class="wrapper">
      <img
        :src="API + item.imageUrl"
        alt="ошибка загрузки..."
        loading="lazy"
        class="img"
      />
      <div class="content">
        <div class="head">{{ item.name }}</div>
        <div class="text">
          <b>Author: </b>
          {{ item.author }}
        </div>
        <div class="text">
          <b>Created: </b>
          {{ item.created }}
        </div>
        <div class="text">
          <b>Location: </b>
          {{ item.location }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.wrapper
  width: 360px
  height: 275px
  border-radius: 20px
  position: relative

.img
  width: 100%
  height: 100%
  border-radius: 20px
  position: absolute
  object-fit: cover

.content
  background: rgba(255, 255, 255, 0.75)
  position: absolute
  z-index: 100
  color: #000
  margin-top: 245px
  height: 30px
  border-radius: 0 0 20px 20px
  width: 100%
  padding: 5px 15px 0 15px
  transition: .4s
  .wrapper:hover &
    height: 145px
    margin-top: 130px

.head
  color: #000
  font-weight: 700
  font-size: 18px
  margin-bottom: 6px
  text-transform: capitalize
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  .wrapper:hover &
    white-space: normal
    overflow: visible

.text
  margin-bottom: 5px
  font-size: 13px
  color: #000
  opacity: 0
  visibility: hidden
  transition: 0
  b
    color: #000
  .wrapper:hover &
    transition: opacity .8s
    visibility: visible
    opacity: 1

@media (max-width: 1365px)
  .wrapper
    width: 300px
    height: 230px
  .content
    margin-top: 200px
    .wrapper:hover &
      height: 100px

@media (max-width: 1023px)
  .wrapper
    width: 340px
    height: 250px
  .content
    margin-top: 220px
    .wrapper:hover &
      height: 120px

@media (max-width: 767px)
  .wrapper
    width: 280px
    height: 205px
  .content
    margin-top: 175px
    .wrapper:hover &
      margin-top: 85px
</style>
