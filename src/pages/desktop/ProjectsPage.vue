<template>
  <div class="projects-wrap">
    <transition name="fade-modal" appear>
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
    <h1 class="projects-head1">
      ПРОЕКТЫ <span class="total">(всего {{ projects.length }})</span>
    </h1>
    <div class="settings-wrap additional-margin">
      <div style="width: 49%; display: flex">
        <textarea
          v-model="textFilter"
          class="filter textarea-width"
          placeholder="Наименование проекта"
        ></textarea>
        <img
          @click="applyFilters"
          class="search-btn"
          src="@/assets/pictures/search.svg"
          alt="search-btn"
        />
      </div>
      <select class="filter filter-width select-arrow" v-model="chosenFilter">
        <option class="opt" v-for="opt in selectSphereMenu" :key="opt.id" :value="opt.id">
          {{ opt.name }}
        </option>
      </select>
    </div>
    <p class="settings-wrap__txt">ПРОЕКТОВ В ВЫБРАННЫХ ФИЛЬТРАХ: {{ showingProjects.length }}</p>
    <div class="list-wrap">
      <ProjectCard
        @msg-for-modal="showModal"
        v-for="project in showingProjects"
        :key="project.id"
        :id="project.id"
        :name="project.name"
        :full-img-link="`${imgEndPoint}/${project.imgurl}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalWindow from '@/components/desktop/ModalWindow.vue'
import ProjectCard from '@/components/desktop/ProjectCard.vue'
import { categoriesEndPoint, imgEndPoint } from '@/constants/api-links'
import { useProjectsStore } from '@/stores/projectsStore'
import type { Prj } from '@/stores/projectsStore'
import { ref, watch } from 'vue'

interface selectSphereMenuRow {
  id: number
  name: string
}

const selectSphereMenu = ref<selectSphereMenuRow[]>([])

const fetchCategories = async () => {
  try {
    const response = await fetch(categoriesEndPoint, {
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
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const projectsStore = useProjectsStore()
useProjectsStore().fetchProjects()
const projects: Prj[] = projectsStore.projects
const showingProjects = ref<Prj[]>(projects)

const fetchData = async () => {
  await Promise.all([fetchCategories()])
}

fetchData()

const textFilter = ref('')
const chosenFilter = ref(0)
const modalVisible = ref(false)
const msgForModal = ref({
  name: '',
  sphere: '',
  years: 0,
  link: '',
  description: '',
  additional: '',
})

function applyFilters() {
  if (chosenFilter.value === 0 && textFilter.value != '') {
    showingProjects.value = projects.filter((project) =>
      project.name.toLowerCase().includes(textFilter.value.toLowerCase()),
    )
  } else if (chosenFilter.value === 0) {
    showingProjects.value = projects
  } else {
    if (!(textFilter.value === '')) {
      showingProjects.value = projects.filter(
        (project) =>
          project.sphere === selectSphereMenu.value[chosenFilter.value].name &&
          project.name.toLowerCase().includes(textFilter.value.toLowerCase()),
      )
      return
    }

    showingProjects.value = projects.filter(
      (project) => project.sphere === selectSphereMenu.value[chosenFilter.value].name,
    )
  }
}

watch(chosenFilter, applyFilters)

function showModal(id: number) {
  const infoPackForModal = projects[id]
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
.select-arrow {
  appearance: none;
  background-image: url('@/assets/pictures/select-arrow.svg');
  background-repeat: no-repeat;
  background-position-x: 99.5%;
  background-position-y: 49%;
}
.total {
  font-size: 30px;
  font-weight: 100;
  color: #b5b5b5;
}
.search-btn {
  position: relative;
  width: 35px;
  right: 50px;
  cursor: pointer;
  z-index: 99;
}
.filter-width {
  padding: 5px 5px;
  font-size: 17px;
  height: 60px;
  width: 49%;
}
.textarea-width {
  padding: 20px 60px 20px 5px;
  font-size: 17px;
  height: 18px;
  width: 100%;
  overflow: hidden;
}
.additional-margin {
  margin-top: 40px;
}
.opt {
  width: 39em;
}
.filter {
  background-color: #ffffff;
  border-radius: 4px;
  border-width: 2px;
  border-color: #dadada;
  border-style: solid;
  letter-spacing: 0.05em;
  resize: none;

  &:focus {
    outline-color: #5573f89c;
  }
}
.modal {
  z-index: 99999;
  max-height: calc(100vh);
  overflow-y: auto;
}
.settings-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  &__txt {
    font-size: 28px;
    margin: 50px 0;
  }
}
.list-wrap {
  display: flex;
  flex-wrap: wrap;
  column-gap: 29px;
  row-gap: 20px;
  margin-bottom: 100px;
}
.projects-head1 {
  margin: 0 auto;
  text-align: left;
  font-size: 80px;
}
.projects-wrap {
  margin: 60px 8.3% 0 8.3%;
}

.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.3s ease;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}
.fade-modal-enter-to,
.fade-modal-leave-from {
  opacity: 1;
}
</style>
