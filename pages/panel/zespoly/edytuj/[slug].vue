<template>
  <form @submit.prevent="onSubmit" class="grid gap-2">
    <div class="text-2xl font-semibold">Dodaj zespół</div>

    <AppAlert v-if="form.error" color="danger">{{ form.error }}</AppAlert>

    <AppInput
      id="name"
      name="name"
      label="Nazwa"
      :error="form.validation.name"
      v-model="form.data.name"
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

    <AppButton :is-loading="form.isLoading">Zapisz</AppButton>
  </form>
</template>

<script lang="ts" setup>
import { ITeam } from "@/types/services/team";

const router = useRouter();
const route = useRoute();

const form = reactive({
  teamId: "",
  isLoading: false,
  error: "",
  data: {
    name: "",
    image: "",
    countryCode: "",
    descriptionHtml: "",
  },
  validation: {
    name: "",
    image: "",
    countryCode: "",
    descriptionHtml: "",
  },
});

const { data } = await useApi<ITeam>(`team/${route.params.slug}`);

if (data.value) {
  form.teamId = data.value.id;
  form.data = {
    name: data.value.name,
    image: data.value.image,
    countryCode: data.value.countryCode,
    descriptionHtml: data.value.descriptionHtml,
  };
}

const onSubmit = async () => {
  form.isLoading = true;
  form.error = "";
  form.validation = {
    name: "",
    image: "",
    countryCode: "",
    descriptionHtml: "",
  };

  const { error } = await useApi(`team/${form.teamId}`, {
    body: form.data,
    method: "PUT",
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

  router.push("/panel/zespoly");
};
</script>
