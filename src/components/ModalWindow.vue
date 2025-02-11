<template>
  <div class="modal-wrap">
    <div class="btn-wrap">
      <span></span>
      <button class="close-btn" @click="$emit('closeButtonTriggered')">x</button>
    </div>
    <div class="modal-frame">
      <p class="modal-name">{{ props.name }}</p>
      <p class="modal-card modal-card__sphere">{{ props.sphere }}</p>
      <p class="modal-card modal-card__years">Запустился в {{ props.years }} году</p>
      <a class="modal-card modal-card__link" v-bind:href="props.link" target="_blank"
        >Перейти к проекту</a
      >
      <p class="modal-card modal-card__desc">{{ props.description }}</p>
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
.modal-card {
  font-size: 0.59em;
  font-weight: lighter;
  border-style: solid;
  border-width: 2px;
  border-color: #5574f8;
  border-radius: 0.3rem;
  background-color: #d9d9d9;
  padding: 0.5rem;
  margin-top: 0;
  color: black;
  position: relative;

  &__sphere {
    margin-left: 3rem;
    top: -0.7rem;
    width: 41.6rem;
    height: 1.5rem;

    &::before {
      content: 'Сфера проекта';
      position: absolute;
      top: -35px;
      left: 0;
      font-size: 1.2em;
    }
  }

  &__years {
    text-align: center;
    top: -0.7rem;
    width: 14.4rem;
    height: 1.5rem;

    &::before {
      content: 'Год запуска';
      position: absolute;
      top: -35px;
      left: 0;
      font-size: 1.2em;
    }
  }

  &__link {
    transition: all 0.2s;
    top: -0.7rem;
    margin-right: 3rem;
    width: 14rem;
    height: 1.5rem;
    text-align: center;
    text-decoration: none;

    &::before {
      content: 'Ссылка на проект';
      position: absolute;
      top: -35px;
      left: 0;
      font-size: 1.2em;
    }

    &:hover {
      background-color: #5574f8;
    }
  }

  &__desc {
    margin-left: 3rem;
    width: 77.7rem;
    height: 9rem;
    padding-bottom: 8rem;

    &::before {
      content: 'Описание проекта';
      position: absolute;
      top: -35px;
      left: 0;
      font-size: 1.2em;
    }
  }
}
.modal-name {
  padding: 3rem 0 0 3rem;
  font-size: 1.5em;
  font-weight: lighter;
  height: 4rem;
  width: 100%;
  position: relative;
  top: -1rem;
}
.modal-frame {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 5rem;
  margin-left: 15.8rem;
  width: 85rem;
  height: 40rem;
  row-gap: 0px;
  background-color: #ffffff;
  border-radius: 0.5rem;
}
.close-btn {
  width: 1.5em;
  height: 1.5em;
  margin-top: 0.5em;
  margin-right: 0.5em;
  text-align: center;
  font-size: 2rem;
  border-width: 0;
  border-radius: 0.1em;
  cursor: pointer;
}
.btn-wrap {
  display: flex;
  justify-content: space-between;
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
