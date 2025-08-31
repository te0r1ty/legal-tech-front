<template>
  <div class="admin-wrap">
    <h1 class="admin-head1">ЛИЧНЫЙ КАБИНЕТ</h1>
    <div class="admin-container">
      <div class="admin-menu">
        <p class="admin-name">Меню</p>
        <nav>
          <ul class="list">
            <li
              v-for="pair in navLinks"
              :key="pair.label"
              class="menu-item"
              :class="{ active: selectedModule === pair.component }"
              @click="selectedModule = pair.component"
            >
              {{ pair.label }}
              <span v-if="pair.label === 'Одобрить запросы'" class="badge">{{
                useRequestsStore().totalRequests
              }}</span>
            </li>
            <li @click="doLogout" class="menu-item">Выйти</li>
          </ul>
        </nav>
      </div>

      <div class="content">
        <FadeLayout>
          <component :is="selectedModule" />
        </FadeLayout>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logout } from '@/auth/authService'
import FadeLayout from '@/components/layout/FadeLayout.vue'
import { NAV_LINKS } from '@/constants/admin-menu'
import router from '@/router'
import { useRequestsStore } from '@/stores/requestsStore'
import { ref } from 'vue'

const navLinks = NAV_LINKS
const selectedModule = ref(navLinks[0].component)

function doLogout() {
  logout()
  router.push({ name: 'home' })
}
</script>

<style scoped lang="scss">
.admin-container {
  margin: 362px 0 150px 0;
  display: flex;
  justify-content: space-between;
  gap: 50px;
}
.content {
  width: 65%;
  height: fit-content;
  transition: height 0.2s ease-in-out;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.badge {
  background: red;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  padding: 2px 6px;
  position: absolute;
  top: 7px;
  right: -40px;
}
.menu-item {
  margin: 20px 10px;
  padding: 0;
  font-size: 25px;
  width: fit-content;
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    transition: all 0.2s ease-in-out;
    position: absolute;
    left: 0;
    bottom: -3px;
    height: 2px;
    width: 0;
    background: #5574f8;
  }

  &:hover {
    color: var(--hover-underline-color);
    &::before {
      width: 100%;
    }
  }
}
.admin-name {
  font-size: 30px;
  text-align: center;
  font-weight: bold;
}
.admin-menu {
  width: 26%;
  height: fit-content;
  background: #e5e5e5;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.link {
  text-decoration: none;
  color: black;
  transition: color 0.3s ease;

  &:hover {
    color: #5574f8;
  }
}
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.admin-head1 {
  padding-top: 162px;
  margin: 0 auto;
  text-align: left;
  margin: 0;
  font-size: 80px;
}
.admin-wrap {
  margin: 80px 8.3% 0 8.3%;
}
</style>
