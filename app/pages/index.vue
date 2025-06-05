<script lang="ts" setup>
definePageMeta({
  validate: async (route) => {
    return !route.query.project || projects.some(project => project.slug === route.query.project)
  },
})

useSeoMeta({ title: 'Star Status' })

const routeQuery = useRoute().query
const projectSlug = routeQuery.project ? String(routeQuery.project) : null

const items = ref([
  { label: 'Last 48 hours', value: 2 },
  { label: 'Last 7 days', value: 7 },
  { label: 'Last 30 days', value: 30 },
  { label: 'Last 3 months', value: 90 },
  { label: 'Last 6 months', value: 180 },
  { label: 'Last year', value: 365 },
])
const days = ref(30)

const query = computed(() => {
  return {
    days: days.value,
    ...(projectSlug && { project: projectSlug }),
  }
})
const { data: services, status } = await useFetch('/api/snapshots', {
  query,
})

const nbServicesDown = computed(() => {
  let downServices = 0
  for (const service of services.value || []) {
    if (service.last === false) {
      downServices++
    }
  }
  return downServices
})

const project = computed(() => {
  return projects.find(p => p.slug === projectSlug) || projects[0]
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
        <template v-if="nbServicesDown === 0">
          All systems <span class="text-success">operational</span>
        </template>
        <template v-else>
          {{ `${nbServicesDown} service${nbServicesDown > 1 ? 's' : ''} ` }}<span class="text-error">down</span>
        </template>
      </template>
      <template #links>
        <USelect
          v-model="days"
          :items="items"
          :loading="status === 'pending'"
          trailing
          class="w-48"
        />
      </template>
    </UPageHeader>

    <UPageBody>
      <UPageList class="space-y-8">
        <USkeleton v-if="status === 'pending'" class="h-27 rounded-lg" />
        <template v-else>
          <ServiceMonitor
            v-for="{ name, last, snapshots } of services"
            :key="name"
            :title="String(name)"
            :last="!!last"
            :snapshots
          />
          <template v-if="!Object.keys(services || {}).length">
            <UAlert
              variant="soft"
              color="neutral"
              title="No data found"
              icon="i-mingcute-server-fill"
            />
          </template>
        </template>
      </UPageList>
    </UPageBody>
  </UPage>
</template>
