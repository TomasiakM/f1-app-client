<template>
  <form @submit.prevent="onSubmit" class="grid gap-2">
    <div class="text-2xl font-semibold">Edytuj tor</div>

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
      id="length"
      name="length"
      label="Długość (m)"
      :error="form.validation.length"
      v-model="form.data.length"
    />

    <AppInput
      id="corners"
      name="corners"
      label="Ilość zakrętów"
      :error="form.validation.corners"
      v-model="form.data.corners"
    />

    <CountrySelect
      id="countryCode"
      :error="form.validation.countryCode"
      v-model="form.data.countryCode"
    />

    <AppInput
      id="city"
      name="city"
      label="Miasto"
      :error="form.validation.city"
      v-model="form.data.city"
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
import { ITrack } from "@/types/services/track";

const router = useRouter();
const route = useRoute();

const form = reactive({
  trackId: "",
  isLoading: false,
  error: "",
  data: {
    name: "",
    image: "",
    countryCode: "",
    descriptionHtml: "",
    length: 0,
    corners: 0,
    city: "",
  },
  validation: {
    name: "",
    image: "",
    countryCode: "",
    descriptionHtml: "",
    length: "",
    corners: "",
    city: "",
  },
});

const { data } = await useApi<ITrack>(`track/${route.params.slug}`);

if (data.value) {
  form.trackId = data.value.id;
  form.data = {
    name: data.value.name,
    image: data.value.image,
    countryCode: data.value.countryCode,
    descriptionHtml: data.value.descriptionHtml,
    length: data.value.length,
    corners: data.value.corners,
    city: data.value.city,
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
    length: "",
    corners: "",
    city: "",
  };

  const { error } = await useApi(`track/${form.trackId}`, {
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

  router.push("/panel/tory");
};
</script>
