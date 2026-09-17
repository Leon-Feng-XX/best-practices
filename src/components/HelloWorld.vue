<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="mt-6 rounded border border-gray-200 p-4">
    <p class="text-lg">
      {{ msg }}
    </p>
  </div>
</template>
