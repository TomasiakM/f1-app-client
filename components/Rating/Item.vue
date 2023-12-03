<template>
  <div
    class="bg-card rounded p-2"
    :class="{ 'border border-danger bg-danger/10': error }"
  >
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <img
          :src="driver.image"
          :alt="driverFullName"
          class="w-16 h-16 rounded-full object-cover"
        />
        <div class="text-lg font-semibold">{{ driverFullName }}</div>
      </div>

      <AppNumberPicker v-model="rate" @change="handleChange" />
    </div>
    <div v-if="error" class="text-right text-sm text-danger font-semibold">
      {{ error.rating }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IDriver } from "@/types/services/driver";

interface IEmits {
  (e: "change", id: string, rate: number): void;
}

interface IProps {
  driver: IDriver;
  error?: { [key: string]: any };
}
const emits = defineEmits<IEmits>();
const props = defineProps<IProps>();

const rate = ref(0);

const driverFullName = computed(
  () => `${props.driver.firstName} ${props.driver.lastName}`
);

const handleChange = (rate: number) => {
  emits("change", props.driver.id, rate);
};
</script>
