<template>
  <div v-if="data" class="grid gap-2 md:gap-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <img
        class="rounded-full w-[50%] aspect-square object-cover mx-auto"
        :src="data.image"
        :alt="fullName"
      />
      <div class="flex flex-col h-full justify-center">
        <div class="flex gap-2 text-xl font-semibold">
          <AppFlag :code="data.countryCode" />
          <div>{{ fullName }}</div>
        </div>

        <div>
          Wiek: {{ getAge(data.dateOfBirth) }} lat ({{
            useDate(data.dateOfBirth).date
          }})
        </div>
      </div>
    </div>

    <div class="bg-card rounded p-2 w-full">
      <div>
        {{ data.descriptionHtml }}
      </div>
    </div>

    <DriverStatisctics :driver-id="data.id" />
  </div>
</template>

<script lang="ts" setup>
import { IDriver } from "@/types/services/driver";

const route = useRoute();
const { data } = await useApi<IDriver>(`driver/${route.params.slug}`);

const fullName = data.value?.firstName + " " + data.value?.lastName;

const getAge = (date: string) => {
  const d = new Date(date);
  const now = new Date();

  return Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );
};
</script>
