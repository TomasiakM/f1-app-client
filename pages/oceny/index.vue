<template>
  <div class="grid gap-2 grid-cols-1" v-if="data">
    <RatingItem
      v-for="(driver, i) in data.drivers"
      :key="driver.id"
      :driver="driver"
      :error="form.errors[i]"
      @change="handleChange"
    />

    <div>
      <AppButton @click="handleSubmit">Zapisz oceny</AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IRating } from "@/types/services/rating";

const toast = useAppToast();

const form = reactive({
  data: {} as { [key: string]: number },
  errors: [] as { [key: string]: string }[],
});

const { data } = await useApi<IRating>("rating");

if (data.value) {
  data.value.drivers.forEach((e) => {
    form.data[e.id] = 0;
  });
}

const handleChange = (id: string, rate: number) => {
  form.data[id] = rate;
};

const handleSubmit = async () => {
  if (!data.value) return;

  form.errors = [];

  const ratings = Object.keys(form.data).map((e) => {
    return { driverId: e, rating: form.data[e] };
  }, []);

  const res = await useApi(`rating/${data.value.id}/rate`, {
    method: "POST",
    body: { ratings },
  });

  if (res.error.value) {
    if (res.error.value.errors) {
      const { errors } = useListValidationErrors(res.error.value.errors);
      form.errors = errors;

      return;
    }

    if (res.error.value.status === 400) {
      toast.error(res.error.value.message);
      return;
    }

    toast.error();
    return;
  }

  toast.success("Pomyślnie oddano oceny");
};
</script>
