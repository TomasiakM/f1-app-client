<template>
  <div v-if="data">
    <div class="aspect-video">
      <img
        class="w-full h-full object-cover rounded"
        src="https://i.ibb.co/ySx1tsN/1837f79ca22b.jpg"
        :alt="data.title"
      />

      <div class="flex flex-wrap gap-1">
        <div v-for="tag in data.tags" :key="tag.id">
          <NuxtLink
            :to="`/`"
            class="bg-primary hover:bg-primary-hover transition-colors duration-200 rounded px-1 py-0.5 text-white text-sm"
          >
            {{ tag.name }}
          </NuxtLink>
        </div>
      </div>

      <h2 class="text-2xl font-semibold">{{ data.title }}</h2>
      <span class="text-xs text-secondary line-clamp-1">
        {{ useDate(data.publishedAt) }}
      </span>
    </div>

    <div v-html="data.descriptionHtml" class="mt-4" />

    <div class="flex items-center gap-2 justify-end">
      Polubienia:
      <button
        v-if="userStore.isAuthorized"
        @click="like(data.id)"
        :disabled="isLiked"
        class="w-6 h-6 flex justify-center items-center rounded-full border border-secondary hover:bg-success hover:text-white duration-200 transition-colors"
        :class="{
          'bg-success border-success text-white': isLiked,
        }"
      >
        <SvgPlus class="!w-5 !h-5" />
      </button>
      <div class="text-xl font-semibold">
        {{ data.likes.length }}
      </div>
    </div>
    <CommentList :article-id="data.id" />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore";

const api = useApi();
const route = useRoute();
const userStore = useUserStore();

const { slug } = route.params;
const { data, error } = await api.articles.getBySlug(slug as string);

const isLiked = computed(() => {
  const userId = userStore.getUser?.id;

  if (!userId) {
    return false;
  }

  return data.value?.likes.includes(userId) || false;
});

const like = async (id: string) => {
  const { error } = await api.articles.like(id);

  if (error) {
    if (error?.status == 401) {
    }

    return;
  }

  const userId = userStore.getUser?.id;
  if (userId) {
    data.value?.likes.push(userId);
  }
};
</script>
