<template>
  <ClientOnly>
    <div class="text-xs text-secondary line-clamp-1" :title="useDate(date)">
      {{ timeSince() }}
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
interface IProps {
  date: string;
}

const props = defineProps<IProps>();

const timeSince = () => {
  const date = new Date(props.date);

  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let intervalType: string;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 5) {
    return `${interval} lat temu`;
  } else if (interval >= 2) {
    return `${interval} lata temu`;
  } else if (interval >= 1) {
    return "rok temu";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 5) {
    return `${interval} miesięcy temu`;
  } else if (interval >= 2) {
    return `${interval} miesiące temu`;
  } else if (interval >= 1) {
    return "miesiąc temu";
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 2) {
    return `${interval} dni temu`;
  } else if (interval >= 1) {
    return "dzień temu";
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 5) {
    return `${interval} godzin temu`;
  } else if (interval >= 2) {
    return `${interval} godziny temu`;
  } else if (interval >= 1) {
    return "dzień temu";
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 5) {
    return `${interval} minut temu`;
  } else if (interval >= 2) {
    return `${interval} minuty temu`;
  } else if (interval >= 1) {
    return "minutę temu";
  }

  return "chwilę temu";
};
</script>
