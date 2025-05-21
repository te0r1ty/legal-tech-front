<template>
  <div class="list-wrap">
    <p>Редактировать проекты:</p>
    <div class="list-header"></div>
    <div class="list">
      <ProjectListItem
        v-for="project in projects"
        :key="project.id"
        :full-img-link="`${imgEndPoint}/${project.imgurl}`"
        :name="project.name"
      >
      </ProjectListItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectListItem from './ProjectListItem.vue'
import { useProjectsStore } from '@/stores/projectsStore.ts'
import type { Prj } from '@/stores/projectsStore.ts'
import { imgEndPoint } from '@/constants/api-links.ts'

useProjectsStore().fetchProjects()
const projects: Prj[] = useProjectsStore().projects
</script>

<style scoped lang="scss">
.list-wrap {
  width: 100%;
}
</style>
