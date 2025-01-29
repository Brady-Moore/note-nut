<template>
  <div class="flex bg-zinc-900 h-screen">
    <!-- Side Bar -->
    <div class="bg-black w-[330px] p-7">
      <Logo />
      <!-- Today -->
      <div>
        <p class="text-xs font-bold text-zinc-300 mt-10 mb-3">Today</p>
        <div class="pl-2 space-y-2">
          <div
            v-for="note in todaysNotes"
            class="p-2 bg-yellow-500 rounded-lg cursor-pointer"
            :class="{ 'bg-yellow-500': note.id === selectedNote.id, 'hover:bg-yellow-500/20': note.id !== selectedNote.id }"
            @click="selectedNote = note">
            <h3 class="text-sm font-bold text-white truncate">{{ note.text.substring(0, 40) }}</h3>
            <div class="leading-none truncate text-zinc-400">
              <span class="text-xs text-white mr-4">{{
                new Date(note.updatedAt).toDateString() === new Date().toDateString() ? "Today" : new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span class="text-xs text-zinc-400">... {{ note.text.substring(50, 90) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Yesterday -->
      <div>
        <p class="text-xs font-bold text-zinc-300 mt-10 mb-3">Yesterday</p>
        <div class="pl-2 space-y-2">
          <div
            v-for="note in yesterdaysNotes"
            class="p-2 bg-yellow-500 rounded-lg cursor-pointer"
            :class="{ 'bg-yellow-500': note.id === selectedNote.id, 'hover:bg-yellow-500/20': note.id !== selectedNote.id }"
            @click="selectedNote = note">
            <h3 class="text-sm font-bold text-white truncate">{{ note.text.substring(0, 40) }}</h3>
            <div class="leading-none truncate text-zinc-400">
              <span class="text-xs text-white mr-4">{{
                new Date(note.updatedAt).toDateString() === new Date().toDateString() ? "Today" : new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span class="text-xs text-zinc-400">... {{ note.text.substring(50, 90) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Past Yesterday -->
      <div>
        <p class="text-xs font-bold text-zinc-300 mt-10 mb-3">Past</p>
        <div class="pl-2 space-y-2">
          <div
            v-for="note in pastNotes"
            class="p-2 bg-yellow-500 rounded-lg cursor-pointer"
            :class="{ 'bg-yellow-500': note.id === selectedNote.id, 'hover:bg-yellow-500/20': note.id !== selectedNote.id }"
            @click="selectedNote = note">
            <h3 class="text-sm font-bold text-white truncate">{{ note.text.substring(0, 40) }}</h3>
            <div class="leading-none truncate text-zinc-400">
              <span class="text-xs text-white mr-4">{{
                new Date(note.updatedAt).toDateString() === new Date().toDateString() ? "Today" : new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span class="text-xs text-zinc-400">... {{ note.text.substring(50, 90) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Notes Container -->
    <div class="w-full">
      <div class="flex justify-between w-full items-start p-8">
        <button class="inline-flex items-center text-xs text-zinc-300 hover:text-white font-bold space-x-2"><span>Icon</span><span>New Note</span></button>
        <button>
          <span class="text-zinc-300 hover:text-white">Trash Icon</span>
        </button>
      </div>
      <div class="max-w-[450px] mx-auto">
        <p class="text-zinc-300 font-playfair">{{ new Date(selectedNote.updatedAt).toLocaleDateString() }}</p>
        <p class="text-zinc-100 my-3 font-playfair">
          {{ selectedNote.text }}
        </p>
        <p class="text-zinc-100 my-3 font-playfair">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci debitis quas sit rem dolore tenetur pariatur cupiditate corporis blanditiis
          architecto, iure quod alias provident soluta maxime! Voluptatibus incidunt corrupti corporis?
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const notes = ref([]);
const selectedNote = ref({});
definePageMeta({
  middleware: ["auth"],
});

const todaysNotes = computed(() => {
  return notes.value.filter((note) => {
    const noteDate = new Date(note.updatedAt);
    return noteDate.toDateString() === new Date().toDateString();
  });
});
const yesterdaysNotes = computed(() => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return notes.value.filter((note) => {
    const noteDate = new Date(note.updatedAt);
    return noteDate.toDateString() === yesterday.toDateString();
  });
});

const pastNotes = computed(() => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return notes.value.filter((note) => {
    const noteDate = new Date(note.updatedAt);
    return noteDate < yesterday && noteDate.toDateString() !== yesterday.toDateString();
  });
});

onMounted(async () => {
  notes.value = await $fetch("/api/notes");

  if (notes.value.length > 0) {
    selectedNote.value = notes.value[0];
  }
});
</script>
