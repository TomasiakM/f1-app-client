<template>
  <div class="h-screen">
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="fixed left-0 top-0 h-full w-full z-50 bg-background flex justify-center items-center"
      >
        <AppSpinner />
      </div>
    </Transition>

    <NuxtLayout :class="{ 'overflow-hidden max-h-screen': isLoading }">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();
const isLoading = ref(true);

const pageLoadingTime = ref(new Date());

nuxtApp.hook("page:start", () => {
  isLoading.value = true;
  pageLoadingTime.value = new Date();
});

nuxtApp.hook("page:finish", () => {
  const now = new Date();
  const duration = now.getTime() - pageLoadingTime.value.getTime();

  setTimeout(() => (isLoading.value = false), 300 - duration);
});
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0s;
}
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
