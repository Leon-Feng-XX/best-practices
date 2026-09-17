import { useColorMode } from '@vueuse/core'

export type Theme = 'light' | 'dark' | 'auto'

/**
 * Theme management with three modes:
 * - light: force light
 * - dark: force dark
 * - auto: follow system preference
 *
 * The `.dark` class on <html> drives both Tailwind dark variant
 * and Element Plus dark theme (they share the same class name).
 */
export function useTheme() {
  const mode = useColorMode<Theme>({
    selector: 'html',
    attribute: 'class',
    modes: {
      dark: 'dark',
      light: 'light',
    },
    initialValue: 'auto',
    storageKey: 'theme',
    emitAuto: true,
  })

  function setTheme(theme: Theme) {
    mode.value = theme
  }

  return { mode, setTheme }
}
