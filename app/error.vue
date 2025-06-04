<script setup lang="ts">
import type { NuxtError } from '#app'
import { en } from '@nuxt/ui-pro/locale'

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <UApp :locale="en">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#e6375a" />

    <TheHeader />
    <UError :error="error" />
    <TheFooter />
  </UApp>
</template>
