<template>
  <div>
    <input type="text" v-model="form.email" />
    <input type="password" v-model="form.password" />
    <input type="checkbox" v-model="form.rememberMe" />
    <button @click="submit">Submit</button>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/pages/HomePage.vue'
import { reactive } from 'vue'

const form = reactive({
  rememberMe: false,
  password: '',
  email: '',
})

const emit = defineEmits<{ (e: 'onSubmit', form: Post): void }>()

function submit() {
  console.log('AHTUNG', form.rememberMe, form.email)
  emit('onSubmit', form)
}
</script>

<style scoped lang="scss"></style>
