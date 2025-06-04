<script lang="ts" setup>

</script>

<template>
  <UFooter :ui="{ left: 'text-sm' }">
    <template #left>
      Made by <UIcon name="i-mingcute-ufo-2-fill" class="text-primary size-5 hover:animate-spin" /> and <ULink to="https://tcastanie.dev/" target="_blank">
        tcastanie.dev
      </ULink>
    </template>

    <template #right>
      <UButton
        icon="i-mingcute-github-fill"
        color="neutral"
        variant="ghost"
        to="https://github.com/tcastanie/star-status"
        target="_blank"
        aria-label="GitHub"
        :ui="{ leadingIcon: 'hover:animate-spin' }"
      />
    </template>
  </UFooter>
</template>
