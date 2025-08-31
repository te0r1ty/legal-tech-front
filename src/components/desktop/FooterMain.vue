<template>
  <footer class="footer-wrap">
    <div class="logo-copy-wrap">
      <div class="logo-wrap">
        <img class="logo-icon" src="@/assets/pictures/logo.svg" alt="Логотип LegalTech Карты" />
        <p class="logo-text">
          LEGALTECH.<span style="color: #5574f8; padding: 0; margin: 0">КАРТА</span>
        </p>
      </div>
      <p class="copyright">Copyright © 2024 Карта российского LegalTech</p>
    </div>
    <div class="mail-wrap">
      <a href="mailto:info@legaltechmap.ru" class="mail-href">
        <p class="mail">info@legaltechmap.ru</p>
      </a>
    </div>
    <div class="disclaimer-wrap">
      <p class="disclaimer">
        Вся информация на сайте о проектах предоставлена вендорами проектов. При этом
        предоставленная информация на сайте является справочно-информационными материалами и не
        является рекламой или публичной офертой.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.mail-href {
  text-decoration-color: #5574f8;
  display: flex;
  justify-content: center;
}
.logo-copy-wrap {
  flex: 3 3 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}
.mail-wrap {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.disclaimer-wrap {
  flex: 3 3 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.logo-wrap {
  display: flex;
  height: 36px;
  margin-left: 140px;
}
.logo-icon {
  height: 100%;
}
.logo-text {
  margin: auto 10px;
  color: white;
  font-size: 18px;
  font-weight: bold;
}
.disclaimer {
  width: 70%;
  color: white;
  font-size: 1rem;
  margin: 0;
  margin-left: 100px;
}
.footer-wrap {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  position: relative;
  width: 100%;
  height: 250px;
  background-color: black;
}
.mail {
  width: fit-content;
  height: 1.2rem;
  color: #5574f8;
  font-size: 1.2rem;
  margin: 0;
}
.copyright {
  width: fit-content;
  height: 1.2rem;
  color: white;
  font-size: 1.2rem;
  margin: 0;
  margin-left: 140px;
}
</style>
