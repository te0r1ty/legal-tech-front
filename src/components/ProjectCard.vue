<template>
  <div class="card-wrap" @click="clicked">
    <img class="prj-img" src="@/assets/pictures/заплатка.png" alt="project image" />
    <p class="prj-name">{{ props.name }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
})

function clicked() {
  console.log(props.name)
}
</script>

<style scoped lang="scss">
.prj-name {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 18px;
}
.prj-img {
  width: 300px;
  height: 300px;
  border-radius: 8px;
  margin: 10px 30px;
}
.card-wrap {
  transition: box-shadow 0.2s;
  width: 360px;
  height: 360px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 20px 0px #0031b8;
  }
}
</style>
