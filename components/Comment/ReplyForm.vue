<template>
  <form @submit.prevent="onSubmit" class="grid gap-2">
    <AppAlert v-if="form.error" color="danger">{{ form.error }}</AppAlert>

    <AppTextarea
      :id="`reply-${commentId}`"
      placeholder="Twoja odpowiedź"
      :error="form.validation.text"
      v-model="form.data.text"
    />

    <AppButton type="submit" :is-loading="form.isLoading">Dodaj</AppButton>
  </form>
</template>

<script lang="ts" setup>
interface IProps {
  commentId: string;
}

const props = defineProps<IProps>();
const emits = defineEmits(["replied"]);

const form = reactive({
  isLoading: false,
  error: "",
  data: {
    text: "",
  },
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

  const { error } = await useApi(`comment/${props.commentId}/reply`, {
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

  emits("replied");
};
</script>
