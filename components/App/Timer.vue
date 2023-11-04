<template>
  <div v-if="timerData.show" class="text-center text-3xl font-semibold my-2">
    <div class="flex justify-center content-center gap-2">
      <div class="relative w-[34px]">
        <div>{{ timerData.days }}</div>
        <div class="absolute -bottom-2 w-full text-xs flex justify-center">
          dni
        </div>
      </div>
      <div>:</div>
      <div class="relative w-[34px]">
        <div>{{ timerData.hours }}</div>
        <div class="absolute -bottom-2 w-full text-xs flex justify-center">
          godzin
        </div>
      </div>
      <div>:</div>
      <div class="relative w-[34px]">
        <div>{{ timerData.minutes }}</div>
        <div class="absolute -bottom-2 w-full text-xs flex justify-center">
          minut
        </div>
      </div>
      <div>:</div>
      <div class="relative w-[34px]">
        <div>{{ timerData.seconds }}</div>
        <div class="absolute -bottom-2 w-full text-xs flex justify-center">
          sekund
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useIntervalFn } from "@vueuse/core";

interface IProps {
  date: Date | null;
}

const props = defineProps<IProps>();

const timerData = reactive({
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
  show: false,
});

const _s = 1000;
const _m = _s * 60;
const _h = _m * 60;
const _d = _h * 24;

const calculateTimer = () => {
  timerData.show = true;
  const now = new Date();

  if (!props.date) return;

  const time = props.date.getTime() - now.getTime();

  if (time < 0) return;

  const days = Math.floor(time / _d);
  const hours = Math.floor((time % _d) / _h);
  const minutes = Math.floor((time % _h) / _m);
  const seconds = Math.floor((time % _m) / _s);

  timerData.days = days < 10 ? `0${days}` : `${days}`;
  timerData.hours = hours < 10 ? `0${hours}` : `${hours}`;
  timerData.minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  timerData.seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
};

onMounted(() => calculateTimer());

useIntervalFn(() => {
  calculateTimer();
}, 1000);
</script>
