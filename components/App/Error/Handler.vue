<template>
  <div class="grid grid-cols-1 gap-2 relative">
    <slot name="static" />

    <AppError v-if="error?.status === 404 && handle404">
      NIE ODNALEZIONO ZASOBU
    </AppError>

    <AppError v-else-if="error && error.status !== 404">
      {{ error?.message }}
    </AppError>

    <div v-else-if="data && isLoading">
      <slot />
      <div
        class="absolute top-0 left-0 w-full h-full min-h-20 bg-black/20 flex justify-center items-center"
      >
        <AppSpinner />
      </div>
    </div>

    <AppSpinner v-else-if="!data && isLoading" />

    <slot v-else />
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  error: any;
  isLoading: boolean;
  data: any;
  handle404?: boolean;
}

withDefaults(defineProps<IProps>(), {
  handle404: false,
});
</script>
