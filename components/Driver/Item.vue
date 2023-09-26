<template>
  <NuxtLink :to="`/kierowcy/${driver.slug}`" class="bg-card p-2 rouunded block">
    <img
      class="rounded-full w-[75%] aspect-square mx-auto object-cover"
      :src="driver.image"
      :alt="fullName"
    />
    <div class="text-center font-semibold mt-2">{{ fullName }}</div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { IDriver } from "@/types/services/driver";

interface IProps {
  driver: IDriver;
}

const props = defineProps<IProps>();

const fullName = props.driver.firstName + " " + props.driver.lastName;
</script>
