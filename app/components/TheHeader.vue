<script lang="ts" setup>

</script>

<template>
  <UHeader :toggle="false">
    <template #title>
      <img src="/logo.svg" alt="Logo Star Status" class="h-12 w-auto max-w-[80vw]">
    </template>
    <template #right>
      <div>🚧 WIP 🚧</div>
      <UColorModeButton />
      <UButton
        color="neutral"
        variant="ghost"
        to="https://github.com/tcastanie/star-status"
        target="_blank"
        icon="i-mingcute-github-fill"
        aria-label="GitHub"
      />
    </template>
  </UHeader>
</template>
