<template>
  <div class="grid grid-cols-5 gap-2">
    <NuxtLink to="/panel/artykuly" class="link">
      <div>
        <SvgArticle class="link-svg" />
        <span class="link-text">Artykuły</span>
      </div>
    </NuxtLink>

    <NuxtLink to="/panel/tagi" class="link">
      <div>
        <SvgTag class="link-svg" />
        <span class="link-text">Tagi</span>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="postcss" scoped>
.link {
  @apply flex justify-center items-center w-full aspect-square bg-card hover:bg-primary-hover hover:text-white rounded duration-200 transition-colors;
}

.link-svg {
  @apply w-8 h-8 mx-auto;
}

.link-text {
  @apply font-semibold;
}
</style>
