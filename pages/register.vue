<template>
  <div class="flex bg-black h-screen">
    <!-- Side Bar -->
    <div class="bg-zinc-900 w-[516px] p-10 flex flex-col justify-center">
      <Logo />
      <h1 class="text-white font-bold text-lg mt-7">Sign up for free!</h1>
      <p class="text-zinc-300 text-sm">Have an account already? <span class="font-bold text-yellow-500 underline">Log in</span></p>
      <!-- Login Form -->
      <form @submit.prevent="submit">
        <div class="mt-10">
          <label
            for="email"
            class="text-zinc-300 text-sm block mb-1"
            >Email Address</label
          >
          <input
            v-model="email"
            type="email"
            class="block w-full bg-gray-700 border border-zinc-400 rounded text-white text-sm px-3 py-2 placeholder:text-zinc-400"
            placeholder="email@example.com" />
        </div>
        <div>
          <label
            for="password"
            class="text-zinc-300 text-sm block mb-1"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            class="block w-full bg-gray-700 border border-zinc-400 rounded text-white text-sm px-3 py-2 placeholder:text-zinc-400"
            placeholder="***********" />
        </div>
        <!-- Sign Up Button -->
        <div>
          <button class="w-full mt-4 bg-yellow-500 rounded-full px-3 py-2 text-sm font-bold">Sign Up</button>
        </div>
      </form>
    </div>
    <!-- Note Demo -->
    <div></div>
  </div>
</template>

<script setup>
const email = ref("");
const password = ref("");

async function submit() {
  console.log(email.value);
  console.log(password.value);

  const response = await $fetch("/api/user", {
    method: "POST",
    body: {
      email: email.value,
      password: password.value,
    },
  });

  console.log(response);
}
</script>
