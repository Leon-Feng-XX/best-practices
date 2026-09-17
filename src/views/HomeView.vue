<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HelloWorld from '@/components/HelloWorld.vue'
import { useCounterStore } from '@/stores/counter'

const { t } = useI18n()
const counter = useCounterStore()
const text = ref('')
const date = ref('')
</script>

<template>
  <main class="mx-auto max-w-3xl space-y-8 p-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold text-foreground">
        {{ t('home.title') }}
      </h1>
      <p class="text-muted-foreground">
        {{ t('home.subtitle') }}
      </p>
    </header>

    <section class="card">
      <div class="card__header">
        <h2 class="card__title">
          {{ t('home.piniaTitle') }}
        </h2>
        <p class="card__description">
          {{ t('home.piniaDescription') }}
        </p>
      </div>
      <div class="card__body space-y-4">
        <p class="text-foreground">
          {{ t('home.count') }}: <span class="font-mono text-primary-600">{{ counter.count }}</span>
          / {{ t('home.double') }}: <span class="font-mono text-primary-600">{{ counter.doubleCount }}</span>
        </p>
        <button class="btn btn--primary" @click="counter.increment()">
          {{ t('home.increment') }}
        </button>
      </div>
    </section>

    <section class="card">
      <div class="card__header">
        <h2 class="card__title">
          {{ t('home.elementTitle') }}
        </h2>
        <p class="card__description">
          {{ t('home.elementDescription') }}
        </p>
      </div>
      <div class="card__body space-y-4">
        <el-space wrap>
          <el-button type="primary">
            {{ t('home.primaryButton') }}
          </el-button>
          <el-button>{{ t('home.defaultButton') }}</el-button>
          <el-button type="success">
            {{ t('home.successButton') }}
          </el-button>
          <el-button type="warning">
            {{ t('home.warningButton') }}
          </el-button>
          <el-button type="danger">
            {{ t('home.dangerButton') }}
          </el-button>
        </el-space>

        <el-input v-model="text" :placeholder="t('home.inputPlaceholder')" />
        <el-date-picker
          v-model="date"
          type="date"
          :placeholder="t('home.datePlaceholder')"
          class="w-full"
        />
      </div>
    </section>

    <HelloWorld :msg="t('home.greeting')" />

    <div class="pt-4">
      <RouterLink class="link link--underline" to="/about">
        {{ t('home.aboutLink') }}
      </RouterLink>
    </div>

    <section class="card">
      <div class="card__header">
        <h2 class="card__title">
          Icons
        </h2>
        <p class="card__description">
          unplugin-icons + Iconify — 无需 import
        </p>
      </div>
      <div class="card__body">
        <div class="flex flex-wrap items-center gap-4 text-2xl">
          <i-mdi-github class="text-foreground" />
          <i-mdi-twitter class="text-primary-500" />
          <i-mdi-heart class="text-danger" />
          <i-lucide-user class="text-foreground" />
          <i-lucide-sun class="text-warning" />
          <i-lucide-moon class="text-foreground" />
        </div>
      </div>
    </section>

    <div class="flex flex-wrap gap-4 pt-4">
      <RouterLink class="link link--underline" to="/about">
        {{ t('home.aboutLink') }}
      </RouterLink>
      <RouterLink class="link link--underline" to="/data-fetching">
        Data Fetching Demo →
      </RouterLink>
      <RouterLink class="link link--underline" to="/form-demo">
        Form Validation Demo →
      </RouterLink>
    </div>
  </main>
</template>
