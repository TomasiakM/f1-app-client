<template>
  <div
    class="flex flex-col items-center justify-center bg-card py-2 rounded font-semibold"
  >
    <div class="text-3xl">
      <slot name="default" />
    </div>
    <div class="text-xs">
      <slot name="name" />
    </div>
  </div>
</template>
