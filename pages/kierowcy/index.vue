<template>
  <div v-if="data" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
    <DriverItem
      v-for="driver in data.items"
      :key="driver.id"
      :driver="driver"
    />

    <AppPagination :page="data.page" :total-pages="data.totalPages" />
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
