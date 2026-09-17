<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { userSchema } from '@/schemas/user'

const { t } = useI18n()

const { values, errors, handleSubmit, isSubmitting, resetForm, meta } = useForm({
  validationSchema: toTypedSchema(userSchema),
  initialValues: {
    name: '',
    email: '',
    password: '',
  },
})

const submitted = ref(false)

const onSubmit = handleSubmit(() => {
  submitted.value = true
})

function handleReset() {
  resetForm()
  submitted.value = false
}
</script>

<template>
  <main class="mx-auto max-w-3xl space-y-6 p-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold text-foreground">
        {{ t('formDemo.title') }}
      </h1>
      <p class="text-muted-foreground">
        {{ t('formDemo.subtitle') }}
      </p>
    </header>

    <el-form
      class="card"
      label-position="top"
      @submit.prevent="onSubmit"
    >
      <div class="card__header">
        <h2 class="card__title">
          {{ t('formDemo.formTitle') }}
        </h2>
        <p class="card__description">
          {{ t('formDemo.formDescription') }}
        </p>
      </div>

      <div class="card__body space-y-4">
        <el-form-item :label="t('formDemo.nameLabel')" :error="errors.name">
          <el-input
            v-model="values.name"
            :placeholder="t('formDemo.namePlaceholder')"
          />
        </el-form-item>

        <el-form-item :label="t('formDemo.emailLabel')" :error="errors.email">
          <el-input
            v-model="values.email"
            :placeholder="t('formDemo.emailPlaceholder')"
          />
        </el-form-item>

        <el-form-item :label="t('formDemo.passwordLabel')" :error="errors.password">
          <el-input
            v-model="values.password"
            type="password"
            show-password
            :placeholder="t('formDemo.passwordPlaceholder')"
          />
        </el-form-item>
      </div>

      <div class="card__footer flex items-center justify-between">
        <span class="text-sm text-muted-foreground">
          {{ t('formDemo.status', { valid: meta.valid, dirty: meta.dirty }) }}
        </span>
        <div class="flex gap-2">
          <el-button :disabled="!meta.dirty" @click="handleReset">
            {{ t('formDemo.reset') }}
          </el-button>
          <el-button
            type="primary"
            native-type="submit"
            :loading="isSubmitting"
          >
            {{ t('formDemo.submit') }}
          </el-button>
        </div>
      </div>
    </el-form>

    <el-alert
      v-if="submitted"
      type="success"
      :title="t('formDemo.success')"
      :closable="false"
    />

    <div class="pt-4">
      <RouterLink class="link link--underline" to="/">
        {{ t('formDemo.back') }}
      </RouterLink>
    </div>
  </main>
</template>
