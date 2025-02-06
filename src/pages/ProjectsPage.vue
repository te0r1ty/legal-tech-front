<template>
  <div class="projects-wrap">
    <transition name="fade" appear>
      <ModalWindow
        @close-button-triggered="closeModal"
        v-if="modalVisible"
        :name="msgForModal.name"
        :sphere="msgForModal.sphere"
        :years="msgForModal.years"
        :link="msgForModal.link"
        :description="msgForModal.description"
      />
    </transition>
    <h1 class="projects-head1">ПРОЕКТЫ</h1>

    <div class="sort-settings-wrap">
      <p class="sort-settings-wrap__txt">ВСЕГО ПРОЕКТОВ: {{ projects.length }}</p>
    </div>
    <div class="list-wrap">
      <ProjectCard
        @msg-for-modal="showModal"
        v-for="project in projects"
        :key="project.id"
        :id="project.id"
        :name="project.name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalWindow from '@/components/ModalWindow.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { ref } from 'vue'

const req = new XMLHttpRequest()
req.open('GET', 'http://83.242.179.110:8080/companies')
req.responseType = 'json'
req.setRequestHeader('Authorization', 'Basic' + btoa('holger:QU11OWIz'))
req.onload = () => {
  console.log(req.response)
}
req.onerror = () => {
  console.log('ашибка')
}
req.send()

const projects = [
  { id: 1, name: 'name1', sphere: '1111', years: 1111, link: '1111', description: '1111' },
  { id: 2, name: 'name2', sphere: '2222', years: 2222, link: '2222', description: '2222' },
  {
    id: 3,
    name: 'Юридическая операционная система (ЮОС)',
    sphere: '3333',
    years: 3333,
    link: '3333',
    description: '3333',
  },
  { id: 4, name: 'name4', sphere: '4444', years: 4444, link: '4444', description: '4444' },
  { id: 5, name: 'name5', sphere: '5555', years: 5555, link: '5555', description: '5555' },
  { id: 6, name: 'name6', sphere: '6666', years: 6666, link: '6666', description: '6666' },
  { id: 7, name: 'name7', sphere: '7777', years: 7777, link: '7777', description: '7777' },
]

const modalVisible = ref(false)
const msgForModal = ref({
  name: '',
  sphere: '',
  years: 0,
  link: '',
  description: '',
})

function showModal(id: number) {
  const infoPackForModal = projects[id - 1]
  msgForModal.value = {
    name: infoPackForModal.name,
    sphere: infoPackForModal.sphere,
    years: infoPackForModal.years,
    link: infoPackForModal.link,
    description: infoPackForModal.description,
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
  }
}
</script>

<style scoped lang="scss">
.sort-settings-wrap {
  margin-top: 376px;
}
.list-wrap {
  display: flex;
  flex-wrap: wrap;
  column-gap: 30px;
  row-gap: 20px;
}
.projects-head1 {
  padding-top: 162px;
  margin: 0 auto;
  text-align: left;
  margin: 0;
  font-size: 80px;
}
.projects-wrap {
  margin: 80px 8.3% 0 8.3%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
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
