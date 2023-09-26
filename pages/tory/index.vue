<template>
  <div v-if="data" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
    <TrackItem v-for="track in data.items" :key="track.id" :track="track" />

    <AppPagination :page="data.page" :total-pages="data.totalPages" />
  </div>
</template>

<script lang="ts" setup>
import { IPaginatedResponse } from "@/types/commonApiResponses";
import { ITrack } from "@/types/services/track";

const { page } = usePage();

const { data, refresh } = await useApi<IPaginatedResponse<ITrack>>(
  "track",
  {},
  { page, pageSize: ref(20) }
);

usePagination(page, refresh);
</script>
