<script setup lang="ts">
import elementEn from 'element-plus/es/locale/lang/en'
import elementZhCn from 'element-plus/es/locale/lang/zh-cn'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const { t, locale } = useI18n()

const elementLocale = computed(() =>
  locale.value === 'zh-CN' ? elementZhCn : elementEn,
)
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <div class="min-h-screen bg-background text-foreground">
      <header class="border-b border-border">
        <div class="mx-auto flex max-w-3xl items-center justify-between px-8 py-3">
          <RouterLink to="/" class="font-semibold text-foreground">
            {{ t('app.title') }}
          </RouterLink>
          <div class="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <RouterView />
    </div>
  </el-config-provider>
</template>
