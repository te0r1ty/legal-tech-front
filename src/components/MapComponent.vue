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
      class="project-category"
      v-for="(line, index) in lines"
      :key="index"
      :d="line.d"
      :stroke="line.color"
      ref="mapLines"
    />
    <circle
      class="project-point"
      v-for="(station, index) in stations"
      :key="'station-' + index"
      :cx="station.x"
      :cy="station.y"
      :fill="station.color"
      @mouseover="hoveredStationIndex = index"
      @mouseleave="hoveredStationIndex = null"
    />
    <!-- :\\\transform="`rotate(${0} ${station.\\\x} ${station.\\\y})`"
     убрать слеши и добавить в тег текста, если понадобится вращение-->
    <text
      class="project-name"
      v-for="(station, index) in stations"
      :key="'text-' + index"
      :x="station.x + 13"
      :y="station.y - 5"
      :class="{
        'projcet-name__not-hovered': hoveredStationIndex === null,
        'project-name__hovered': hoveredStationIndex === index,
        'project-name__hovered-another':
          hoveredStationIndex !== index && hoveredStationIndex !== null,
      }"
    >
      {{ 'Station name number ' + (index + 1) }}
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
import { ref, onMounted, watch, nextTick } from 'vue'
import { MAP_LINES } from '@/constants/map-lines.ts' //
import type { MapLine } from '@/constants/map-lines.ts'

interface Station {
  x: number
  y: number
  color: string
}

const lines = ref<MapLine[]>([])
MAP_LINES.forEach((line) => {
  lines.value.push(line)
})

const stations = ref<Station[]>([])
const stationCount = ref<number>(6)
const mapLines = ref<SVGPathElement[]>([])
const hoveredStationIndex = ref<number | null>(null)

const calculateStations = () => {
  const cx = 646
  const cy = 569
  const r = 395
  stations.value = []
  nextTick(() => {
    mapLines.value.forEach((pathElement, pathIndex) => {
      const pathLength = pathElement.getTotalLength()
      const step = pathLength / (stationCount.value - 1)

      for (let i = 0; i < stationCount.value; i++) {
        const point = pathElement.getPointAtLength(i * step)
        stations.value.push({ x: point.x, y: point.y, color: lines.value[pathIndex].color })
      }
    })

    for (let i = 0; i < stationCount.value; i++) {
      const angle = (2 * Math.PI * i) / stationCount.value
      stations.value.push({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        color: '#eef1fe',
      })
    }
  })
}
onMounted(() => {
  calculateStations()
})

watch(stationCount, () => {
  calculateStations()
})
</script>

<style scoped lang="scss">
.project-name {
  font-size: 14px;
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
    opacity 0.2s 0.3s;

  &__not-hovered {
    opacity: 1;
  }
  &__hovered {
    font-size: 18px;
    transform: translate(5px, 10px);
    z-index: 9999;
  }
  &__hovered-another {
    opacity: 0.1;
  }
}
.project-point {
  r: 8;
  stroke: white;
  stroke-width: 3;
  transition: r 0.2s;
  transition-delay: 0.3s;
  cursor: pointer;

  &:hover {
    r: 14;
  }
}

.project-category {
  stroke-width: 10;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
