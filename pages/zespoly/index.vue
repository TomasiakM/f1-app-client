<template>
  <div v-if="data" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
    <TeamItem v-for="team in data.items" :key="team.id" :team="team" />

    <AppPagination :page="data.page" :total-pages="data.totalPages" />
  </div>
</template>

<script lang="ts" setup>
import { IPaginatedResponse } from "@/types/commonApiResponses";
import { ITeam } from "@/types/services/team";

const { page } = usePage();

const { data, refresh } = await useApi<IPaginatedResponse<ITeam>>(
  "team",
  {},
  { page, pageSize: ref(20) }
);

usePagination(page, refresh);
</script>
