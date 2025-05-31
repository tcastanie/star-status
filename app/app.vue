<script setup lang="ts">
import { fr } from '@nuxt/ui-pro/locale'
</script>

<template>
  <UApp :locale="fr">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#e6375a" />

    <UHeader>
      <template #title>
        <img src="/logo.svg" alt="Logo Star Status" class="h-12 w-auto">
      </template>
    </UHeader>

    <UContainer>
      <UMain>
        <NuxtPage />
      </UMain>
    </UContainer>

    <UFooter>Footer</UFooter>
  </UApp>
</template>
