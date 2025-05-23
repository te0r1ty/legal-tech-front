<template>
  <div class="login-wrap">
    <h1 class="login-head1">
      ВХОД В <br />
      ЛИЧНЫЙ КАБИНЕТ
    </h1>
    <div class="login-container">
      <textarea class="txtarea" v-model="credentials.email"></textarea>
      <br />
      <textarea class="txtarea" v-model="credentials.password"></textarea>
      <div @click="doLogin">войти</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login } from '@/auth/authService'
import router from '@/router'
import { ref } from 'vue'

const credentials = ref({
  email: '',
  password: '',
})

function doLogin() {
  login(credentials.value.email, credentials.value.password)
    .then(() => {
      router.push({ name: 'Личный кабинет' })
    })
    .catch((error) => {
      console.error('Login failed:', error)
    })
}
</script>

<style scoped lang="scss">
.txtarea {
  width: 30%;
  background-color: #d9d9d9;
  border-radius: 4px;
  border-width: 1px;
  border-color: #5574f8;
  border-style: solid;
  height: 28px;
  font-size: 17px;
  padding: 5px;
  resize: none;
}
.login-container {
  margin: 150px 0 150px 0;
  justify-content: space-between;
  gap: 50px;
}
.login-head1 {
  padding-top: 40px;
  margin: 0 auto;
  text-align: left;
  margin: 0;
  font-size: 80px;
}
.login-wrap {
  margin: 80px 8.3% 0 8.3%;
}
</style>
