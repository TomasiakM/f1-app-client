<template>
  <div class="grid gap-2 bg-card rounded p-2">
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <img
          class="w-10 h-10 rounded-full object-cover"
          :src="`https://i.ibb.co/vqRYnk7/2c51ead87ebe.png`"
          :alt="comment.createdBy.username"
        />
        <div>
          <div>{{ comment.createdBy.username }}</div>
          <AppDisplayDate :date="comment.createdAt" />
        </div>
      </div>
      <CommentAdminAction
        :user-id="comment.createdBy.id"
        :comment-id="comment.id"
      />
    </div>
    <div>
      {{ comment.text }}
    </div>

    <div
      class="pl-2 md:pl-4 border-l-2 border-l-primary"
      v-if="comment.replies.length"
    >
      <div class="grid gap-2 mt-2">
        <CommentReplyItem
          v-for="reply in sortedReplies"
          :key="reply.id"
          :reply="reply"
          :comment-id="comment.id"
        />
      </div>
    </div>
    <CommentReplyForm
      @replied="
        showReplyForm = false;
        $emit('update-comments');
      "
      v-if="showReplyForm && userStore.isAuthorized"
      :comment-id="comment.id"
    />
    <button
      v-else-if="userStore.isAuthorized"
      type="button"
      @click="showReplyForm = true"
      class="text-sm font-semibold text-link"
    >
      Dodaj odpowiedź
    </button>
  </div>
</template>

<script lang="ts" setup>
import { IComment } from "@/types/services/comment";
import { useUserStore } from "@/stores/userStore";

interface IProps {
  comment: IComment;
}

const props = defineProps<IProps>();
defineEmits(["update-comments"]);

const userStore = useUserStore();

const showReplyForm = ref(false);

const sortedReplies = computed(() => {
  return props.comment.replies.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
});
</script>
