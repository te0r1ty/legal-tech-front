<template>
  <div class="home-wrap">
    <transition name="fade" appear>
      <ModalWindow
        class="modal"
        @close-button-triggered="closeModal"
        v-if="modalVisible"
        :name="msgForModal.name"
        :sphere="msgForModal.sphere"
        :years="msgForModal.years"
        :link="msgForModal.link"
        :description="msgForModal.description"
        :additional="msgForModal.additional"
      />
    </transition>
    <h1 class="home-head1">КАРТА<br />РОССИЙСКОГО<br />LEGALTECH</h1>
    <h3 class="home-head3">Все решения для автоматизации работы юристов на одной карте</h3>
    <MapComponent class="map" @msg-for-modal="showModal" />
    <div class="content">
      <div class="content__col1 content__padd">
        <h2 class="content__col1__title">СОБИРАЕМ ВСЕ<br />РЕШЕНИЯ LEGALTECH<br />ВМЕСТЕ</h2>
        <p class="content__txt">
          Целью этого проекта является давать наглядную картину российского рынка.
        </p>
        <p class="content__txt">
          LegalTech.Карта служит начальной точкой, инструментом навигации в пространстве
          отечественных решений для автоматизации работы юристов.
        </p>
        <p class="content__txt">
          Карта будет постоянно обновляться. Если вы хотите увидеть свой стартап на карте
          российского LegalTech, то добавьте его.
        </p>
        <RouterLink class="content__col1__button content__txt" :to="'/offer'">
          ДОБАВИТЬ ПРОЕКТ
        </RouterLink>
      </div>
      <div class="content__col2 content__padd">
        <p class="content__col2__info content__txt">
          Этот проект зависит от участия всего сообщества энтузиастов LegalTech. Если у вас есть
          замечания, пожелания или предложения - свяжитесь с нами:
        </p>
        <p class="content__col2__email content__txt">info@legaltechmap.ru</p>
      </div>
      <div class="content__col3 content__padd">
        <a href="https://noroots.ru" target="_blank">
          <img
            class="content__col3__pic"
            src="@/assets/pictures/noroots-banner.png"
            alt="Карта Российского LegalTech"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MapComponent from '@/components/MapComponent.vue'
import ModalWindow from '@/components/ModalWindow.vue'
import { useProjectsStore } from '@/stores/projectsStore'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const modalVisible = ref(false)
const msgForModal = ref({
  name: '',
  sphere: '',
  years: 0,
  link: '',
  description: '',
  additional: '',
})

const projectStore = useProjectsStore()

function showModal(id: number) {
  const infoPackForModal = projectStore.projects[id]
  msgForModal.value = {
    name: infoPackForModal.name,
    sphere: infoPackForModal.sphere,
    years: infoPackForModal.years,
    link: infoPackForModal.link,
    description: infoPackForModal.description,
    additional: infoPackForModal.additional,
  }
  modalVisible.value = true
}
function closeModal() {
  modalVisible.value = false
  msgForModal.value = {
    name: '',
    sphere: '',
    years: 0,
    link: '',
    description: '',
    additional: '',
  }
}
</script>

<style scoped lang="scss">
.modal {
  z-index: 99999;
  max-height: calc(100vh);
  overflow-y: auto;
}
.map {
  width: 100%;
  scale: 0.9;
  position: relative;
  top: 4%;
  left: 52%;
  translate: -50%;
}
.home-wrap {
  margin: 80px 8.3% 0 8.3%;
}
.home-head1 {
  padding-top: 70px;
  margin: 0 auto;
  text-align: left;
  margin: 0;
  font-size: 80px;
}
.home-head3 {
  font-size: 18px;
}

.content {
  margin: 140px 0;
  display: flex;
  gap: 20px;

  &__padd {
    padding: 0 15px;
  }

  &__txt {
    font-size: 16px;
    letter-spacing: 0.05em;
    margin: 0;
  }

  &__col1 {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 35%;

    &__title {
      margin: 0;
      font-size: 41px;
      font-weight: normal;
      letter-spacing: 0.05em;
    }

    &__button {
      margin-top: 20px;
      width: 190px;
      transition: background-color 0.2s ease-in-out;
      background-color: var(--main-color);
      padding: 16px 36px;
      text-decoration: none;
      border-radius: 4px;
      color: white;

      &:hover {
        background-color: var(--hover-underline-color);
      }
    }
  }

  &__col2 {
    margin-left: 50px;
    padding: 0;
    display: flex;
    flex-direction: column;
    max-width: 20%;

    &__info {
      margin-top: 171px;
    }

    &__email {
      margin-top: 30px;
    }
  }

  &__col3 {
    margin-left: 150px;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 30%;

    &__pic {
      width: 450px;
      height: 450px;
      border-radius: 8px;
    }
  }
}

.add-palceholder {
  position: relative;
  left: 50%;
  translate: -50%;
  margin: 120px 0%;
  width: 83.4%;
  height: 375px;
  border-radius: 8px;
}
</style>
