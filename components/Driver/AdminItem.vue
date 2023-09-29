<template>
  <div class="bg-card rounded p-1 flex justify-between">
    <div class="flex gap-1 items-center">
      <img
        class="w-10 aspect-square object-cover rounded-full"
        :src="driver.image"
        :alt="fullName"
      />
      <div>{{ fullName }}</div>
    </div>
    <div class="flex items-center gap-2">
      <AppButtonLink :to="`/panel/kierowcy/edytuj/${driver.slug}`">
        Edytuj
      </AppButtonLink>
      <button @click="handleDelete">
        <SvgTrash class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IDriver } from "@/types/services/driver";

interface IProps {
  driver: IDriver;
}

const emits = defineEmits(["deleted"]);
const props = defineProps<IProps>();

const fullName = computed(
  () => props.driver.firstName + " " + props.driver.lastName
);

const handleDelete = async () => {
  const { error } = await useApi(`driver/${props.driver.id}`, {
    method: "DELETE",
  });

  if (!error.value) {
    emits("deleted");
  }
};
</script>
