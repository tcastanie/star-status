<script setup lang="ts">
import { fr } from '@nuxt/ui-pro/locale'
</script>

<template>
  <UApp :locale="fr">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#e6375a" />

    <UHeader :toggle="false">
      <template #title>
        <img src="/logo.svg" alt="Logo Star Status" class="h-20 w-auto max-w-[85vw]">
      </template>
    </UHeader>

    <UContainer>
      <UMain>
        <NuxtPage />
      </UMain>
    </UContainer>

    <UFooter>🌠</UFooter>
  </UApp>
</template>
