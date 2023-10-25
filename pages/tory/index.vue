<template>
  <AppErrorPaginationHandler
    :error="error"
    :is-loading="isLoading"
    :data="data"
  >
    <div v-if="data">
      <AppError v-if="!data.items.length"> Brak wyników wyszukiwania </AppError>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <TrackItem v-for="track in data.items" :key="track.id" :track="track" />

        <AppPagination :page="data.page" :total-pages="data.totalPages" />
      </div>
    </div>
  </AppErrorPaginationHandler>
</template>

<script lang="ts" setup>
import { IPaginatedResponse } from "@/types/commonApiResponses";
import { ITrack } from "@/types/services/track";

const { page } = usePage();

const { data, error, isLoading, refresh } = await useApi<
  IPaginatedResponse<ITrack>
>("track", {}, { page, pageSize: ref(20) });

usePagination(page, refresh);
</script>
