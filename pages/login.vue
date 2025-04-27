<template>
  <div class="flex bg-zinc-900 h-screen">
    <!-- Side Bar -->
    <div class="bg-black w-[500px] p-10 flex flex-col justify-center">
      <Logo />
      <h1 class="text-white font-bold text-lg mt-8">Log in to your account</h1>
      <p class="text-zinc-300 text-sm mt-1">
        Don't have an account?
        <nuxt-link
          to="/register"
          class="font-bold text-yellow-500 underline">
          Sign up
        </nuxt-link>
        for one.
      </p>
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
            autocomplete="email"
            class="block w-full bg-gray-700 border border-zinc-400 rounded text-white text-sm px-3 py-2 placeholder:text-zinc-400"
            placeholder="email@example.com" />
        </div>
        <div class="mt-6">
          <label
            for="password"
            class="text-zinc-300 text-sm block mb-1"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            autocomplete="password"
            class="block w-full bg-gray-700 border border-zinc-400 rounded text-white text-sm px-3 py-2 placeholder:text-zinc-400"
            placeholder="***********" />
        </div>
        <!-- Log in Button -->
        <div>
          <button class="w-full mt-4 bg-yellow-500 rounded-full px-3 py-2 text-sm font-bold flex justify-center items-center space-x-2">
            <span>Log in</span><ArrowRight />
          </button>
        </div>
      </form>
    </div>
    <!-- Note Demo -->
    <div></div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import ArrowRight from "~/components/ArrowRight.vue";
const email = ref("");
const password = ref("");

async function submit() {
  if (!email.value || !password.value) {
    Swal.fire({
      title: "Missing fields",
      text: "Please enter both email and password.",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return;
  }

  try {
    const response = await $fetch("/api/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    const { isConfirmed } = await Swal.fire({
      title: "Success!",
      text: "Logged in successfully.",
      icon: "success",
      confirmButtonText: "Close",
    });
    if (isConfirmed) {
      navigateTo("/");
    }
  } catch (error) {
    console.error("Login error:", error);
    console.log(error.response?._data?.message);
    Swal.fire({
      title: "Error!",
      text: error.response?._data?.message,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}
</script>
