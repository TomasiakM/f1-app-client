<template>
  <div
    v-if="showAlert"
    class="flex justify-between items-center text-sm rounded p-2"
    :class="{
      'text-success bg-success/10 border border-success/50': color == 'success',
      'text-danger bg-danger/10 border border-danger/50': color == 'danger',
    }"
  >
    <slot />
    <button @click="showAlert = false" class="block">
      <SvgClose class="w-5 h-5" />
    </button>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  color?: "success" | "danger";
}

withDefaults(defineProps<IProps>(), {
  color: "success",
});

const showAlert = ref(true);
</script>
