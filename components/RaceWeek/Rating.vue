<template>
  <div class="bg-card rounded p-2" v-if="data && isRated">
    <div class="grid grid-cols-1 gap-2">
      <div>
        <div class="text-lg text-center font-semibold">
          Zakończono
          <NuxtLink
            :to="`/kalendarz/${data.raceWeek.season.year}/${data.raceWeek.slug}`"
            class="text-primary"
          >
            {{ data.raceWeek.name }}
          </NuxtLink>
        </div>
        <div class="text-center">Oceń kierowców z zeszłych zawodów!</div>

        <div class="text-center text-xs">
          Masz czas do
          <span class="font-semibold">{{
            useDate(data.finish).dateWithTime
          }}</span>
        </div>
      </div>

      <AppButtonLink to="/oceny" class="mt-2">Oceń</AppButtonLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useApi<any>("rating");
const isRated = ref(false);

if (data.value) {
  const { data: userRatings } = await useApi<any>(`rating/${data.value.id}`);

  if (userRatings.value && !userRatings.value.ratings.length) {
    isRated.value = true;
  }
}
</script>
