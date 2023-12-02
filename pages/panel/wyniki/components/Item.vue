<template>
  <div class="grid gap-2 bg-card rounded p-2">
    <div class="flex justify-between gap-2">
      <div class="flex gap-2 text-lg">
        <div>
          <slot name="name" />
        </div>
      </div>
      <div class="flex gap-2">
        <button @click="showResults = !showResults">
          <SvgChevron
            class="w-5 h-5"
            :class="showResults ? '' : 'rotate-180'"
          />
        </button>
      </div>
    </div>

    <div v-if="showResults">
      <div class="flex justify-end">
        <button @click="handleAddResult">
          <SvgPlus class="w-5 h-5" />
        </button>
      </div>

      <div class="grid gap-2 divide-y" v-if="sessionLength">
        <slot />
        <AppButton type="button" @click="emits('save-results')">
          Zapisz
        </AppButton>
      </div>
      <div v-else>Brak wyników sesji</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  sessionLength: number;
}
interface IEmits {
  (e: "add-result"): void;
  (e: "save-results"): void;
}
defineProps<IProps>();
const emits = defineEmits<IEmits>();

const showResults = ref(false);

const handleAddResult = () => {
  showResults.value = true;
  emits("add-result");
};
</script>
