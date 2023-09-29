<template>
  <div class="bg-card rounded p-1 flex justify-between">
    <div class="flex gap-1 items-center">
      <img
        class="w-10 aspect-square object-cover rounded-full"
        :src="team.image"
        :alt="team.name"
      />
      <div>{{ team.name }}</div>
    </div>
    <div class="flex items-center gap-2">
      <AppButtonLink :to="`/panel/zespoly/edytuj/${team.slug}`">
        Edytuj
      </AppButtonLink>
      <button @click="handleDelete">
        <SvgTrash class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ITeam } from "@/types/services/team";

interface IProps {
  team: ITeam;
}

const emits = defineEmits(["deleted"]);
const props = defineProps<IProps>();

const handleDelete = async () => {
  const { error } = await useApi(`team/${props.team.id}`, {
    method: "DELETE",
  });

  if (!error.value) {
    emits("deleted");
  }
};
</script>
