<template>
  <form @submit.prevent="onSubmit" class="grid gap-2">
    <div class="text-2xl font-semibold">Dodaj wydarzenie</div>

    <AppAlert v-if="form.error" color="danger">{{ form.error }}</AppAlert>

    <AppInput
      id="name"
      name="name"
      label="Nazwa"
      :error="form.validation.name"
      v-model="form.data.name"
    />

    <TrackSelect
      id="trackId"
      label="Tor"
      :error="form.validation.trackId"
      v-model="form.data.trackId"
    />

    <AppDatePicker
      id="fp1"
      label="FP1*"
      :error="form.validation.fp1"
      v-model="form.data.fp1"
    />

    <AppDatePicker
      id="fp2"
      label="FP2*"
      :error="form.validation.fp2"
      v-model="form.data.fp2"
    />

    <AppDatePicker
      id="fp3"
      label="FP3*"
      :error="form.validation.fp3"
      v-model="form.data.fp3"
    />

    <AppDatePicker
      id="sprintQualification"
      label="Kwalifikacje do sprintu*"
      :error="form.validation.sprintQualification"
      v-model="form.data.sprintQualification"
    />

    <AppDatePicker
      id="sprint"
      label="Sprint*"
      :error="form.validation.sprint"
      v-model="form.data.sprint"
    />

    <AppDatePicker
      id="raceQualification"
      label="Kwalifikacje do wyścigu*"
      :error="form.validation.raceQualification"
      v-model="form.data.raceQualification"
    />

    <AppDatePicker
      id="race"
      label="Wyścig*"
      :error="form.validation.race"
      v-model="form.data.race"
    />

    <AppButton :is-loading="form.isLoading">Dodaj</AppButton>
  </form>
</template>

<script lang="ts" setup>
import { ISeason } from "@/types/services/season";

const route = useRoute();
const router = useRouter();
const year = Number(route.params.year);

const { data } = await useApi<ISeason[]>("season");
const season = data.value?.find((e) => e.year === year);

if (!season) {
  router.push("/panel/kalendarze");
}

const form = reactive({
  isLoading: false,
  error: "",
  data: {
    name: "",
    seasonId: season?.id,
    trackId: "",
    fp1: null as Date | null,
    fp2: null as Date | null,
    fp3: null as Date | null,
    sprintQualification: null as Date | null,
    sprint: null as Date | null,
    raceQualification: null as Date | null,
    race: null as Date | null,
  },
  validation: {
    name: "",
    seasonId: "",
    trackId: "",
    fp1: "",
    fp2: "",
    fp3: "",
    sprintQualification: "",
    sprint: "",
    raceQualification: "",
    race: "",
  },
});

const onSubmit = async () => {
  form.isLoading = true;
  form.error = "";
  form.validation = {
    name: "",
    seasonId: "",
    trackId: "",
    fp1: "",
    fp2: "",
    fp3: "",
    sprintQualification: "",
    sprint: "",
    raceQualification: "",
    race: "",
  };

  const { error } = await useApi("raceweek", {
    body: form.data,
    method: "POST",
  });
  form.isLoading = false;

  if (error.value) {
    if (error.value.errors) {
      form.validation = error.value.errors as any;
      return;
    }

    form.error = error.value.message;
    return;
  }

  router.push("/panel/kalendarze");
};
</script>
