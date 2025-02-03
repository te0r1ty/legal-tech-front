<template>
  <div>
    <p class="success">Ваша заявка принята и будет рассмотрена в ближайшее время!</p>
    <RouterLink class="return" :to="map_link">На главную</RouterLink>
  </div>
</template>

<script setup lang="ts">
const map_link = '/'
</script>

<style scoped lang="scss">
.success {
  margin: 240px 20% 50px 20%;
  color: white;
  padding: 7% 5%;
  height: 80px;
  background-color: #5cb85c;
  border-radius: 20px;
  text-align: center;
}

.return {
  width: 193px;
  margin: 0 43.2% 0 43.2%;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;
  background-color: var(--main-color);
  padding: 15px 30px;
  border-radius: 10px;
  border-width: 0;
  color: white;

  &:hover {
    background-color: var(--hover-underline-color);
  }
}
</style>
