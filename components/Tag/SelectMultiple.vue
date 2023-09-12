<template>
  <HeadlessListbox
    v-model="selectedItems"
    multiple
    @update:modelValue="(value) => $emit('update:modelValue', value)"
  >
    <div class="relative">
      <HeadlessListboxButton
        class="relative w-full text-left cursor-pointer rounded bg-white p-2 focus:outline-none focus-visible:border-black focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black sm:text-sm"
      >
        <div v-if="selectedItems.length" class="flex items-center gap-1">
          <span
            class="block truncate bg-primary rounded text-white px-1"
            v-for="id in modelValue"
            :key="id"
            @click="selectedItems.filter((e) => e !== id)"
          >
            {{ getTagName(id) }}
          </span>
        </div>
        <div v-else>Wybierz tagi...</div>
      </HeadlessListboxButton>
      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <HeadlessListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white text-base sm:text-sm"
        >
          <HeadlessListboxOption
            v-for="tag in data"
            :key="tag.id"
            :value="tag.id"
            v-slot="{ active, selected }"
            as="template"
          >
            <li
              :class="[
                selected && active
                  ? 'bg-danger text-white'
                  : active
                  ? 'bg-success text-white'
                  : 'text-black',
                'relative cursor-default select-none p-2',
              ]"
            >
              <span>{{ tag.name }}</span>
            </li>
          </HeadlessListboxOption>
        </HeadlessListboxOptions>
      </transition>
    </div>
  </HeadlessListbox>
</template>

<script lang="ts" setup>
import { ITag } from "~/types/services/tag";

interface IProps {
  modelValue: string[];
}

const props = defineProps<IProps>();
defineEmits(["update:modelValue"]);

const { data } = await useApi<ITag[]>("tag");

const selectedItems = ref(props.modelValue);

const getTagName = (tagId: string) => {
  return data.value?.find((e) => e.id === tagId)?.name || "undefined";
};
</script>
