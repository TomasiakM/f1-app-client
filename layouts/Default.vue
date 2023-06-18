<template>
  <div>
    <TheNav />
    <div class="container mx-auto px-1 pt-2 pb-2">
      <div class="grid grid-cols-12 gap-2">
        <div class="col-span-12 md:col-span-8">
          <NuxtPage />
        </div>
        <div class="hidden md:block col-span-4">
          <div class="bg-card rounded p-2">
            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Possimus, fuga!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
