<script setup lang="ts">
import FooterMain from './components/FooterMain.vue'
import HeaderMain from './components/HeaderMain.vue'
import FadeLayout from '@/components/layout/FadeLayout.vue'
</script>

<template>
  <div id="page-wrap">
    <!-- Yandex.Metrika counter -->
    <component is="script">
      (function(m,e,t,r,i,k,a){m[i]=m[i] || function(){(m[i].a=m[i].a || []).push(arguments)};
      m[i].l=1*new Date(); for (var j = 0; j < document.scripts.length; j++) {if
      (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(101047270,
      "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
    </component>
    <noscript
      ><div>
        <img
          src="https://mc.yandex.ru/watch/101047270"
          style="position: absolute; left: -9999px"
          alt=""
        /></div
    ></noscript>
    <!-- /Yandex.Metrika counter -->

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
