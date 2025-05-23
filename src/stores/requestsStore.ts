import { getToken } from '@/auth/authService'
import { requestsEndPoint } from '@/constants/api-links'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface RequestData {
  additionalInfo: string
  categoryId: number
  createdAt: string
  contacts: string
  description: string
  owner: string
  id: number
  imagePath: string
  linkToProject: string
  name: string
  status: string
  requestType: string
  yearOfLaunch: number
}

interface apiResponse {
  additionalInfo: string
  category: { id: number; name: string }
  createdAt: string
  description: string
  founder: string
  contacts: string
  id: number
  imagePath: string
  linkToProject: string
  name: string
  status: string
  requestType: string
  yearOfLaunch: number
}

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref<RequestData[]>([])
  let fetched = false

  function fetchRequests() {
    if (fetched) return

    const apiRequest = async () => {
      try {
        const response = await fetch(requestsEndPoint, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + getToken(),
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch requests')
        }

        const data = await response.json()
        data.forEach((request: apiResponse) => {
          requests.value.push({
            additionalInfo: request.additionalInfo,
            categoryId: request.category.id,
            createdAt: request.createdAt,
            contacts: request.contacts,
            owner: request.founder,
            description: request.description,
            id: request.id,
            imagePath: request.imagePath,
            linkToProject: request.linkToProject,
            name: request.name,
            status: request.status,
            requestType: request.requestType,
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

  const getRequestById = computed(() => {
    return (id: number) => requests.value.find((request) => request.id === id) as RequestData
  })

  function refreshStore() {
    fetched = false
    requests.value = []
    fetchRequests()
  }

  return { requests, fetchRequests, refreshStore, totalRequests, getRequestById }
})
