<template>
  <div class="grid">
    <label v-if="label" :for="id" class="text-sm font-semibold">
      {{ label }}
    </label>
    <select
      :id="id"
      v-bind="$attrs"
      @change="$emit('change', ($event.target as HTMLSelectElement).value)"
      class="p-1 bg-white rounded border"
      :class="{ 'border-gray': !error, 'border-danger': error }"
    >
      <option :selected="selected === ''" disabled value="">
        Wybierz opcję
      </option>
      <option
        v-for="(value, key) in options"
        :value="key"
        :selected="selected === key"
      >
        {{ value }}
      </option>
    </select>
    <span v-if="error" class="text-sm font-semibold text-danger">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  id: string;
  label?: string;
  error?: string | null;
  selected: string;
  options: { [key: string]: string };
}
defineProps<IProps>();

interface IEmits {
  (e: "change", value: string): void;
}
defineEmits<IEmits>();

defineOptions({
  inheritAttrs: false,
});
</script>
