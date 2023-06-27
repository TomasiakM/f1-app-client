<template>
  <form @submit.prevent="onSubmit" class="grid gap-2">
    <div class="text-2xl font-semibold">Dodaj tag</div>

    <AppAlert v-if="form.error" color="danger">{{ form.error }}</AppAlert>

    <AppInput
      id="name"
      name="name"
      label="Nazwa"
      :error="form.validation.name"
      v-model="form.data.name"
    />

    <AppButton :is-loading="form.isLoading">Dodaj</AppButton>
  </form>
</template>

<script lang="ts" setup>
const form = reactive({
  isLoading: false,
  error: "",
  data: {
    name: "",
  },
  validation: {
    name: "",
  },
});

const api = useApi();
const router = useRouter();
const onSubmit = async () => {
  form.isLoading = true;
  form.error = "";
  form.validation = {
    name: "",
  };

  const { error } = await api.tags.add(form.data);
  form.isLoading = false;

  if (error) {
    if (error.errors) {
      form.validation = error.errors as any;
      return;
    }

    form.error = error.detail;
    return;
  }

  router.push("/panel/tagi");
};
</script>
