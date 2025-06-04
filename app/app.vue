<script setup lang="ts">
import { en } from '@nuxt/ui-pro/locale'
</script>

<template>
  <UApp
    :locale="en"
    :tooltip="{ delayDuration: 300, disableClosingTrigger: true }"
  >
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#e6375a" />

    <TheHeader />

    <UContainer>
      <UMain>
        <NuxtPage />
      </UMain>
    </UContainer>

    <TheFooter />
  </UApp>
</template>
