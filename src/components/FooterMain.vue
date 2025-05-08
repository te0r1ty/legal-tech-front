<template>
  <footer class="footer-wrap">
    <div class="contacts-wrap">
      <p class="disclaimer">
        Вся информация на сайте о проектах предоставлена вендорами проектов. При этом
        предоставленная информация на сайте является справочно-информационными материалами и не
        является рекламой или публичной офертой.
      </p>
      <img class="logo" src="@/assets/pictures/logo.svg" alt="LT_LOGO_SVG" />
      <a href="mailto:info@legaltechmap.ru"> <p class="mail">info@legaltechmap.ru</p></a>
    </div>
    <p class="copyright">Copyright © 2024 Карта российского LegalTech</p>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.disclaimer {
  position: absolute;
  left: 4%;
  width: 24rem;
  color: white;
  font-size: 1rem;
  margin: 0;
}
.footer-wrap {
  width: 100%;
  height: 250px;
  background-color: black;
}
.contacts-wrap {
  position: relative;
  margin-top: 3rem;
}
.logo {
  position: absolute;
  top: 10px;
  left: 50%;
  translate: -50%;
  height: fit-content;
  width: 1.6em;
}
.mail {
  position: absolute;
  width: fit-content;
  height: 1.2rem;
  top: 40px;
  right: 5%;
  color: white;
  font-size: 1.2rem;
  margin: 0;
}
.copyright {
  width: fit-content;
  position: relative;
  top: 60%;
  left: 50%;
  translate: -50%;
  height: 1.2rem;
  color: white;
  font-size: 1.2rem;
  margin: 0;
}
</style>
