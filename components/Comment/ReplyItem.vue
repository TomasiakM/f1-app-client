<template>
  <div>
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <img
          class="w-10 h-10 rounded-full object-cover"
          :src="`https://i.ibb.co/vqRYnk7/2c51ead87ebe.png`"
          :alt="reply.createdBy.username"
        />
        <div>
          <div>{{ reply.createdBy.username }}</div>
          <AppDisplayDate :date="reply.createdAt" />
        </div>
      </div>
      <CommentAdminAction
        :user-id="reply.createdBy.id"
        :comment-id="commentId"
        :reply-id="reply.id"
      />
    </div>
    <div>
      {{ reply.text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IReply } from "@/types/services/comment";

interface IProps {
  commentId: string;
  reply: IReply;
}

defineProps<IProps>();
</script>
