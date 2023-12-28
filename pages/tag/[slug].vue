<template>
  <AppErrorPaginationHandler
    :error="error || tagsError"
    :is-loading="isLoading"
    :data="data"
  >
    <div v-if="tag" class="font-semibold text-2xl mb-2">
      Tag <span class="text-primary"> #{{ tag.name }}</span>
    </div>
    <div v-if="data" class="grid grid-cols-1 gap-2">
      <ArticleItem
        v-for="(article, index) in data.items"
        :key="article.id"
        :article="article"
      />

      <AppPagination :page="data.page" :totalPages="data.totalPages" />
    </div>
  </AppErrorPaginationHandler>
</template>

<script lang="ts" setup>
import { IPaginatedResponse } from "@/types/commonApiResponses";
import { IArticleItem } from "@/types/services/article";
import { ITag } from "@/types/services/tag";

const { page } = usePage();
const route = useRoute();

const { data: tags, error: tagsError } = await useApi<ITag[]>("tag");
const tag = computed(() =>
  tags.value?.find((e) => e.slug === route.params.slug)
);

const { data, error, isLoading, refresh } = await useApi<
  IPaginatedResponse<IArticleItem>
>(`article/tag/${route.params.slug}`, {}, { page });

usePagination(page, refresh);
</script>
