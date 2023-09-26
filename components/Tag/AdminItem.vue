<template>
  <div class="bg-card p-2 rounded">
    <div class="flex justify-between items-center">
      <div>{{ tag.name }}</div>

      <button @click="handleDelete">
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

const emits = defineEmits(["deleted"]);
const props = defineProps<IProps>();

const handleDelete = async () => {
  const { error } = await useApi(`tag/${props.tag.id}`, { method: "DELETE" });

  if (!error.value) {
    emits("deleted");
  }
};
</script>
