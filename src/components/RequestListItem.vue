<template>
  <div class="list-item-wrap">
    <p class="req-name">{{ props.name }}</p>
    <p class="req-time">
      {{ `${props.createdAt?.substring(0, 10)} ${props.createdAt?.substring(11, 19)}` }}
    </p>
    <div class="view-btn">Рассмотреть</div>
    <div class="delete-btn">Удалить</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: Number,
  name: String,
  createdAt: String,
})
</script>

<style scoped lang="scss">
.req-time {
  flex: 2;
  padding: 0;
  margin: 0;
  text-align: center;
  align-content: center;
}
.req-name {
  flex: 2;
  padding: 0;
  margin: 0;
  align-content: center;
}
.view-btn {
  flex: 1;
  cursor: pointer;
  border-radius: 5px;
  background-color: #5574f8;
  text-align: center;
  align-content: center;
}
.delete-btn {
  flex: 1;
  cursor: pointer;
  border-radius: 5px;
  background-color: #bc3836;
  text-align: center;
  align-content: center;
}
.list-item-wrap {
  position: relative;
  display: flex;
  column-gap: 40px;
  justify-content: space-between;
  margin: 40px 0;
  width: 100%;
  height: 40px;
  font-size: 18px;
}
</style>
