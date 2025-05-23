<template>
  <div class="list-item-wrap">
    <p class="req-name">{{ props.name }}</p>
    <p style="font-size: 14px; flex: 0.5 0.5 0">
      {{ props.type == 'CREATE' ? 'Добавление' : 'Изменение' }}
    </p>
    <p class="req-time">
      {{ `Дата: ${props.createdAt?.substring(0, 10)}` }}
      <br />
      {{ `Время: ${props.createdAt?.substring(11, 19)}` }}
    </p>
    <div @click="clicked()" class="view-btn">Рассмотреть</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: Number,
  name: String,
  createdAt: String,
  type: String,
})

const emits = defineEmits(['msgForModal'])

function clicked() {
  emits('msgForModal', props.id)
}
</script>

<style scoped lang="scss">
.req-time {
  flex: 2 2 0;
  padding: 0;
  margin: 0;
  text-align: center;
  align-content: center;
}
.req-name {
  flex: 2 2 0;
  padding: 0;
  margin: 0;
  align-content: center;
}
.view-btn {
  flex: 1 1 0;
  cursor: pointer;
  border-radius: 5px;
  background-color: #5574f8;
  text-align: center;
  align-content: center;
}
.list-item-wrap {
  display: flex;
  column-gap: 40px;
  justify-content: space-between;
  margin-bottom: 40px;
  width: 100%;
  min-height: 40px;
  height: fit-content;
  font-size: 18px;
}
</style>
