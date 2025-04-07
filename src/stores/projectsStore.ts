import { projectsEndPoint } from '@/constants/api-links'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface Prj {
  id: number
  name: string
  sphere: string
  years: number
  link: string
  description: string
  additional: string
  imgurl: string
  owner: string
  contacts: string
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
  founder: string
  contacts: string
  additionalInfo: string
}

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Prj[]>([])
  let fetched = false

  function fetchProjects() {
    if (fetched) return

    const apiRequest = async () => {
      try {
        const response = await fetch(projectsEndPoint, {
          headers: {
            Authorization: 'Basic ' + btoa('holger:QU11OWIz'),
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }

        const data = await response.json()
        data.forEach((project: PrjServerResponse, index: number) => {
          projects.value.push({
            id: index,
            name: project.name,
            sphere: project.category.name,
            years: project.yearOfLaunch,
            link: project.linkToProject,
            description: project.description,
            additional: project.additionalInfo,
            imgurl: project.imagePath,
            owner: project.founder,
            contacts: project.contacts,
          })
        })

        projects.value.sort((a, b) => {
          if (a.years === null) return 1
          if (b.years === null) return -1
          return a.years - b.years
        })
        projects.value.forEach((project, index) => (project.id = index))
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }

    const fetchData = async () => {
      await Promise.all([apiRequest()])
    }

    fetchData()

    fetched = true
  }

  const projectsNamesAndIds = computed(() => {
    return projects.value
      .map((project) => ({ name: project.name, id: project.id }))
      .sort((a, b) => a.name.localeCompare(b.name))
  })

  const getProjectById = computed(() => {
    return (id: number) => projects.value.find((project) => project.id === id)
  })

  return { projects, fetchProjects, projectsNamesAndIds, getProjectById }
})
