<template>
  <header class="header-main">
    <nav class="nav">
      <img class="logo" src="@/assets/pictures/logo.svg" alt="Логотип LegalTech Карты" />
      <ul class="nav__list">
        <li v-for="pair in navLinks" :key="pair.label">
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
.header-main {
  width: 85%;
  height: 60px;
  margin: 40px 8.3% 0 8.3%;
}

.nav {
  display: flex;
  height: 60px;

  &__list {
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin: 0 0 0 50%;
    width: 100%;
    padding: 11px 26px;
  }

  &__link {
    transition: all 0.2s ease-in-out;
    position: relative;
    font-size: 20px;
    text-decoration: none;
    color: black;

    &::before {
      content: '';
      transition: all 0.2s ease-in-out;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -3px;
      height: 2px;
      width: 0;
      background: var(--main-color);
    }

    &:hover {
      color: var(--hover-underline-color);
      &::before {
        width: 100%;
      }
    }
  }
}
</style>
