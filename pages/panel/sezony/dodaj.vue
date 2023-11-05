<template>
  <form @submit.prevent="onSubmit" class="grid gap-2">
    <div class="text-2xl font-semibold">Dodaj sezon</div>

    <AppAlert v-if="form.error" color="danger">{{ form.error }}</AppAlert>

    <AppInput
      id="season"
      name="season"
      label="Sezon"
      :error="form.validation.year"
      v-model="form.data.year"
    />

    <AppButton :is-loading="form.isLoading">Dodaj</AppButton>
  </form>
</template>

<script lang="ts" setup>
const form = reactive({
  isLoading: false,
  error: "",
  data: {
    year: "",
  },
  validation: {
    year: "",
  },
});

const router = useRouter();
const onSubmit = async () => {
  form.isLoading = true;
  form.error = "";
  form.validation = {
    year: "",
  };

  const { error } = await useApi("season", { body: form.data, method: "POST" });
  form.isLoading = false;

  if (error.value) {
    if (error.value.errors) {
      form.validation = error.value.errors as any;
      return;
    }

    form.error = error.value.message;
    return;
  }

  router.push("/panel/sezony");
};
</script>
