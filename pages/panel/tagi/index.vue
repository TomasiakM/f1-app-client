<template>
  <div>
    <AppButtonLink to="/panel/tagi/dodaj" class="mb-2">Dodaj tag</AppButtonLink>

    <div v-if="data">
      <div class="grid gap-2">
        <TagAdminItem
          v-for="tag in data.items"
          :key="tag.id"
          :tag="tag"
          @deleted="refresh"
        />
        <AppPagination :page="data.page" :total-pages="data.totalPages" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IPaginatedResponse } from "@/types/commonApiResponses";
import { ITag } from "@/types/services/tag";

const { page } = usePage();
const { data, refresh } = await useApi<IPaginatedResponse<ITag>>(
  "tag/admin",
  {},
  { page, pageSize: ref(20) }
);

usePagination(page, refresh);
</script>
