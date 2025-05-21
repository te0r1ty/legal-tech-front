import { defineAsyncComponent, h, markRaw, type Component } from 'vue'
import RequestsList from '@/components/RequestsList.vue'
import ProjectsList from '@/components/ProjectsList.vue'

const PlaceholderComponent = (name: string): Component =>
  markRaw(
    defineAsyncComponent(() =>
      Promise.resolve({
        render: () => h('div', { class: 'placeholder' }, `Раздел "${name}" в разработке`),
      }),
    ),
  )

interface AdminMenuLink {
  label: string
  component: Component
}

export const NAV_LINKS: readonly AdminMenuLink[] = [
  {
    label: 'Одобрить запросы',
    component: markRaw(RequestsList),
  },
  {
    label: 'Редактировать карту',
    component: PlaceholderComponent('Редактировать карту'),
  },
  {
    label: 'Редактировать проекты',
    component: markRaw(ProjectsList),
  },
  {
    label: 'Редактировать методологию',
    component: PlaceholderComponent('Редактировать методологию'),
  },
  {
    label: 'Метрики',
    component: PlaceholderComponent('Метрики'),
  },
  {
    label: 'Реклама',
    component: PlaceholderComponent('Реклама'),
  },
]
