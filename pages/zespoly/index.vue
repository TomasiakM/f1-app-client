<template>
  <AppErrorPaginationHandler
    :error="error"
    :is-loading="isLoading"
    :data="data"
  >
    <div v-if="data">
      <AppError v-if="!data.items.length"> Brak wyników wyszukiwania </AppError>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <TeamItem v-for="team in data.items" :key="team.id" :team="team" />

        <AppPagination :page="data.page" :total-pages="data.totalPages" />
      </div>
    </div>
  </AppErrorPaginationHandler>
</template>

<script lang="ts" setup>
import { IPaginatedResponse } from "@/types/commonApiResponses";
import { ITeam } from "@/types/services/team";

const { page } = usePage();

const { data, error, isLoading, refresh } = await useApi<
  IPaginatedResponse<ITeam>
>("team", {}, { page, pageSize: ref(20) });

usePagination(page, refresh);
</script>
