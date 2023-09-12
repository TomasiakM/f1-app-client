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

const route = useRoute();

const page = ref(Number.parseInt((route.query.page || "1") as string));

const { data, refresh } = await useApi<IPaginatedResponse<ITag>>(
  "tag/admin",
  {},
  { page, pageSize: ref(20) }
);

watch(
  () => route.query.page,
  () => {
    page.value = Number.parseInt((route.query.page || "1") as string);
    refresh();
  }
);
</script>
