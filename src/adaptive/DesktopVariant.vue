<template>
  <div class="page-wrap">
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

<script setup lang="ts">
import FooterMain from '@/components/desktop/FooterMain.vue'
import HeaderMain from '@/components/desktop/HeaderMain.vue'
import FadeLayout from '@/components/layout/FadeLayout.vue'
</script>

<style scoped lang="scss">
.page-wrap {
  box-sizing: border-box;
  z-index: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-height: 100%;
  margin: 0 auto;
  background-color: #f4f4f8;
}
</style>
