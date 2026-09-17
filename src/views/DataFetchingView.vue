<script setup lang="ts">
import type { AxiosInstance } from 'axios'
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Post {
  id: number
  title: string
  body: string
}

// Demo API client — uses a public test endpoint so it works without a backend.
const demoApi: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10_000,
})

const { data, isPending, error, refetch } = useQuery({
  queryKey: ['demo', 'posts'],
  queryFn: () => demoApi.get<Post[]>('/posts?_limit=5').then(r => r.data),
})
</script>

<template>
  <main class="mx-auto max-w-3xl space-y-6 p-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold text-foreground">
        {{ t('dataFetching.title') }}
      </h1>
      <p class="text-muted-foreground">
        {{ t('dataFetching.subtitle') }}
      </p>
    </header>

    <div v-if="isPending" class="card">
      <div class="card__body text-muted-foreground">
        {{ t('dataFetching.loading') }}
      </div>
    </div>

    <div v-else-if="error" class="card">
      <div class="card__body space-y-4">
        <p class="text-danger">
          {{ t('dataFetching.error') }}: {{ error.message }}
        </p>
        <button class="btn btn--primary" @click="refetch()">
          {{ t('dataFetching.retry') }}
        </button>
      </div>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="post in data"
        :key="post.id"
        class="card card--hoverable"
      >
        <div class="card__header">
          <h2 class="card__title">
            {{ post.title }}
          </h2>
        </div>
        <div class="card__body">
          <p class="text-sm text-muted-foreground">
            {{ post.body }}
          </p>
        </div>
      </div>

      <div class="pt-4">
        <button class="btn btn--outline" @click="refetch()">
          {{ t('dataFetching.refresh') }}
        </button>
      </div>
    </div>

    <div class="pt-4">
      <RouterLink class="link link--underline" to="/">
        {{ t('dataFetching.back') }}
      </RouterLink>
    </div>
  </main>
</template>
