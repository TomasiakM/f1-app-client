<template>
  <form @submit.prevent="onSubmit" class="grid gap-2">
    <div class="text-2xl font-semibold">Dodaj artykuł</div>

    <AppAlert v-if="form.error" color="danger">{{ form.error }}</AppAlert>

    <AppInput
      id="image"
      name="image"
      label="Zdjęcie"
      :error="form.validation.image"
      v-model="form.data.image"
    />
    <AppInput
      id="title"
      name="title"
      label="Tytuł"
      :error="form.validation.title"
      v-model="form.data.title"
    />

    <AppTextarea
      id="description"
      name="description"
      label="Krótki opis"
      :error="form.validation.description"
      v-model="form.data.description"
    />
    <AppTextarea
      id="description-html"
      name="description-html"
      label="Opis"
      :error="form.validation.descriptionHtml"
      v-model="form.data.descriptionHtml"
    />

    <AppDatePicker
      id="time"
      label="Data publikacji"
      :error="form.validation.publishedAt"
      v-model="form.data.publishedAt"
    />

    <TagSelectMultiple v-model="form.data.tagIds" />

    <AppButton type="submit" :is-loading="form.isLoading">Dodaj</AppButton>
  </form>
</template>

<script lang="ts" setup>
const form = reactive({
  isLoading: false,
  error: "",
  data: {
    image: "",
    title: "",
    description: "",
    descriptionHtml: "",
    tagIds: [] as string[],
    publishedAt: null as Date | null,
  },
  validation: {
    image: "",
    title: "",
    description: "",
    descriptionHtml: "",
    tagIds: "",
    publishedAt: "",
  },
});

const onSubmit = async () => {
  form.isLoading = true;
  const { data, error } = await useApi("article", {
    method: "POST",
    body: form.data,
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

  const router = useRouter();
  router.push("/panel/artykuly");
};
</script>
