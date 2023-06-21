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

const api = useApi();
const onSubmit = async () => {
  form.isLoading = true;
  form.error = "";
  form.validation = {
    text: "",
  };

  const { error } = await api.comments.add(props.articleId, form.data);
  form.isLoading = false;

  if (error) {
    if (error.errors) {
      form.validation = error.errors as any;
      return;
    }

    form.error = error.detail;
    return;
  }

  form.data = {
    text: "",
  };
  emits("comment-added");
};
</script>
