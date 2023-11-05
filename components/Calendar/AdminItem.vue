<template>
  <div class="flex items-center gap-2 bg-card rounded overflow-hidden">
    <div
      class="flex justify-center items-center w-12 h-full bg-primary text-white"
    >
      <span class="text-xl font-semibold">
        {{ index }}
      </span>
    </div>
    <div class="grid w-full p-2 pl-0">
      <div class="w-full flex justify-between items-center gap-1">
        <div class="grid">
          <div class="text-primary font-semibold text-lg">
            {{ raceWeek.name }}
          </div>
          <div class="flex items-center gap-2 text-xs -mt-1">
            <span>{{ raceWeek.track.countryCode }}</span>
            <div>{{ raceWeek.track.name }}</div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div class="text-sm">{{ useRaceWeekDate(raceWeek) }}</div>
          <AppButtonLink
            :to="`/panel/kalendarze/edytuj/${raceWeek.season.year}/${raceWeek.slug}`"
          >
            Edytuj
          </AppButtonLink>
          <button @click="handleDelete">
            <SvgTrash class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IRaceWeek } from "@/types/services/raceWeek";

interface IProps {
  index: number;
  raceWeek: IRaceWeek;
}

const emits = defineEmits(["raceWeekDeleted"]);
const props = defineProps<IProps>();

const handleDelete = async () => {
  const { error } = await useApi(`raceweek/${props.raceWeek.id}`, {
    method: "DELETE",
  });

  if (!error.value) {
    emits("raceWeekDeleted");
  }
};
</script>
