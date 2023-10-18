<template>
  <div class="max-w-full overflow-x-auto">
    <table class="table-auto w-full text-center rounded overflow-hidden">
      <thead class="text-xs uppercase bg-primary text-white">
        <slot name="header" />
      </thead>
      <tbody class="divide-y text-sm">
        <slot />
      </tbody>
    </table>
  </div>
</template>
