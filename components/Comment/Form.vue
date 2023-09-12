<template>
  <form @submit.prevent="onSubmit" class="grid gap-2">
    <AppAlert v-if="form.error" color="danger">{{ form.error }}</AppAlert>

    <AppTextarea
      id="comment"
      placeholder="Twój komentarz"
      :error="form.validation.text"
      v-model="form.data.text"
    />

    <AppButton type="submit" :is-loading="form.isLoading">Dodaj</AppButton>
  </form>
</template>

<script lang="ts" setup>
import { ICommentForm } from "@/types/services/comment";
interface IProps {
  articleId: string;
}

const props = defineProps<IProps>();
const emits = defineEmits(["comment-added"]);

const form = reactive({
  isLoading: false,
  error: "",
  data: {
    text: "",
  } as ICommentForm,
  validation: {
    text: "",
  },
});

const onSubmit = async () => {
  form.isLoading = true;
  form.error = "";
  form.validation = {
    text: "",
  };

  const { error } = await useApi(`comment/${props.articleId}`, {
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

  form.data = {
    text: "",
  };

  emits("comment-added");
};
</script>
