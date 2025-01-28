<template>
  <div class="flex bg-zinc-900 h-screen">
    <!-- Side Bar -->
    <div class="bg-black w-[516px] p-10 flex flex-col justify-center">
      <Logo />
      <h1 class="text-white font-bold text-lg mt-7">Log in</h1>
      <p class="text-zinc-300 text-sm">
        Don't have an account yet?<nuxt-link
          to="/register"
          class="font-bold text-yellow-500 underline"
          >Sign up</nuxt-link
        >for an account
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
          <button class="w-full mt-4 bg-yellow-500 rounded-full px-3 py-2 text-sm font-bold">Log In</button>
        </div>
      </form>
    </div>
    <!-- Note Demo -->
    <div></div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
const email = ref("");
const password = ref("");

async function submit() {
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
      text: "Logged in!",
      icon: "success",
      confirmButtonText: "OK",
    });

    if (isConfirmed) {
      navigateTo("/");
    }
  } catch (error) {
    console.log("ERROR:");
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
