<template>
  <div class="bg-card rounded p-2 flex justify-between">
    <div>
      {{ season.year }}
    </div>

    <button @click="handleDelete">
      <SvgTrash class="w-5 h-5" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ISeason } from "@/types/services/season";

interface IProps {
  season: ISeason;
}

const emits = defineEmits(["deleted"]);
const props = defineProps<IProps>();

const handleDelete = async () => {
  const { error } = await useApi(`season/${props.season.id}`, {
    method: "DELETE",
  });

  if (!error.value) {
    emits("deleted");
  }
};
</script>
