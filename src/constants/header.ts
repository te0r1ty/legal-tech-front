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
    label: 'МЕТОДОЛОГИЯ',
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
