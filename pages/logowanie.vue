<template>
  <form @submit.prevent="onSubmit">
    <h3 class="text-2xl font-semibold mb-2">Logowanie</h3>

    <AppAlert v-if="isRegistrationSuccess">
      Konto zostało pomyślnie załorzone. Możesz teraz się zalogować do swojego
      konta.
    </AppAlert>

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
      id="password"
      name="password"
      label="Hasło"
      type="password"
      v-model="form.data.password"
      :error="form.validation.password"
    />

    <AppButton type="submit" :is-loading="form.isLoading">
      Zaloguj się
    </AppButton>
  </form>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/stores/userStore";
definePageMeta({
  layout: "login-register",
});

const route = useRoute();
const router = useRouter();

const isRegistrationSuccess = ref(false);
const form = reactive({
  isLoading: false,
  error: "",
  data: {
    username: "Admin",
    password: "Password",
  },
  validation: {
    username: "",
    password: "",
  },
});

const api = useApi();
const onSubmit = async () => {
  form.isLoading = true;
  form.error = "";

  form.validation = {
    username: "",
    password: "",
  };

  const { data, error } = await api.auth.login(form.data);

  form.isLoading = false;

  if (data) {
    const store = useUserStore();

    store.setUser(data);
    router.push("/");
    return;
  }

  if (error?.status === 401) {
    form.error = "Błędne dane logowania";
    return;
  }

  if (error?.errors) {
    form.validation = error.errors as any;
  }

  form.error = error?.detail || "";
};

onBeforeMount(() => {
  if (route.query.registered) {
    isRegistrationSuccess.value = true;
    router.replace({ query: { registered: undefined } });
  }
});
</script>
