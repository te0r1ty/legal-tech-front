<template>
  <div class="list-wrap">
    <p>Одобрить запросы:</p>
    <div class="list-header"></div>
    <div class="list">
      <RequestListItem
        v-for="request in requests"
        :key="request.id"
        :id="request.id"
        :name="request.name"
        :createdAt="request.createdAt"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RequestListItem from './RequestListItem.vue'
interface Request {
  additionalInfo: string
  category: string
  createdAt: string
  description: string
  id: number
  imagePath: string
  linkToProject: string
  name: string
  status: string
  yearOfLaunch: number
}

interface apiResponse {
  additionalInfo: string
  category: { name: string }
  createdAt: string
  description: string
  id: number
  imagePath: string
  linkToProject: string
  name: string
  status: string
  yearOfLaunch: number
}

const requests = ref<Request[]>([])
const fetchRequests = async () => {
  try {
    const response = await fetch('http://62.84.115.34:8080/requests', {
      headers: {
        Authorization: 'Basic ' + btoa('holger:QU11OWIz'),
      },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch requests')
    }
    const data = await response.json()
    requests.value = data.map((item: apiResponse) => ({
      additionalInfo: item.additionalInfo,
      category: item.category.name,
      createdAt: item.createdAt,
      description: item.description,
      id: item.id,
      imagePath: item.imagePath,
      linkToProject: item.linkToProject,
      name: item.name,
      status: item.status,
      yearOfLaunch: item.yearOfLaunch,
    }))
  } catch (error) {
    console.error('Error fetching requests:', error)
  }
}
fetchRequests()
</script>

<style scoped lang="scss">
.list-wrap {
  width: 100%;
}
</style>
