<template>
  <div>
    <AppButtonLink to="/panel/kierowcy/dodaj" class="mb-2">
      Dodaj kierowce
    </AppButtonLink>

    <div v-if="data" class="grid gap-2">
      <DriverAdminItem
        v-for="driver in data.items"
        :key="driver.id"
        :driver="driver"
        @deleted="refresh"
      />

      <AppPagination :page="data.page" :total-pages="data.totalPages" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IPaginatedResponse } from "@/types/commonApiResponses";
import { IDriver } from "@/types/services/driver";

const { page } = usePage();
const { data, refresh } = await useApi<IPaginatedResponse<IDriver>>(
  "driver",
  {},
  { page, pageSize: ref(20) }
);

usePagination(page, refresh);
</script>
