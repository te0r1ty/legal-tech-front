<template>
  <div class="card-wrap" @click="clicked">
    <img
      class="prj-img"
      :src="
        props.fullImgLink == 'http://62.84.115.34:80/img-cloning/null'
          ? 'src/assets/pictures/legal-logo.png'
          : props.fullImgLink
      "
      alt="LegalTech"
    />
    <p class="prj-name">{{ props.name }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: Number,
  name: String,
  fullImgLink: String,
})
const emits = defineEmits(['msgForModal'])

function clicked() {
  emits('msgForModal', props.id)
}
</script>

<style scoped lang="scss">
.prj-name {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
}
.prj-img {
  position: relative;
  top: 45%;
  left: 50%;
  translate: -50% -45%;
  width: 250px;
  height: fit-content;
  border-radius: 8px;
}
.card-wrap {
  border: solid;
  border-width: 3px;
  border-color: #5574f830;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transition:
    box-shadow 0.2s,
    border-color 0.2s;
  width: 360px;
  height: 360px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 20px 0px #0031b8;
    border-color: #5574f8;
  }
}
</style>
