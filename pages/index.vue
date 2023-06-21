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

const route = useRoute();
const page = ref(Number.parseInt((route.query.page || "1") as string));

const { data, error, refresh } = await useAsyncData(() =>
  useApiRead<IPaginatedResponse<IArticleItem>>("api/article", {
    method: "GET",
    query: { page: page.value },
  })
);

watch(
  () => route.query.page,
  () => {
    page.value = Number.parseInt((route.query.page || "1") as string);
    refresh();
  }
);
</script>
