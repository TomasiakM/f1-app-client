<template>
  <div class="card flex flex-col items-center mx-auto">
    <AppNumberPicker v-bind:model-value="rating" readonly />

    <div class="font-semibold text-lg">{{ driverName }}</div>
  </div>
</template>

<script lang="ts" setup>
import { IDriver } from "@/types/services/driver";

interface IProps {
  rating: number;
  driver: IDriver;
}

const props = defineProps<IProps>();

const driverName = computed(
  () => `${props.driver.firstName} ${props.driver.lastName}`
);
</script>
