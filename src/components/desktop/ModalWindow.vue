<template>
  <div class="modal-shade">
    <div class="modal-wrap">
      <div class="btn-wrap">
        <span></span>
        <button class="close-btn" @click="$emit('closeButtonTriggered')">x</button>
      </div>
      <div class="modal-frame">
        <div class="modal-content-wrap">
          <p class="modal-name">{{ props.name }}</p>
        </div>
        <div class="modal-content-wrap">
          <div class="flex-wrap220">
            <p class="modal-card-name">Сфера проекта</p>
            <p class="modal-card modal-card__sphere">{{ props.sphere }}</p>
          </div>
          <div class="flex-wrap110">
            <p class="modal-card-name">Год запуска</p>
            <p class="modal-card modal-card__years">{{ props.years }}</p>
          </div>
          <div class="flex-wrap110">
            <p class="modal-card-name">Ссылка на проект</p>
            <a class="modal-card modal-card__link" v-bind:href="props.link" target="_blank">{{
              props.link
            }}</a>
          </div>
        </div>
        <div class="modal-content-wrap">
          <div class="flex-wrap110">
            <p class="modal-card-name">Описание проекта</p>
            <p class="modal-card modal-card__desc">{{ props.description }}</p>
          </div>
        </div>
        <div class="modal-content-wrap">
          <div class="flex-wrap110">
            <p class="modal-card-name">Дополнительная информация</p>
            <p class="modal-card modal-card__desc">{{ props.additional }}</p>
          </div>
        </div>
      </div>
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
  additional: String,
})
</script>

<style scoped lang="scss">
.flex-wrap220 {
  flex: 2 2 0;
}
.flex-wrap110 {
  flex: 1 1 0;
}
.modal-card-name {
  font-size: 1.5rem;
  margin: 15px 0;
  width: fit-content;
}
.modal-content-wrap {
  display: flex;
  justify-content: space-between;
  column-gap: 50px;
  width: 100%;
  height: fit-content;
  margin: 20px 0;
}
.modal-card {
  font-size: 0.59em;
  font-weight: lighter;
  border-style: solid;
  border-width: 2px;
  border-color: #5574f8;
  border-radius: 0.3rem;
  background-color: #d9d9d9;
  padding: 0.5rem;
  margin: 0;
  color: black;

  &__sphere {
    height: fit-content;
    width: 100%;
  }

  &__years {
    text-align: center;
    height: fit-content;
    width: 100%;
  }

  &__link {
    display: block;
    transition: all 0.2s;
    height: fit-content;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;

    &:hover {
      background-color: #5574f8;
    }
  }

  &__desc {
    height: fit-content;
    width: 95%;
  }
}
.modal-name {
  padding: 0;
  margin: 0;
  font-size: 1.5em;
  font-weight: lighter;
  height: 4rem;
  width: 100%;
  position: relative;
  top: -1rem;
}
.modal-frame {
  position: absolute;
  padding: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  width: clamp(700px, 70vw, 1300px);
  height: fit-content;
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
  position: absolute;
  top: -80px;
  right: 20px;
}
.modal-wrap {
  top: 0;
  left: 0;
  position: absolute;
  margin-top: 100px;
  width: 100%;
  height: 100%;
}
.modal-shade {
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
