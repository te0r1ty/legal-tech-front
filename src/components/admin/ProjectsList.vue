<template>
  <div class="list-wrap">
    <transition name="fade" appear>
      <ProjectModal
        class="modal"
        @close-modal="closeModal"
        @close-with-changes="(closeModal(), refreshList())"
        v-if="modalVisible"
        :prj="useProjectsStore().getProjectById(idForModal)"
      />
    </transition>
    <p>Редактировать проекты:</p>
    <div class="list-header"></div>
    <div class="list">
      <ProjectListItem
        @msgForModal="showModal"
        v-for="project in projects"
        :key="project.id"
        :id="project.id"
        :full-img-link="`${imgEndPoint}/${project.imgurl}`"
        :name="project.name"
      >
      </ProjectListItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectListItem from './ProjectListItem.vue'
import ProjectModal from './ProjectModal.vue'
import { useProjectsStore } from '@/stores/projectsStore.ts'
import type { Prj } from '@/stores/projectsStore.ts'
import { imgEndPoint } from '@/constants/api-links.ts'
import { ref } from 'vue'

useProjectsStore().fetchProjects()
const projects = ref<Prj[]>(useProjectsStore().projects)

const modalVisible = ref(false)
const idForModal = ref(-1)

function showModal(id: number) {
  idForModal.value = id
  modalVisible.value = true
}

function closeModal() {
  modalVisible.value = false
  idForModal.value = -1
}
function refreshList() {
  useProjectsStore().refreshStore()
  projects.value = useProjectsStore().projects
}
</script>

<style scoped lang="scss">
.modal {
  z-index: 99999;
  max-height: calc(100vh);
  overflow-y: auto;
}
.list-wrap {
  width: 100%;
}
</style>
