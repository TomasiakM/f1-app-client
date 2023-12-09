<template>
  <form @submit.prevent="onSubmit" class="grid gap-2">
    <div class="text-2xl font-semibold">Edytuj artykuł</div>

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

    <AppEditor
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

    <AppButton type="submit" :is-loading="form.isLoading">Zapisz</AppButton>
  </form>
</template>

<script lang="ts" setup>
import { IArticle } from "~/types/services/article";

const form = reactive({
  articleId: "",
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

const route = useRoute();

const { data } = await useApi<IArticle>(`article/${route.params.slug}`);

if (data.value) {
  form.articleId = data.value.id;
  form.data = {
    image: data.value.image,
    title: data.value.title,
    description: data.value.description,
    descriptionHtml: data.value.descriptionHtml,
    tagIds: data.value.tags.map((e) => e.id),
    publishedAt: new Date(data.value.publishedAt),
  };
}

const onSubmit = async () => {
  form.isLoading = true;
  const { data, error } = await useApi(`article/${form.articleId}`, {
    method: "PUT",
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
