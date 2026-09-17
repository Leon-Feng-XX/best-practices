<script setup lang="ts">
import type { SupportedLocale } from '@/locales'
import { useI18n } from 'vue-i18n'
import { setLocale, SUPPORT_LOCALES } from '@/locales'

const { t, locale } = useI18n()

const labels: Record<SupportedLocale, string> = {
  'en': 'English',
  'zh-CN': '简体中文',
}

const items = SUPPORT_LOCALES.map(code => ({
  key: code,
  label: labels[code],
}))

function handleCommand(command: SupportedLocale) {
  setLocale(command)
}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <button
      type="button"
      class="btn btn--ghost btn--sm"
      :aria-label="t('language.switch')"
    >
      {{ locale === 'zh-CN' ? '中' : 'EN' }}
    </button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in items"
          :key="item.key"
          :command="item.key"
          :disabled="locale === item.key"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
