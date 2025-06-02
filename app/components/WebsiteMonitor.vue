<script lang="ts" setup>
const { title, snapshots = [] } = defineProps<{
  title: string
  snapshots?: any[]
}>()
const id = useId()

const status = computed(() => {
  if (!snapshots[0]) {
    return 'neutral'
  }
  return snapshots[0].success ? 'success' : 'error'
})
const statusIcon = computed(() => status.value === 'success' ? 'i-mingcute-check-2-fill' : 'i-mingcute-wifi-off-fill')
</script>

<template>
  <UAlert
    :title
    :icon="statusIcon"
    :color="status"
    variant="subtle"
    :ui="{ root: 'p-8 gap-6', icon: 'size-6', title: '' }"
  >
    <template #title>
      <div class="flex items-center justify-between">
        <div class="font-hubot text-lg text-pretty font-semibold text-highlighted">
          {{ title }}
        </div>
        <span class="text-base text-toned">99% uptime</span>
      </div>
    </template>

    <template #description>
      <div class="mt-4 flex gap-x-1">
        <div
          v-for="i in 90"
          :key="`${id}-${i}`"
          title="TODO: down duration"
          class="w-full h-12 rounded-xs hover:backdrop-opacity-50"
          :class="{
            'bg-success': i >= 18 && i !== 42 && i !== 48,
            'bg-error': i === 42 || i === 48,
            'bg-accented': i < 18,
          }"
        />
      </div>
    </template>
  </UAlert>
</template>
