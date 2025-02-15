<template>
  <svg
    width="1300"
    height="1100"
    viewBox="0 0 1300 1100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="646" cy="569" r="395" stroke="#5574F8" stroke-opacity="0.1" stroke-width="10" />
    <path
      v-for="(line, index) in lines"
      :key="index"
      :d="line.d"
      :stroke="line.color"
      stroke-width="10"
      fill="none"
      ref="mapLines"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      v-for="(station, index) in stations"
      :key="'station-' + index"
      :cx="station.x"
      :cy="station.y"
      r="8"
      fill="white"
      stroke="black"
      stroke-width="2"
    />
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
import { MAP_LINES } from '@/constants/map-lines.ts'
import type { MapLine } from '@/constants/map-lines.ts'

interface Station {
  x: number
  y: number
  pathIndex: number
}

const lines = ref<MapLine[]>([])
MAP_LINES.forEach((line) => {
  lines.value.push(line)
})

const stations = ref<Station[]>([])
const stationCount = ref<number>(6)
const mapLines = ref<SVGPathElement[]>([])

const calculateStations = () => {
  stations.value = []
  nextTick(() => {
    mapLines.value.forEach((pathElement, pathIndex) => {
      const pathLength = pathElement.getTotalLength()
      const step = pathLength / (stationCount.value - 1)

      for (let i = 0; i < stationCount.value; i++) {
        const point = pathElement.getPointAtLength(i * step)
        stations.value.push({ x: point.x, y: point.y, pathIndex })
      }
    })
    //TODO Сделать такую же для кольцевой линии
  })
}
onMounted(() => {
  calculateStations()
})

watch(stationCount, () => {
  calculateStations()
})
</script>

<style scoped lang="scss"></style>
