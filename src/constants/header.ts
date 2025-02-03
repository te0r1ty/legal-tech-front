interface HeaderLink {
  label: string
  link: string
}

export const NAV_LINKS: readonly HeaderLink[] = [
  {
    label: 'КАРТА',
    link: '/',
  },
  {
    label: 'МЕТОДОЛГИЯ',
    link: '/methods',
  },
  {
    label: 'ПРОЕКТЫ',
    link: '/projects',
  },
  {
    label: 'ДОБАВИТЬ ПРОЕКТ',
    link: '/offer',
  },
]
