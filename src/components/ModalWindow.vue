<template>
  <div class="modal-wrap">
    <button class="close-btn" @click="$emit('closeButtonTriggered')">x</button>
    <div class="modal-frame">
      <p class="modal-name">{{ props.name }}</p>
      <p class="modal-sphere">{{ props.sphere }}</p>
      <p class="modal-years">{{ props.years }}</p>
      <p class="modal-link">{{ props.link }}</p>
      <p class="modal-description">{{ props.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
  sphere: String,
  years: Number,
  link: String,
  description: String,
})
</script>

<style scoped lang="scss">
.modal-sphere {
  font-size: 1em;
  font-weight: lighter;
}
.modal-name {
  margin: 5rem 0 1rem 3rem;
  font-size: 1.5em;
  font-weight: lighter;
}
.modal-frame {
  margin-top: 10%;
  margin-left: 15%;
  width: 70%;
  height: 60%;
  background-color: #ffffff;
  border-radius: 5px;
}
.close-btn {
  position: absolute;
  width: 1.5em;
  height: 1.5em;
  left: 96%;
  top: 3%;
  text-align: center;
  font-size: 2rem;
  border-width: 0;
  border-radius: 3px;
  cursor: pointer;
}
.modal-wrap {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
