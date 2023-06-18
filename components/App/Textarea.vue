<template>
  <div class="grid">
    <label v-if="label" :for="id" class="text-sm font-semibold">
      {{ label }}
    </label>
    <textarea
      :id="id"
      v-bind="$attrs"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="p-1 bg-white rounded border min-h-[82px]"
      :class="{ 'border-gray': !error, 'border-danger': error }"
    />
    <span v-if="error" class="text-sm font-semibold text-danger">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  id: string;
  label?: string;
  modelValue: string;
  error?: string | null;
}

defineProps<IProps>();
defineEmits(["update:modelValue"]);

defineOptions({
  inheritAttrs: false,
});
</script>
