<template>
  <div>
    <label v-if="label" :for="id" class="text-sm font-semibold">
      {{ label }}
    </label>

    <ClientOnly>
      <Editor
        editorStyle="height: 320px"
        :pt="{
          toolbar: {
            class: ['bg-zinc-100 rounded-t !border-none '],
          },
          content: {
            class: ['bg-white rounded-b !border-none'],
          },
          root: {
            class: ['border rounded', error ? 'border-danger' : 'border-gray'],
          },
        }"
        :modelValue="modelValue"
        @text-change="(e) => $emit('update:modelValue', e.htmlValue)"
      />
    </ClientOnly>

    <span>{{ modelValue.length }}</span>

    <span v-if="error" class="text-sm font-semibold text-danger">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import Editor from "primevue/editor";

interface IProps {
  id: string;
  name: string;
  label: string;
  error?: string | null;
  modelValue: string;
}

interface IEmits {
  (e: "update:modelValue", data: string): void;
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();
</script>
