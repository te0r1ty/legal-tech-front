<template>
  <div class="list-item-border list-item-wrap">
    <img class="logo" :src="props.fullImgLink" alt="LegalTech" />
    <p class="name">{{ props.name }}</p>
    <div @click="clicked()" class="btn edit-btn">Редактировать</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  fullImgLink: String,
  name: String,
  id: Number,
})

const emits = defineEmits(['msgForModal'])

function clicked() {
  emits('msgForModal', props.id)
}
</script>

<style scoped lang="scss">
.name-approve {
  flex: 1 1 0;
  font-size: 18px;
  align-content: center;
}
.btn-wrap {
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
}
.edit-btn {
  background-color: #5574f8;
}
.delete-btn {
  background-color: #bc3836;
}
.btn {
  position: relative;
  top: 50px;
  translate: 0 -50%;
  flex: 1 1 0;
  cursor: pointer;
  font-size: 20px;
  align-content: center;
  text-align: center;
  border-radius: 5px;
  height: 40px;
}
.name {
  flex: 3 3 0;
  font-size: 20px;
  align-content: center;
}
.logo {
  position: relative;
  top: 50px;
  translate: 0 -50%;
  width: 100px;
  height: fit-content;
}
.list-item-wrap {
  display: flex;
  column-gap: 10px;
  justify-content: space-between;
  position: relative;
  margin-bottom: 10px;
  min-height: 100px;
}
.list-item-border {
  padding: 10px;
  border: solid;
  border-radius: 10px;
  border-width: 2px;
  border-color: rgba(85, 115, 248, 0.4);
}
</style>
