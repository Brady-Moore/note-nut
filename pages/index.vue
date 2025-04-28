<template>
  <div class="flex bg-zinc-900 h-screen">
    <!-- Side Bar -->
    <div class="bg-black w-[330px] p-7 flex flex-col overflow-scroll">
      <div>
        <Logo />
      </div>
      <!-- Today -->
      <div class="flex-grow">
        <p class="text-xs font-bold text-zinc-300 mt-10 mb-3">Today</p>
        <div class="pl-2 space-y-2">
          <div
            v-for="note in todaysNotes"
            :key="note.id"
            class="p-2 rounded-lg cursor-pointer"
            :class="{ 'bg-yellow-500': selectedNote && note.id === selectedNote.id, 'hover:bg-yellow-500/20': !selectedNote || note.id !== selectedNote.id }"
            @click="setNote(note)">
            <h3 class="text-sm font-bold text-white truncate">{{ note.text.substring(0, 40) }}</h3>
            <div class="leading-none truncate text-zinc-400">
              <span class="text-xs text-white mr-4">{{ new Date(note.updatedAt).toLocaleDateString() }}</span>
              <span
                v-if="note.text.length > 50"
                class="text-xs text-zinc-400"
                >... {{ note.text.substring(50, 90) }}</span
              >
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
            :key="note.id"
            class="p-2 rounded-lg cursor-pointer"
            :class="{ 'bg-yellow-500': selectedNote && note.id === selectedNote.id, 'hover:bg-yellow-500/20': !selectedNote || note.id !== selectedNote.id }"
            @click="setNote(note)">
            <h3 class="text-sm font-bold text-white truncate">{{ note.text.substring(0, 40) }}</h3>
            <div class="leading-none truncate text-zinc-400">
              <span class="text-xs text-white mr-4">{{
                new Date(note.updatedAt).toDateString() === new Date().toDateString() ? "Today" : new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span
                v-if="note.text.length > 50"
                class="text-xs text-zinc-400"
                >... {{ note.text.substring(50, 90) }}</span
              >
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
            :key="note.id"
            class="p-2 rounded-lg cursor-pointer"
            :class="{ 'bg-yellow-500': selectedNote && note.id === selectedNote.id, 'hover:bg-yellow-500/20': !selectedNote || note.id !== selectedNote.id }"
            @click="setNote(note)">
            <h3 class="text-sm font-bold text-white truncate">{{ note.text.substring(0, 40) }}</h3>
            <div class="leading-none truncate text-zinc-400">
              <span class="text-xs text-white mr-4">{{
                new Date(note.updatedAt).toDateString() === new Date().toDateString() ? "Today" : new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span
                v-if="note.text.length > 50"
                class="text-xs text-zinc-400"
                >... {{ note.text.substring(50, 90) }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Notes Container -->
    <div class="w-full flex flex-col">
      <div class="flex justify-between w-full items-start p-8">
        <button
          class="inline-flex items-center text-xs text-zinc-300 hover:text-white font-bold space-x-2"
          @click="createNote">
          <span>Icon</span><span>New Note</span>
        </button>
        <button @click="deleteNote">
          <span class="text-zinc-300 hover:text-white">Trash Icon</span>
        </button>
      </div>
      <div class="max-w-[450px] mx-auto w-full flex-grow">
        <p
          v-if="selectedNote"
          class="text-zinc-300 font-playfair">
          {{ new Date(selectedNote.updatedAt).toLocaleDateString() }}
        </p>
        <p
          v-else
          class="text-zinc-400 italic">
          No note selected
        </p>
        <textarea
          ref="textarea"
          v-model="updatedNote"
          name="note"
          id="note"
          class="text-zinc-100 bg-transparent w-full my-3 font-playfair focus:outline-none resize-none flex-grow"
          @input="
            () => {
              if (!selectedNote) return;
              selectedNote.text = updatedNote;
              debouncedFn();
            }
          "></textarea>
      </div>
      <button
        class="text-zinc-300 hover:text-white text-sm font-bold absolute right-3 bottom-3 p-3"
        @click="logout">
        Log Out
      </button>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import { nextTick } from "vue";

const updatedNote = ref("");
const notes = ref([]);
const selectedNote = ref(null);
const textarea = ref(null);
const lastSavedText = ref("");
definePageMeta({
  middleware: ["auth"],
});

function logout() {
  const token = useCookie("NoteNutJWT");
  token.value = null;
  navigateTo("/login");
}

function setNote(note) {
  selectedNote.value = note;
  updatedNote.value = note.text;
  lastSavedText.value = note.text;
}

async function deleteNote() {
  const { isConfirmed } = await Swal.fire({
    title: "Deletion Confirmation",
    text: "Are you sure you'd like to delete this note permanently? You will not be able to recover it after this.",
    icon: "warning",
    confirmButtonText: "Delete Permanently",
    showCancelButton: true,
  });

  if (isConfirmed) {
    await $fetch(`/api/notes/${selectedNote.value.id}`, {
      method: "DELETE",
    });

    const index = notes.value.findIndex((note) => {
      return note.id === selectedNote.value.id;
    });

    if (index !== -1) {
      const deletedSelected = notes.value[index].id === selectedNote.value?.id;
      notes.value.splice(index, 1);

      if (deletedSelected) {
        selectedNote.value = notes.value[0] ?? null;
        updatedNote.value = selectedNote.value ? selectedNote.value.text : "";
      }
    }
  }
}

async function createNote() {
  try {
    const newNote = await $fetch(`/api/notes`, {
      method: "POST",
    });

    notes.value.unshift(newNote);
    selectedNote.value = notes.value[0];
    updatedNote.value = "";
    textarea.value.focus();
  } catch (error) {
    console.log(error);
  }
}

const debouncedFn = useDebounceFn(async () => {
  if (!selectedNote.value) return;
  if (updatedNote.value === lastSavedText.value) return;
  await updateNote();
}, 1000);

async function updateNote() {
  try {
    await $fetch(`/api/notes/${selectedNote.value.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        updatedNote: updatedNote.value,
      },
    });

    selectedNote.value.text = updatedNote.text;
    selectedNote.value.updatedAt = updatedNote.updatedAt;
  } catch (error) {
    console.log(error);
  }
}

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

  notes.value.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  if (notes.value.length > 0) {
    selectedNote.value = notes.value[0];
  } else {
    await createNote();
    selectedNote.value = notes.value[0];
  }

  if (selectedNote.value) {
    updatedNote.value = selectedNote.value.text;
  }

  await nextTick();
  textarea.value?.focus();
});
</script>
