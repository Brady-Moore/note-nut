<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="flex bg-zinc-900 h-screen">
    <!-- Side Bar -->
    <div class="bg-black w-[330px] p-7">
      <Logo />
      <h1 class="text-white font-bold text-lg mt-7">Log in</h1>
      <p class="text-zinc-300 text-sm">
        Don't have an account yet?<nuxt-link
          to="/register"
          class="font-bold text-yellow-500 underline"
          >Sign up</nuxt-link
        >for an account
      </p>
      <!-- Notes Container -->
    </div>
    <!-- Note Demo -->
    <div></div>
  </div>
</template>
