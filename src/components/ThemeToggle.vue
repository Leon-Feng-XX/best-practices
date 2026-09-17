<script setup lang="ts">
import type { Component } from 'vue'
import type { Theme } from '@/composables/useTheme'
import { Monitor, Moon, Sunny } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'

const { t } = useI18n()
const { mode, setTheme } = useTheme()

const items = computed<Array<{ key: Theme, label: string, icon: Component }>>(() => [
  { key: 'light', label: t('theme.light'), icon: Sunny },
  { key: 'dark', label: t('theme.dark'), icon: Moon },
  { key: 'auto', label: t('theme.auto'), icon: Monitor },
])

const currentIcon = computed<Component>(() => {
  if (mode.value === 'light')
    return Sunny
  if (mode.value === 'dark')
    return Moon
  return Monitor
})

function handleCommand(command: Theme) {
  setTheme(command)
}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <button
      type="button"
      class="btn btn--ghost btn--sm"
      :aria-label="t('theme.switch')"
    >
      <el-icon :size="18">
        <component :is="currentIcon" />
      </el-icon>
    </button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in items"
          :key="item.key"
          :command="item.key"
          :disabled="mode === item.key"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
