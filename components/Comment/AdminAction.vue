<template>
  <OnClickOutside :options="onClickOutsideHandler">
    <div class="relative" v-if="userStore.isAdmin">
      <button @click="isOpen = !isOpen">
        <SvgHorizontalCircles class="w-6 h-6 rotate-90" />
      </button>

      <div
        class="absolute right-0 w-[150px] z-20 shadow p-1 rounded bg-white border border-gray"
        v-if="isOpen"
      >
        <div class="grid grid-cols-1 gap-1">
          <AppButton small @click="handleDelete">Usuń</AppButton>
          <AppButton small @click="toggleBanAction">Ban</AppButton>

          <OverlayPanel ref="op" :show-close-icon="false">
            <div class="grid grid-cols-1 gap-1">
              <AppInput
                id="banLength"
                label="Długość bana w dniach (1 - 31)"
                :error="ban.validation.banDays"
                v-model="ban.data.banDays"
              />
              <AppInput
                id="reason"
                name="reason"
                label="Powód"
                :error="ban.validation.reason"
                v-model="ban.data.reason"
              />
              <AppButton :is-loading="ban.isLoading" @click="handleBan">
                Zbanuj
              </AppButton>
            </div>
          </OverlayPanel>
        </div>
      </div>
    </div>
  </OnClickOutside>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore";
import { OnClickOutside } from "@vueuse/components";
import OverlayPanel from "primevue/overlaypanel";

interface IProps {
  userId: string;
  commentId: string;
  replyId?: undefined | string;
}

const props = defineProps<IProps>();
const toast = useAppToast();
const userStore = useUserStore();

const isOpen = ref(false);

const ban = reactive({
  isLoading: false,
  data: {
    banDays: 7,
    reason: "",
  },
  validation: {
    banDays: "",
    reason: "",
  },
});
const op = ref<OverlayPanel>();

const toggleBanAction = (e: Event) => {
  op.value?.toggle(e);
};

const onClickOutsideHandler = [
  (ev: Event) => {
    isOpen.value = false;
  },
  { ignore: [op] },
];

const handleBan = async () => {
  ban.isLoading = true;
  ban.validation = {
    reason: "",
    banDays: "",
  };

  const { error } = await useApi(`user/${props.userId}/ban`, {
    method: "POST",
    body: ban.data,
  });

  ban.isLoading = false;

  if (error.value) {
    if (error.value.errors) {
      ban.validation = { ...error.value.errors } as any;
      return;
    }
    toast.error(error.value.message, "Wystąpił błąd");
    return;
  }

  toast.success("Pomyślnie zbanowano użytkownika");
};

const handleDelete = async () => {
  const url = props.replyId
    ? `comment/${props.commentId}/reply/${props.replyId}`
    : `comment/${props.commentId}`;

  const { error } = await useApi(url, { method: "DELETE" });

  if (error.value) {
    toast.error(error.value.message);
    return;
  }

  toast.success("Pomyślnie usunięto komentarz");
};
</script>
