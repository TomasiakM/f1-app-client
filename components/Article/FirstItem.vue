<template>
  <div class="bg-card rounded overflow-hidden">
    <div class="aspect-video">
      <NuxtLink :to="`/artykul/${article.slug}`">
        <img
          class="w-full h-full object-cover"
          src="https://i.ibb.co/ySx1tsN/1837f79ca22b.jpg"
          :alt="article.title"
        />
      </NuxtLink>
    </div>

    <div class="p-2 pt-1">
      <NuxtLink :to="`/artykul/${article.slug}`">
        <h3 class="text-2xl font-semibold">{{ article.title }}</h3>
      </NuxtLink>
      <AppDisplayDate :date="article.publishedAt" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IArticleItem } from "@/types/services/article";

interface IProps {
  article: IArticleItem;
}

defineProps<IProps>();
</script>
