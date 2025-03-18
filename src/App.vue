<script setup lang="ts">
import FooterMain from './components/FooterMain.vue'
import HeaderMain from './components/HeaderMain.vue'
import FadeLayout from '@/components/layout/FadeLayout.vue'
</script>

<template>
  <div id="page-wrap">
    <HeaderMain />

    <img class="blur-map" src="@/assets/pictures/blur-map.png" alt="BLURED-MAP-IMG" />

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
.blur-map {
  position: absolute;
  width: 100%;
  object-fit: cover;
  height: 700px;
  z-index: -1;
  filter: blur(10px);
}
#page-wrap {
  box-sizing: border-box;
  z-index: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
}
</style>
