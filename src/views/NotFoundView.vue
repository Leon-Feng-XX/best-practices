<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <main class="mx-auto max-w-3xl p-8 text-center">
    <h1 class="text-6xl font-bold text-primary-600">
      {{ t('notFound.title') }}
    </h1>
    <p class="mt-4 text-muted-foreground">
      {{ t('notFound.description') }}
    </p>
    <RouterLink class="link link--underline mt-6 inline-block" to="/">
      {{ t('notFound.back') }}
    </RouterLink>
  </main>
</template>
