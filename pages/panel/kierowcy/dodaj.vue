<template>
  <form @submit.prevent="onSubmit" class="grid gap-2">
    <div class="text-2xl font-semibold">Dodaj kierowcę</div>

    <AppAlert v-if="form.error" color="danger">{{ form.error }}</AppAlert>

    <AppInput
      id="firstName"
      name="firstName"
      label="Imię"
      :error="form.validation.firstName"
      v-model="form.data.firstName"
    />

    <AppInput
      id="lastName"
      name="lastName"
      label="Nazwisko"
      :error="form.validation.lastName"
      v-model="form.data.lastName"
    />

    <AppDatePicker
      id="dateOfBirth"
      name="dateOfBirth"
      label="Data urodzenia"
      :enable-time-picker="false"
      :clearable="false"
      :error="form.validation.dateOfBirth"
      v-model="form.data.dateOfBirth"
    />

    <AppInput
      id="image"
      name="image"
      label="Zdjęcie"
      :error="form.validation.image"
      v-model="form.data.image"
    />

    <AppInput
      id="countryCode"
      name="countryCode"
      label="Kod iso kraju"
      :error="form.validation.countryCode"
      v-model="form.data.countryCode"
    />

    <AppEditor
      id="description-html"
      name="description-html"
      label="Opis"
      :error="form.validation.descriptionHtml"
      v-model="form.data.descriptionHtml"
    />

    <AppButton :is-loading="form.isLoading">Dodaj</AppButton>
  </form>
</template>

<script lang="ts" setup>
const form = reactive({
  isLoading: false,
  error: "",
  data: {
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    image: "",
    countryCode: "",
    descriptionHtml: "",
  },
  validation: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    image: "",
    countryCode: "",
    descriptionHtml: "",
  },
});

const router = useRouter();
const onSubmit = async () => {
  form.isLoading = true;
  form.error = "";
  form.validation = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    image: "",
    countryCode: "",
    descriptionHtml: "",
  };

  const { error } = await useApi("driver", { body: form.data, method: "POST" });
  form.isLoading = false;

  if (error.value) {
    if (error.value.errors) {
      form.validation = error.value.errors as any;
      return;
    }

    form.error = error.value.message;
    return;
  }

  router.push("/panel/kierowcy");
};
</script>
