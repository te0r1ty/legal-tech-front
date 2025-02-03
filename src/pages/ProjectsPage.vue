<template>
  <div class="projects-wrap">
    <h1 class="projects-head1">ПРОЕКТЫ</h1>
    <div class="sort-settings-wrap">
      <p class="sort-settings-wrap__txt">ВСЕГО ПРОЕКТОВ: {{ projects.length }}</p>
    </div>
    <div class="list-wrap">
      <ProjectCard v-for="project in projects" :key="project.id" :name="project.title" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
const projects = [
  { id: 1, title: 'name1' },
  { id: 2, title: 'name2' },
  { id: 3, title: 'name3' },
  { id: 4, title: 'name4' },
  { id: 5, title: 'name5' },
  { id: 6, title: 'name6' },
  { id: 7, title: 'name7' },
]
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
</style>
