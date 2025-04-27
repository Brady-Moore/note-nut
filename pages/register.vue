<template>
  <div class="flex bg-zinc-900 h-screen">
    <!-- Sidebar -->
    <div class="bg-black w-[500px] p-10 flex flex-col justify-center">
      <Logo />
      <h1 class="text-white font-bold text-lg mt-8">Sign up for a free account</h1>
      <p class="text-zinc-300 text-sm mt-1">
        Already registered?
        <nuxt-link
          to="/login"
          class="font-bold text-yellow-500 underline">
          Log in
        </nuxt-link>
        to your account
      </p>

      <form
        @submit.prevent="submit"
        class="mt-8">
        <!-- Email -->
        <div>
          <label
            for="email"
            class="text-zinc-300 text-sm block mb-1"
            >Email Address</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            inputmode="email"
            autocomplete="email"
            required
            class="block w-full bg-gray-700 border border-zinc-400 rounded text-white text-sm px-3 py-2 placeholder:text-zinc-400"
            placeholder="you@example.com" />
        </div>

        <!-- Password -->
        <div class="mt-6 relative">
          <label
            for="password"
            class="text-zinc-300 text-sm block mb-1"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            required
            class="block w-full bg-gray-700 border border-zinc-400 rounded text-white text-sm px-3 py-2 placeholder:text-zinc-400 pr-10"
            placeholder="••••••••" />
          <!-- Toggle visibility -->
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-8 text-zinc-400 hover:text-white text-xs focus:outline-none">
            {{ showPassword ? "Hide" : "Show" }}
          </button>

          <p class="text-xs text-zinc-400 mt-1">Use at least 8 characters with uppercase, lowercase, a number, and a symbol.</p>
        </div>

        <!-- Confirm Password -->
        <div class="mt-6 relative">
          <label
            for="confirmPassword"
            class="text-zinc-300 text-sm block mb-1"
            >Confirm Password</label
          >
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            autocomplete="new-password"
            required
            class="block w-full bg-gray-700 border border-zinc-400 rounded text-white text-sm px-3 py-2 placeholder:text-zinc-400 pr-10"
            placeholder="Re-enter password" />
          <!-- Toggle visibility -->
          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute right-3 top-8 text-zinc-400 hover:text-white text-xs focus:outline-none">
            {{ showConfirmPassword ? "Hide" : "Show" }}
          </button>
        </div>

        <!-- Inline error -->
        <p
          v-if="errorMessage"
          class="text-sm text-red-400 mt-3"
          role="alert">
          {{ errorMessage }}
        </p>

        <!-- Submit -->
        <div>
          <button
            :disabled="loading"
            class="w-full mt-5 bg-yellow-500 rounded-full px-4 py-2 text-sm font-bold flex justify-center items-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed">
            <span>{{ loading ? "Creating account…" : "Sign Up" }}</span>
            <ArrowRight v-if="!loading" />
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
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);
const errorMessage = ref("");

async function submit() {
  errorMessage.value = "";

  // Front-end validation
  if (!email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = "Please fill out all fields.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match.";
    return;
  }

  loading.value = true;
  try {
    const body = {
      email: email.value.trim().toLowerCase(),
      password: password.value,
    };

    await $fetch("/api/user", {
      method: "POST",
      body,
    });

    await Swal.fire({
      title: "Success!",
      text: "Account created successfully.",
      icon: "success",
      confirmButtonText: "Close",
    });

    navigateTo("/");
  } catch (error) {
    errorMessage.value = error?.response?._data?.message || "Could not create account.";
    await Swal.fire({
      title: "Error!",
      text: errorMessage.value,
      icon: "error",
      confirmButtonText: "Close",
    });
  } finally {
    loading.value = false;
  }
}
</script>
