<template>
  <div v-if="data" class="grid gap-2">
    <div v-for="(article, index) in data.items">
      <ArticleFirstItem
        v-if="index === 0 && data.page === 1"
        :article="article"
        class="mb-2"
      />
      <ArticleItem v-else :article="article" />
    </div>
    <AppPagination :page="data.page" :totalPages="data.totalPages" />
  </div>
</template>

<script lang="ts" setup>
import { IPaginatedResponse } from "~/types/commonApiResponses";
import { IArticleItem } from "~/types/services/article";

const { page } = usePage();
const { data, error, refresh } = await useApi<IPaginatedResponse<IArticleItem>>(
  "article",
  {},
  { page }
);

usePagination(page, refresh);
</script>
