interface HeaderLink {
  label: string
  link: string
}

export const NAV_LINKS: readonly HeaderLink[] = [
  {
    label: 'Карта',
    link: '/',
  },
  {
    label: 'Методолгия',
    link: '/methods',
  },
  {
    label: 'Проекты',
    link: '/projects',
  },
  {
    label: 'Редактировать карту',
    link: '/offer',
  },
]
