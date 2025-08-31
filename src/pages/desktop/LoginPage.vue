<template>
  <div class="login-wrap">
    <h1 class="login-head1">
      ВХОД В <br />
      ЛИЧНЫЙ КАБИНЕТ
    </h1>
    <div class="login-container">
      <textarea class="txtarea" v-model="credentials.email" placeholder="Логин"></textarea>
      <br />
      <textarea class="txtarea" v-model="credentials.password" placeholder="Пароль"></textarea>
      <div @click="doLogin" class="btn">Войти</div>
      <div style="color: brown" v-if="!correct">Неверные данные</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login } from '@/auth/authService'
import router from '@/router'
import { ref } from 'vue'

const correct = ref(true)
const credentials = ref({
  email: '',
  password: '',
})

function doLogin() {
  login(credentials.value.email, credentials.value.password)
    .then(() => {
      correct.value = true
      router.push({ name: 'Личный кабинет' })
    })
    .catch((error) => {
      correct.value = false
      console.error('Login failed:', error)
    })
}
</script>

<style scoped lang="scss">
.btn {
  cursor: pointer;
  border-radius: 6px;
  padding: 10px;
  width: fit-content;
  background-color: #5574f8;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8ba0fc;
  }
}
.txtarea {
  width: 25%;
  background-color: #d9d9d9;
  border-radius: 4px;
  border-width: 1px;
  border-color: #5574f8;
  border-style: solid;
  height: 28px;
  font-size: 17px;
  padding: 5px;
  resize: none;
  align-content: center;
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
