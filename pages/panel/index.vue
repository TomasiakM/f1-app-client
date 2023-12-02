<template>
  <div class="grid gap-2">
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

    <div class="bg-primary h-1 rounded" />

    <div class="grid grid-cols-5 gap-2">
      <NuxtLink to="/panel/sezony" class="link">
        <div>
          <SvgBook class="link-svg" />
          <span class="link-text">Sezony</span>
        </div>
      </NuxtLink>

      <NuxtLink to="/panel/kalendarze" class="link">
        <div>
          <SvgCalendar class="link-svg" />
          <span class="link-text">Kalendarze</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/panel/wyniki" class="link">
        <div>
          <SvgListBullet class="link-svg" />
          <span class="link-text">Wyniki</span>
        </div>
      </NuxtLink>
    </div>

    <div class="bg-primary h-1 rounded" />

    <div class="grid grid-cols-5 gap-2">
      <NuxtLink to="/panel/kierowcy" class="link">
        <div>
          <SvgUser class="link-svg" />
          <span class="link-text">Kierowcy</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/panel/zespoly" class="link">
        <div>
          <SvgGroup class="link-svg" />
          <span class="link-text">Zespoły</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/panel/tory" class="link">
        <div>
          <SvgFlag class="link-svg" />
          <span class="link-text">Tory</span>
        </div>
      </NuxtLink>
    </div>
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
