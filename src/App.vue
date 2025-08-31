<script setup lang="ts">
import DesktopVariant from './adaptive/DesktopVariant.vue'
import MobileVariant from './adaptive/MobileVariant.vue'
import YandexMetrikaCounter from './components/desktop/YandexMetrikaCounter.vue'
import { useIsMobile } from './composables/mobileComp'

const isMobile = useIsMobile()
</script>

<template>
  <div id="page-wrap">
    <YandexMetrikaCounter />

    <DesktopVariant v-if="!isMobile" />
    <MobileVariant v-if="isMobile" />
  </div>
</template>

<style scoped lang="scss">
#page-wrap {
  box-sizing: border-box;
  z-index: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  background-color: #f4f4f8;
}
</style>
