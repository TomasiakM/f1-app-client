<template>
  <form @submit.prevent="onSubmit">
    <h3 class="text-2xl font-semibold mb-2">Rejestracja</h3>

    <AppAlert v-if="form.error" color="danger">
      {{ form.error }}
    </AppAlert>

    <AppInput
      id="username"
      name="username"
      label="Nazwa użytkownika"
      type="text"
      v-model="form.data.username"
      :error="form.validation.username"
    />
    <AppInput
      id="email"
      name="email"
      label="Email"
      type="text"
      v-model="form.data.email"
      :error="form.validation.email"
    />
    <AppInput
      id="password"
      name="password"
      label="Hasło"
      type="password"
      v-model="form.data.password"
      :error="form.validation.password"
    />
    <AppInput
      id="confirm-password"
      name="confirm-password"
      label="Powtórz hasło"
      type="password"
      v-model="form.data.confirmPassword"
      :error="form.validation.confirmPassword"
    />

    <AppButton type="submit" :is-loading="form.isLoading">
      Zarejestruj się
    </AppButton>
  </form>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "login-register",
});

const router = useRouter();

const form = reactive({
  isLoading: false,
  error: "",
  data: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  validation: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
});

const onSubmit = async () => {
  form.isLoading = true;
  form.error = "";
  form.validation = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { error } = await useApi("user/register", {
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

  router.push("/logowanie?registered=true");
};
</script>
