<script setup lang="ts">
import { useTheme } from '@/utils/theme'
import LogoSVG from '@/assets/icons/logo.svg?component'
import ThemeSVG from '@/assets/icons/theme.svg?component'

const { toggleTheme } = useTheme()
</script>

<template>
  <div class="navbar">
    <LogoSVG class="logo" />
    <ThemeSVG
      class="theme"
      @click="toggleTheme"
    />
  </div>
</template>

<style scoped lang="sass">
.navbar
  margin: 35px 0
  display: flex
  justify-content: space-between
  align-items: center

.theme
  cursor: pointer
  transition: 0.5s, background-color 300ms linear
  fill: var(--color)
  width: 20px
  height: 20px
  &:hover
    transform: rotateZ(180deg) scale(1.3)

.logo
  width: 68px
  height: 68px
  transition: .4s
  fill: var(--background-color)
</style>
