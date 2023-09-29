<template>
  <div>
    <AppButtonLink to="/panel/zespoly/dodaj" class="mb-2">
      Dodaj zespół
    </AppButtonLink>

    <div v-if="data" class="grid gap-2">
      <TeamAdminItem
        v-for="team in data.items"
        :key="team.id"
        :team="team"
        @deleted="refresh"
      />

      <AppPagination :page="data.page" :total-pages="data.totalPages" />
    </div>
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
