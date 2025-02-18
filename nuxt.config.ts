export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?" +
            "family=Inter:wght@100..900&" +
            "family=Playfair+Display:ital,wght@0,300..900;1,300..900&" + // ← use Playfair Display
            "display=swap",
        },
      ],
    },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],

  postcss: {
    plugins: { tailwindcss: {}, autoprefixer: {} },
  },

  modules: ["@prisma/nuxt", "@vueuse/nuxt"],
});
