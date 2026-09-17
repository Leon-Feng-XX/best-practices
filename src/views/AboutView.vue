<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <main class="mx-auto max-w-3xl p-8">
    <h1 class="text-3xl font-bold text-foreground">
      {{ t('about.title') }}
    </h1>
    <p class="mt-4 text-muted-foreground">
      {{ t('about.description') }}
    </p>
    <RouterLink class="link link--underline mt-6 inline-block" to="/">
      {{ t('about.back') }}
    </RouterLink>
    <div class="flex flex-wrap gap-4 pt-4">
      <RouterLink class="link link--underline" to="/about">
        {{ t('home.aboutLink') }}
      </RouterLink>
      <RouterLink class="link link--underline" to="/data-fetching">
        Data Fetching Demo →
      </RouterLink>
    </div>
  </main>
</template>
