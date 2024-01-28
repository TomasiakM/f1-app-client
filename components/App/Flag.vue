<template>
  <CountryFlag
    :country="code"
    :size="size"
    class="rounded shadow"
    :class="{ '!-mt-1 !-mr-3.5': size === 'normal' }"
  />
</template>

<script lang="ts" setup>
import CountryFlag from "vue-country-flag-next";

interface IProps {
  code: string;
  size?: "small" | "normal" | "big";
}

withDefaults(defineProps<IProps>(), {
  size: "normal",
});
</script>
