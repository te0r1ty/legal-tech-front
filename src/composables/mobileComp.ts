import { onMounted, onUnmounted, ref } from 'vue'

export function useIsMobile(breakpoint = 1024) {
  const isMobile = ref(false)

  function checkScreenWidth() {
    isMobile.value = window.outerWidth <= breakpoint
    console.log('isMobile', isMobile.value, window.outerWidth, window.outerWidth)
  }

  onMounted(() => {
    checkScreenWidth()
    window.addEventListener('resize', checkScreenWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenWidth)
  })

  return isMobile
}
