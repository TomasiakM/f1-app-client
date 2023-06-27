<template>
  <div class="bg-card p-2 rounded">
    <div class="flex justify-between items-center">
      <div>{{ tag.name }}</div>

      <button>
        <SvgTrash class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ITag } from "~/types/services/tag";

interface IProps {
  tag: ITag;
}

defineProps<IProps>();
</script>
