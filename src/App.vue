<script setup lang="ts">
import FooterMain from './components/FooterMain.vue'
import HeaderMain from './components/HeaderMain.vue'
import FadeLayout from '@/components/layout/FadeLayout.vue'
import YandexMetrikaCounter from './components/YandexMetrikaCounter.vue'
</script>

<template>
  <div id="page-wrap">
    <YandexMetrikaCounter />

    <HeaderMain />

    <main>
      <router-view v-slot="{ Component, route }">
        <FadeLayout>
          <component :is="Component" :key="route.path" />
        </FadeLayout>
      </router-view>
    </main>

    <FooterMain />
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
  min-height: 100vh;
  margin: 0 auto;
  background-color: #f4f4f8;
}
</style>
