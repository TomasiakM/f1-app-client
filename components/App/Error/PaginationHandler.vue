<template>
  <div>
    <AppError v-if="error">
      {{ error?.message }}
    </AppError>
    <div v-else-if="!data?.items.length" class="grid grid-cols-1 gap-2">
      <AppError> Brak treści do wyświetlenia </AppError>
      <slot />
    </div>
    <div v-else-if="data && isLoading">
      <div class="relative">
        <slot />
        <div class="absolute top-0 left-0 w-full h-full bg-black/40"></div>
      </div>
    </div>

    <AppSpinner v-else-if="!data && isLoading" />

    <slot v-else />
  </div>
</template>

<script lang="ts" setup>
import { IPaginatedResponse } from "@/types/commonApiResponses";

interface IProps {
  error: any;
  isLoading: boolean;
  data: IPaginatedResponse<any> | null;
}

defineProps<IProps>();
</script>
