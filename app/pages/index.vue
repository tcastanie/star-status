<script lang="ts" setup>
definePageMeta({
  validate: async (route) => {
    return !route.query.project || projects.some(project => project.slug === route.query.project)
  },
})

const query = useRoute().query
const projectSlug = query.project ? String(query.project) : 'tcastanie'

const items = ref([
  { label: 'Last 24 hours', value: 1 },
  { label: 'Last 7 days', value: 7 },
  { label: 'Last 30 days', value: 30 },
  { label: 'Last 3 months', value: 90 },
  { label: 'Last 6 months', value: 180 },
  { label: 'Last year', value: 365 },
])
const days = ref(30)

const { data: services, status } = await useFetch('/api/snapshots', {
  query: { days, project: projectSlug },
})

const project = computed(() => {
  return projects.find(project => project.slug === projectSlug) || projects[0]
})
</script>

<template>
  <UPage>
    <UPageHero orientation="vertical" reverse>
      <template #title>
        <span :class="`text-${project?.color}`">{{ project?.name }}</span> status
      </template>
    </UPageHero>

    <UPageHeader>
      <template #title>
        All systems <span class="text-success">operational</span>
      </template>
      <template #links>
        <USelect v-model="days" :items="items" class="w-36" />
      </template>
    </UPageHeader>

    <UPageBody>
      <UPageList class="space-y-8">
        <USkeleton v-if="status === 'pending'" class="h-27 rounded-lg" />
        <template v-else>
          <WebsiteMonitor
            v-for="(snapshots, label) in services"
            :key="label"
            :title="label"
            :snapshots
          />
        </template>
      </UPageList>
    </UPageBody>
  </UPage>
</template>
