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
import { IAuthResponse } from "~/types/services/auth";

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

const onSubmit = async () => {
  form.isLoading = true;
  form.error = "";

  form.validation = {
    username: "",
    password: "",
  };

  const { data, error } = await useApi<IAuthResponse>("auth/login", {
    method: "POST",
    body: form.data,
    credentials: "include",
  });

  form.isLoading = false;

  if (data.value) {
    const store = useUserStore();

    store.setUser(data.value);
    router.push("/");
    return;
  }

  if (error.value?.status === 401) {
    form.error = "Błędne dane logowania";
    return;
  }

  if (error.value?.status === 403) {
    form.error = "Twoje konto zostało zablokowane";
    return;
  }

  if (error.value?.errors) {
    form.validation = error.value.errors as any;
  }

  form.error = error.value?.message || "";
};

onBeforeMount(() => {
  if (route.query.registered) {
    isRegistrationSuccess.value = true;
    router.replace({ query: { registered: undefined } });
  }
});
</script>
