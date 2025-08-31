<template>
  <div class="success-wrap">
    <div class="green-centering-wrap">
      <a class="success">Ваша заявка принята и будет рассмотрена в ближайшее время!</a>
    </div>
    <div class="blue-centering-wrap">
      <RouterLink class="return" :to="map_link">На главную</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const map_link = '/'
</script>

<style scoped lang="scss">
.green-centering-wrap {
  position: relative;
  width: 100%;
  height: 70%;
}
.blue-centering-wrap {
  position: relative;
  width: 100%;
  height: 10%;
}
.success-wrap {
  height: 40vw;
}
.success {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  margin: 0;
  color: white;
  padding: 7% 5%;
  height: 80px;
  background-color: #5cb85c;
  border-radius: 20px;
  text-align: center;
}

.return {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: fit-content;
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
