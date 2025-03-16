<template>
  <div class="projects-wrap">
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
      />
    </transition>
    <h1 class="projects-head1">ПРОЕКТЫ</h1>
    <p class="prj-count">ВСЕГО ПРОЕКТОВ: {{ projects.length }}</p>
    <div class="settings-wrap">
      <p class="settings-wrap__txt">ВЫБРАНО ПРОЕКТОВ: {{ showingProjects.length }}</p>
      <select class="filter" v-model="chosenFilter">
        <option class="opt" v-for="opt in selectSphereMenu" :key="opt.id" :value="opt.id">
          {{ opt.name }}
        </option>
      </select>
    </div>
    <div class="list-wrap">
      <ProjectCard
        @msg-for-modal="showModal"
        v-for="project in showingProjects"
        :key="project.id"
        :id="project.id"
        :name="project.name"
        :img="`http://62.84.115.34:80/img-cloning/${project.imgurl}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalWindow from '@/components/ModalWindow.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { ref, watch } from 'vue'

interface selectSphereMenuRow {
  id: number
  name: string
}

const selectSphereMenu = ref<selectSphereMenuRow[]>([])

const fetchCategories = async () => {
  try {
    const response = await fetch('http://62.84.115.34:8080/categories', {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + btoa('holger:QU11OWIz'),
      },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    const data = await response.json()
    selectSphereMenu.value.push({ id: 0, name: 'Все категории' })
    data.forEach((category: { name: string }, index: number) => {
      selectSphereMenu.value.push({ id: index + 1, name: category.name })
    })
    console.log(selectSphereMenu.value)
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

interface prj {
  id: number
  name: string
  sphere: string
  years: number
  link: string
  description: string
  additional: string
  imgurl: string
}

interface prjServerResponse {
  id: number
  name: string
  category: { name: string }
  yearOfLaunch: number
  linkToProject: string
  description: string
  chtoto: string
  imagePath: string
}

const projects: prj[] = []
const showingProjects = ref<prj[]>([])

const fetchProjects = async () => {
  try {
    const response = await fetch('http://62.84.115.34:8080/companies', {
      headers: {
        Authorization: 'Basic ' + btoa('holger:QU11OWIz'),
      },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    const data = await response.json()
    data.forEach((project: prjServerResponse, index: number) => {
      projects.push({
        id: index,
        name: project.name,
        sphere: project.category.name,
        years: project.yearOfLaunch,
        link: project.linkToProject,
        description: project.description,
        additional: project.chtoto,
        imgurl: project.imagePath,
      })
    })
    showingProjects.value = projects
    console.log(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    for (let index = 0; index < 7; index++) {
      projects.push({
        id: index,
        name: `Имя ${index}`,
        sphere: `сфера ${index}`,
        years: index,
        link: `ссылка ${index}`,
        description: `описание ${index}`,
        additional: `доп инфа ${index}`,
        imgurl: '@/assets/pictures/заплатка.png',
      })
    }
  }
}

const fetchData = async () => {
  await Promise.all([fetchCategories(), fetchProjects()])
}

fetchData()

console.log(projects)

const chosenFilter = ref(0)
const modalVisible = ref(false)
const msgForModal = ref({
  name: '',
  sphere: '',
  years: 0,
  link: '',
  description: '',
})

watch(chosenFilter, () => {
  if (chosenFilter.value === 0) {
    showingProjects.value = projects
  } else {
    showingProjects.value = projects.filter(
      (project) => project.sphere === selectSphereMenu.value[chosenFilter.value].name,
    )
  }
  console.log(showingProjects.value)
})

function showModal(id: number) {
  const infoPackForModal = projects[id]
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
.prj-count {
  margin-top: 376px;
  font-size: 28px;
}
.opt {
  width: 39em;
}
.filter {
  background-color: #d9d9d9;
  border-radius: 4px;
  border-width: 1px;
  border-color: #5574f8;
  border-style: solid;
  width: clamp(100px, 39vw, 700px);
  height: 60px;
  font-size: 17px;
  letter-spacing: 0.05em;
  resize: none;
  padding: 5px 5px;
}
.modal {
  z-index: 99999;
}
.settings-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  &__txt {
    font-size: 28px;
  }
}
.list-wrap {
  display: flex;
  flex-wrap: wrap;
  column-gap: 29px;
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
