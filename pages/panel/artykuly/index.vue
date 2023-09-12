<template>
  <div>
    <AppButtonLink to="/panel/artykuly/dodaj" class="mb-2">
      Dodaj artykuł
    </AppButtonLink>

    <div v-if="data" class="grid gap-2">
      <ArticleAdminItem
        v-for="article in data.items"
        :key="article.id"
        :article="article"
        @deleted="refresh"
      />
      <AppPagination :page="data.page" :total-pages="data.totalPages" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IPaginatedResponse } from "@/types/commonApiResponses";
import { IArticleItem } from "@/types/services/article";

const route = useRoute();

const page = ref(Number.parseInt((route.query.page || "1") as string));

const { data, refresh } = await useApi<IPaginatedResponse<IArticleItem>>(
  "article/admin",
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
