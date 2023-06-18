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
  </div>
</template>

<script lang="ts" setup>
const api = useApi();
const route = useRoute();

const { page = 1 } = route.query;

const { data, error } = await api.articles.getPaginated(
  Number.parseInt(page as string),
  10
);
</script>
