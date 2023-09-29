<template>
  <div>
    <AppButtonLink to="/panel/tory/dodaj" class="mb-2">
      Dodaj tor
    </AppButtonLink>

    <div v-if="data" class="grid gap-2">
      <TrackAdminItem
        v-for="track in data.items"
        :key="track.id"
        :track="track"
        @deleted="refresh"
      />

      <AppPagination :page="data.page" :total-pages="data.totalPages" />
    </div>
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
