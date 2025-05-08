<template>
  <svg
    width="1900"
    height="1100"
    viewBox="0 0 1330 1100"
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
      @click="clicked(point.projId)"
    />
    <text
      class="project-name"
      v-for="(point, index) in mapPoints"
      :key="'text-' + index"
      :x="point.textX"
      :y="point.textY"
      :text-anchor="point.textAnchor"
      :class="{
        'projcet-name__not-hovered': hoveredStationIndex === null,
        'project-name__hovered': hoveredStationIndex === index,
        'project-name__hovered-another':
          hoveredStationIndex !== index && hoveredStationIndex !== null,
      }"
      @mouseover="hoveredStationIndex = index"
      @mouseleave="hoveredStationIndex = null"
      @click="clicked(point.projId)"
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
import { MAP_LINES, PointPlacer, type MapLine, type MapPoint } from '@/constants/map-lines.ts'
import { useProjectsStore, type Prj } from '@/stores/projectsStore.ts'
import { categoriesEndPoint } from '@/constants/api-links'

const projectsStore = useProjectsStore()
projectsStore.fetchProjects()
const projects: Prj[] = projectsStore.projects
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
    data.forEach((category: { id: number; name: string }) => {
      spheres.push(category.name)
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}
const fetchData = async () => {
  await Promise.all([fetchCategories()])
}

const calculateStations = () => {
  mapPoints.value = []

  mapLines.value.forEach((pathElement, pathIndex) => {
    const projectsOfThisLine = projects.filter((project) => project.sphere === spheres[pathIndex])
    let points: MapPoint[] = []

    if (pathElement.getAttribute('stroke') === '#9A292E') {
      points = PointPlacer.VertDarkRedMakePoints(pathElement, projectsOfThisLine)
    } else if (pathElement.getAttribute('stroke') === '#6D9AB4') {
      points = PointPlacer.VertLightBlueMakePoints(pathElement, projectsOfThisLine)
    } else if (pathElement.getAttribute('stroke') === '#432F6E') {
      points = PointPlacer.CentralDarkBlueMakePoints(pathElement, projectsOfThisLine)
    } else if (pathElement.getAttribute('stroke') === '#BC3836') {
      points = PointPlacer.CentralLightRedMakePoints(pathElement, projectsOfThisLine)
    } else if (pathElement.getAttribute('stroke') === '#629C4E') {
      points = PointPlacer.HorGreenMakePoints(pathElement, projectsOfThisLine)
    } else if (pathElement.getAttribute('stroke') === '#E3B446') {
      points = PointPlacer.HorYellowMakePoints(pathElement, projectsOfThisLine)
    } else if (
      pathElement.getAttribute('stroke') === '#91BB58' ||
      pathElement.getAttribute('stroke') === '#DADE52'
    ) {
      points = PointPlacer.TopBottomMakePoints(pathElement, projectsOfThisLine)
    } else if (
      pathElement.getAttribute('stroke') === '#5E5C58' ||
      pathElement.getAttribute('stroke') === '#394D8B'
    ) {
      points = PointPlacer.SideMakePoints(pathElement, projectsOfThisLine)
    } else if (pathElement.getAttribute('stroke') === '#935A91') {
      points = PointPlacer.VertPurpleMakePoints(pathElement, projectsOfThisLine)
    }

    points.forEach((point) => {
      mapPoints.value.push(point)
    })
  })
}

onMounted(async () => {
  await fetchData()
  calculateStations()
})

watch(projects, () => {
  calculateStations()
})

const emits = defineEmits(['msgForModal'])
function clicked(id: number) {
  emits('msgForModal', id)
}
</script>

<style scoped lang="scss">
.project-name {
  font-size: 11px;
  font-weight: small;
  fill: black;
  paint-order: stroke;
  stroke: white;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  cursor: pointer;
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
}
// TODO сделать общую обработку hover
.project-category-line {
  stroke-width: 10;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
