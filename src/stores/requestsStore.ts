import { requestsEndPoint } from '@/constants/api-links'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

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

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref<Request[]>([])
  let fetched = false

  function fetchRequests() {
    if (fetched) return

    const apiRequest = async () => {
      try {
        const response = await fetch(requestsEndPoint, {
          method: 'GET',
          headers: {
            Authorization: 'Basic ' + btoa('holger:QU11OWIz'),
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch requests')
        }

        const data = await response.json()
        data.forEach((request: apiResponse) => {
          requests.value.push({
            additionalInfo: request.additionalInfo,
            category: request.category.name,
            createdAt: request.createdAt,
            description: request.description,
            id: request.id,
            imagePath: request.imagePath,
            linkToProject: request.linkToProject,
            name: request.name,
            status: request.status,
            yearOfLaunch: request.yearOfLaunch,
          })
        })

        requests.value.reverse()
      } catch (error) {
        console.error('Error fetching projects: ', error)
      }
    }

    const fetchData = async () => {
      await Promise.all([apiRequest()])
    }

    fetchData()

    fetched = true
  }

  const totalRequests = computed(() => {
    return requests.value.length
  })

  return { requests, fetchRequests, totalRequests }
})
