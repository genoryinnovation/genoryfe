import { ref } from 'vue'

// Module-level singleton so all components share the same state
const isDark = ref(false)

export function useTheme() {
  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggle = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme(isDark.value)
  }

  // Call once at app startup — defaults to light if no saved preference
  const init = () => {
    const saved = localStorage.getItem('theme')
    isDark.value = saved === 'dark'
    applyTheme(isDark.value)
  }

  return { isDark, toggle, init }
}
