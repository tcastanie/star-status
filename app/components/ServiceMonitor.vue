<script lang="ts" setup>
const { title, snapshots = [] } = defineProps<{
  title: string
  snapshots?: any[]
}>()
const monitorId = useId()

const invertedSnapshots = computed(() => {
  return snapshots.slice().reverse()
})

const statusColor = computed(() => {
  if (snapshots[0]?.status === 'up')
    return 'success'
  if (snapshots[0]?.status === 'down')
    return 'error'
  return 'neutral'
})
const statusIcon = computed(() => statusColor.value === 'success' ? 'i-mingcute-check-2-fill' : 'i-mingcute-wifi-off-fill')

const totalUptime = computed(() => {
  // calculate total uptime, not counting 'off' status
  let count = 0
  const total = snapshots.reduce((acc, snap) => {
    if (snap.uptime) {
      count++
      return acc + snap.uptime
    }
    return acc
  }, 0)
  return total ? +(total / count).toFixed(2) : 0
})

function generateTooltip(snapshot: any) {
  let tooltip = `${dateToString(new Date(snapshot.start))}   ↔   ${dateToString(new Date(snapshot.end))}`
  if (snapshot.uptime) {
    tooltip += `\n\nUptime: ${+(snapshot.uptime).toFixed(2)}%`
  }
  if (snapshot.errors && snapshot.errors.length > 0) {
    tooltip += `\n\nErrors:\n`
    snapshot.errors.forEach((error: any) => {
      tooltip += `- ${dateToString(new Date(error.date))}: ${error.message}\n`
    })
  }
  return tooltip
}
</script>

<template>
  <UAlert
    :title
    :icon="statusIcon"
    :color="statusColor"
    variant="subtle"
    :ui="{ root: 'p4 md:p-8 gap-2 md:gap-6', icon: 'size-6', title: '' }"
  >
    <template #title>
      <div class="flex items-center justify-between">
        <div class="font-hubot text-lg text-pretty font-semibold text-highlighted">
          {{ title }}
        </div>
        <span class="text-base text-toned">{{ totalUptime }}% uptime</span>
      </div>
    </template>

    <template #description>
      <div class="mt-1 md:mt-4 flex gap-x-0 sm:gap-x-0.5 md:gap-x-1">
        <UTooltip
          v-for="snap of invertedSnapshots"
          :key="`${monitorId}-${snap.start}`"
          arrow
          :content="{ side: 'top' }"
          :ui="{ content: 'h-full whitespace-pre' }"
        >
          <template #content>
            <p class="text-base font-mona font-medium" v-html="generateTooltip(snap)" />
          </template>
          <div
            class="w-full h-8 md:h-12 rounded-xs hover:opacity-50"
            :class="{
              'bg-accented': !snap.status || snap.status === 'off',
              'bg-success': snap.status === 'up',
              'bg-error': snap.status === 'down',
            }"
          />
        </UTooltip>
      </div>
    </template>
  </UAlert>
</template>
