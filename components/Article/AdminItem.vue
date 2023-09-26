<template>
  <div class="flex justify-between items-center gap-2 bg-card rounded p-2">
    <div class="flex items-center gap-2 w-full">
      <img
        :src="article.image"
        :alt="article.title"
        class="w-20 aspect-video object-cover"
      />
      <div class="flex items-center gap-1 w-full">
        {{ article.title }}
        <SvgEye v-if="isPublished()" class="w-5 h-5" />
      </div>
    </div>

    <div class="flex items-center gap-2">
      <AppButtonLink :to="`/panel/artykuly/edytuj/${article.slug}`">
        Edytuj
      </AppButtonLink>
      <button @click="handleDelete">
        <SvgTrash class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IArticleItem } from "~/types/services/article";

interface IProps {
  article: IArticleItem;
}

const emits = defineEmits(["deleted"]);
const props = defineProps<IProps>();

const isPublished = () => {
  const now = new Date();
  const publishedAt = new Date(props.article.publishedAt);

  return now > publishedAt;
};

const handleDelete = async () => {
  const { error } = await useApi(`article/${props.article.id}`, {
    method: "DELETE",
  });

  if (!error.value) {
    emits("deleted");
  }
};
</script>
