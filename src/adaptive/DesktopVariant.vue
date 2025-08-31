<template>
  <div>
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

<style scoped lang="scss"></style>
