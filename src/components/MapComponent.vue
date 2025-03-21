<template>
  <svg
    width="1700"
    height="1100"
    viewBox="0 0 1300 1100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="646" cy="569" r="395" stroke="#EEF1FE" stroke-width="10" />
    <path
      class="project-category-line"
      v-for="(line, index) in lines"
      :key="index"
      :d="line.d"
      :stroke="line.color"
      ref="mapLines"
    />
    <circle
      class="project-point"
      v-for="(point, index) in mapPoints"
      :key="'station-' + index"
      :cx="point.x"
      :cy="point.y"
      :fill="point.color"
      @mouseover="hoveredStationIndex = index"
      @mouseleave="hoveredStationIndex = null"
    />
    <!--TODO Сделать ховер и для текста (сейчас только для точки есть)-->
    <!-- :\\\transform="`rotate(${0} ${station.\\\x} ${station.\\\y})`"
     убрать слеши и добавить в тег текста, если понадобится вращение-->
    <text
      class="project-name"
      v-for="(point, index) in mapPoints"
      :key="'text-' + index"
      :x="point.x + 13"
      :y="point.y - 5"
      :transform="`rotate(${0} ${point.x} ${point.y})`"
      :class="{
        'projcet-name__not-hovered': hoveredStationIndex === null,
        'project-name__hovered': hoveredStationIndex === index,
        'project-name__hovered-another':
          hoveredStationIndex !== index && hoveredStationIndex !== null,
      }"
    >
      {{ point.projName }}
    </text>
    <defs>
      <clipPath id="clip0_321_307">
        <rect width="883" height="950" fill="white" transform="translate(203 75)" />
      </clipPath>
      <clipPath id="clip1_321_307">
        <rect width="29" height="29" fill="white" transform="translate(630 540)" />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { MAP_LINES } from '@/constants/map-lines.ts' //
import type { MapLine } from '@/constants/map-lines.ts'

interface MapPoint {
  x: number
  y: number
  color: string
  projName: string
}
interface Prj {
  id: number
  name: string
  sphere: string
  years: number
  link: string
  description: string
  additional: string
  imgurl: string
}
interface PrjServerResponse {
  id: number
  name: string
  category: { name: string }
  yearOfLaunch: number
  linkToProject: string
  description: string
  chtoto: string
  imagePath: string
}

const projects: Prj[] = []
const spheres: string[] = []

const lines = ref<MapLine[]>([])
MAP_LINES.forEach((line) => {
  lines.value.push(line)
})

const mapPoints = ref<MapPoint[]>([])
const mapLines = ref<SVGPathElement[]>([])
const hoveredStationIndex = ref<number | null>(null)

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
    data.forEach((category: { id: number; name: string }) => {
      spheres.push(category.name)
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}
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
    data.forEach((project: PrjServerResponse, index: number) => {
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

const calculateStations = () => {
  /*
  const cx = 646
  const cy = 569
  const r = 395
  */
  mapPoints.value = []

  mapLines.value.forEach((pathElement, pathIndex) => {
    const pathLength = pathElement.getTotalLength()
    const projectsOfThisLine = projects.filter((project) => project.sphere === spheres[pathIndex])
    const stationCount = projectsOfThisLine.length
    const step = pathLength / (stationCount - 1)

    for (let i = 0; i < stationCount; i++) {
      const point = pathElement.getPointAtLength(i * step)
      mapPoints.value.push({
        x: point.x,
        y: point.y,
        color: lines.value[pathIndex].color,
        projName: projectsOfThisLine[i].name,
      })
    }
  })

  /*
  for (let i = 0; i < stationCount.value; i++) {
    const angle = (2 * Math.PI * i) / stationCount.value
    mapPoints.value.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      color: '#eef1fe',
    })
  }*/
}

onMounted(async () => {
  await fetchData()
  calculateStations()
})

watch(projects, () => {
  calculateStations()
})
</script>

<style scoped lang="scss">
.project-name {
  font-size: 12px;
  font-weight: bold;
  fill: black;
  paint-order: stroke;
  stroke: white;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition:
    font-size 0.2s 0.3s,
    transform 0.2s 0.3s,
    opacity 0.2s 0.3s,
    stroke-width 0.2s 0.3s;

  &__not-hovered {
    opacity: 1;
  }
  &__hovered {
    font-size: 18px;
    stroke-width: 7;
    transform: translate(5px, 10px);
  }
  &__hovered-another {
    opacity: 0.1;
  }
}
.project-point {
  r: 12;
  transition: r 0.2s;
  transition-delay: 0.3s;
  cursor: pointer;

  &:hover {
    r: 14;
  }
}

.project-category-line {
  stroke-width: 10;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
