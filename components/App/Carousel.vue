<template>
  <PrimeCarousel
    :value="value"
    :numVisible="5"
    :responsive-options="carouselOptions"
    circular
    :show-navigators="false"
    :pt="{
      indicatorbutton: {
        //@ts-ignore type: any
        root: ({ context }) => ({
          class: [
            'w-8 h-2 transition duration-200 rounded-0',
            {
              'bg-gray': !context.highlighted,
              'bg-primary': context.highlighted,
            },
          ],
        }),
      },
    }"
  >
    <template #header>
      <div
        class="text-lg font-semibold bg-primary text-white rounded px-2 py-1 mb-4"
      >
        <slot />
      </div>
    </template>
    <template #item="{ data, index }">
      <slot name="item" :data="data" :index="index" />
    </template>
  </PrimeCarousel>
</template>

<script lang="ts" setup>
interface IProps {
  value: any[];
}

defineProps<IProps>();

const carouselOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 4,
    numScroll: 4,
  },
  {
    breakpoint: "767px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "575px",
    numVisible: 2,
    numScroll: 2,
  },
]);
</script>
