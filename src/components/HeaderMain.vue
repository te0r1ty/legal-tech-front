<template>
  <header class="header-main">
    <nav class="nav">
      <div class="logo-wrap">
        <img class="logo-icon" src="@/assets/pictures/logo2.svg" alt="Логотип LegalTech Карты" />
        <p class="logo-text">LEGALTECH.<span style="color: white">КАРТА</span></p>
      </div>
      <ul class="nav__list">
        <li class="list-el" v-for="pair in navLinks" :key="pair.label">
          <RouterLink class="nav__link" :to="pair.link">
            {{ pair.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { NAV_LINKS } from '@/constants/header'

const navLinks = NAV_LINKS
</script>

<style scoped lang="scss">
.list-el {
  position: relative;
}
.header-main {
  width: 85%;
  height: 60px;
  margin: 40px 8.3% 0 8.3%;
}

.nav {
  display: flex;
  justify-content: space-between;
  background-color: #5574f8;
  border-radius: 10px;
  height: 60px;

  &__list {
    display: flex;
    gap: 35px;
    list-style: none;
    margin: 0 26px;
    padding: 0;
    width: fit-content;
  }

  &__link {
    transition: all 0.2s ease-in-out;
    position: relative;
    top: 10px;
    font-size: 20px;
    text-decoration: none;
    color: white;

    &::before {
      content: '';
      transition: width 0.2s ease-in-out;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -3px;
      height: 2px;
      width: 0;
      background: white;
    }

    &:hover {
      &::before {
        width: 100%;
      }
    }
  }
}
.logo-wrap {
  display: flex;
  height: 60%;
  margin: auto 26px;
}
.logo-icon {
  height: 100%;
}
.logo-text {
  margin: auto 10px;
  font-size: 18px;
  font-weight: bold;
}
</style>
