<template>
  <div class="grid gap-2">
    <header class="text-xl font-semibold">Komentarze</header>

    <div class="my-2" v-if="userStore.isAuthorized">
      <CommentForm :article-id="articleId" @comment-added="refresh" />
    </div>

    <div v-if="data?.length" class="grid gap-2">
      <CommentItem
        v-for="comment in sortedComments"
        :key="comment.id"
        :comment="comment"
        @update-comments="refresh"
      />
    </div>
    <div v-else-if="data?.length === 0">
      <div class="bg-card rounded p-2 text-center">Brak komentarzy</div>
    </div>
    <AppAlert v-else color="danger" @click="refresh">
      Coś poszło nie tak
    </AppAlert>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore";
import { IComment } from "~/types/services/comment";

interface IProps {
  articleId: string;
}

const props = defineProps<IProps>();
const userStore = useUserStore();

const { data, refresh } = await useApi<IComment[]>(
  `comment/${props.articleId}`
);

const sortedComments = computed(() => {
  if (data.value) {
    const comments = data.value?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return comments;
  }

  return [];
});
</script>
