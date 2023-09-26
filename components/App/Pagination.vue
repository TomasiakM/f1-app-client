<template>
  <div v-if="totalPages > 1" class="grid grid-cols-12">
    <div class="col-span-2">
      <NuxtLink
        :to="{ query: { page: page === 2 ? undefined : page - 1 } }"
        class="w-full block rounded py-1 text-sm text-center"
        :class="
          page === 1
            ? 'bg-secondary hover:bg-secondary-hover text-white'
            : 'bg-primary hover:bg-primary-hover text-white'
        "
        :disabled="page === 1 || page === null"
      >
        &lt;&lt;
      </NuxtLink>
    </div>
    <div class="col-span-8 flex justify-center items-center gap-1">
      <NuxtLink
        v-for="p in totalPages"
        :key="p"
        :to="{ query: { page: p === 1 ? undefined : p } }"
        class="rounded py-1 w-8 text-sm text-center"
        :class="
          p === page
            ? 'bg-primary text-white'
            : 'bg-secondary hover:bg-secondary-hover text-white'
        "
        :disabled="p === page"
      >
        {{ p }}
      </NuxtLink>
    </div>
    <div class="col-span-2">
      <NuxtLink
        :to="{ query: { page: page + 1 } }"
        class="w-full block rounded py-1 text-sm text-center"
        :class="
          page === totalPages
            ? 'bg-secondary hover:bg-secondary-hover text-white'
            : 'bg-primary hover:bg-primary-hover text-white'
        "
        :disabled="page === totalPages"
      >
        &gt;&gt;
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  page: number;
  totalPages: number;
}

defineProps<IProps>();
</script>
