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

interface prj {
  id: number
  name: string
  sphere: string
  years: number
  link: string
  description: string
}

const projects = ref<prj[]>([])
const req = new XMLHttpRequest()
req.open('GET', 'http://130.193.51.137:8080/companies')
req.responseType = 'json'
req.setRequestHeader('Authorization', 'Basic ' + btoa('holger:QU11OWIz'))
req.onload = () => {
  console.log(req.response)
  for (let index = 0; index < req.response.length; index++) {
    projects.value.push({
      id: index,
      name: req.response[index].name,
      sphere: req.response[index].category.name,
      years: req.response[index].yearOfLaunch,
      link: req.response[index].linkToProject,
      description: req.response[index].description,
    })
  }
  console.log(projects.value)
}
req.onerror = () => {
  console.log('ашибка')
}
req.send()

console.log(projects)

const modalVisible = ref(false)
const msgForModal = ref({
  name: '',
  sphere: '',
  years: 0,
  link: '',
  description: '',
})

function showModal(id: number) {
  const infoPackForModal = projects.value[id]
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
