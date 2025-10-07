export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "NoteNut",
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
            "https://fonts.googleapis.com/css2?" + "family=Inter:wght@100..900&" + "family=Playfair+Display:ital,wght@0,300..900;1,300..900&" + "display=swap",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },

        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },

        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },

        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],

  postcss: {
    plugins: { tailwindcss: {}, autoprefixer: {} },
  },

  modules: ["@vueuse/nuxt"],
  nitro: {
    preset: "netlify",
    externals: { inline: [".prisma/client"] },
  },
});
