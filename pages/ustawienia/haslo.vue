<template>
  <div class="w-full max-w-[400px] mx-auto">
    <form class="grid grid-cols-1 gap-2" @submit.prevent="handleSubmit">
      <h3 class="text-xl font-semibold text-primary">Zmiana hasła</h3>

      <AppAlert v-if="form.error" color="danger">{{ form.error }}</AppAlert>

      <AppInput
        id="password"
        name="password"
        label="Nowe hasło"
        :error="form.validation.password"
        v-model="form.data.password"
      />
      <AppInput
        id="newPassword"
        name="newPassword"
        label="Nowe hasło"
        :error="form.validation.newPassword"
        v-model="form.data.newPassword"
      />
      <AppInput
        id="confirmNewPassword"
        name="confirmNewPassword"
        label="Potwierdź nowe hasło"
        :error="form.validation.confirmPassword"
        v-model="form.data.confirmPassword"
      />

      <AppButton :is-loading="form.isLoading">Zmień hasło</AppButton>
    </form>
  </div>
</template>
<script lang="ts" setup>
const toast = useAppToast();

const form = reactive({
  isLoading: false,
  error: "",
  data: {
    password: "",
    newPassword: "",
    confirmPassword: "",
  },
  validation: {
    password: "",
    newPassword: "",
    confirmPassword: "",
  },
});

const handleSubmit = async () => {
  form.error = "";
  form.validation = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  if (form.data.newPassword !== form.data.confirmPassword) {
    form.validation.confirmPassword = "Hasło nie jest takie samo";

    return;
  }

  form.isLoading = true;

  const { error } = await useApi("user/password", {
    method: "POST",
    body: form.data,
  });

  form.isLoading = false;

  if (error.value) {
    if (error.value.errors) {
      form.validation.password = error.value.errors.password;
      form.validation.newPassword = error.value.errors.newPassword;

      return;
    }

    form.error = error.value.message;
    return;
  }

  toast.success("Pomyślnie zmieniono hasło");
};
</script>
