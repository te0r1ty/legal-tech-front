<template>
  <footer class="footer-wrap">
    <div class="contacts-wrap">
      <img class="vk-link" src="@/assets/pictures/vk-logo.svg" alt="VK_LINK_IMG" />
      <img class="logo" src="@/assets/pictures/logo.svg" alt="LT_LOGO_SVG" />
      <p class="mail txt">info@legaltechmap.ru</p>
    </div>
    <p class="copyright txt">Copyright © 2024 Карта российского LegalTech</p>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.txt {
  color: white;
  font-size: 20px;
}
.footer-wrap {
  margin-top: 120px;
  background-color: black;
}
.contacts-wrap {
  display: flex;
}
.vk-link {
  margin: 72px 39.6% 0 8.3%;
}
.logo {
  margin-top: 64px;
  margin-right: 28%;
}
.mail {
  margin: 76px 8.3% 0 0;
  width: 225px;
  height: 23px;
}
.copyright {
  margin: 40px 36.7% 20px 36.7%;
}
</style>
