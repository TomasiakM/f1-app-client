<template>
  <div>
    <AppButton v-if="rating.isReadyToCreate" @click="openRating">
      Otwórz ocenianie
    </AppButton>
    <AppButton v-else-if="rating.isReadyToSummerize" @click="summerizeRating">
      Podsumuj ocenianie
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  raceWeekId: string;
}

const toast = useAppToast();
const props = defineProps<IProps>();

const rating = reactive({
  isReadyToCreate: false,
  isSummerized: false,
  isReadyToSummerize: false,
  isCreated: false,
  ratingId: null as string | null,
});

const isReady = async () => {
  const { data } = await useApi<any>(`rating/${props.raceWeekId}/isReady`);

  if (data.value) {
    rating.isReadyToCreate = data.value.isReadyToCreate;
    rating.isSummerized = data.value.isSummerized;
    rating.isReadyToSummerize = data.value.isReadyToSummerize;
    rating.isCreated = data.value.isCreated;
    rating.ratingId = data.value.ratingId;
  }
};

await isReady();

const openRating = async () => {
  const { error } = await useApi(`rating/${props.raceWeekId}`, {
    method: "POST",
  });

  if (error.value) {
    if (error.value.status === 400) {
      toast.error(error.value.message);
      return;
    }

    if (error.value.status === 404) {
      toast.error("Nie można utworzyć oceniania dla tego wydarzenia");
      return;
    }

    toast.error();
    return;
  }
};

const summerizeRating = async () => {
  if (!rating.ratingId) return;

  const { error } = await useApi(`rating/${rating.ratingId}/summarize`, {
    method: "POST",
  });

  if (error.value) {
    if (error.value.status === 400) {
      toast.error(error.value.message);
      return;
    }

    if (error.value.status === 404) {
      toast.error("Nie odnaleziono ocen do podsumowania");
      return;
    }

    toast.error();
    return;
  }
};

watch(
  () => props.raceWeekId,
  async () => {
    await isReady();
  }
);
</script>
