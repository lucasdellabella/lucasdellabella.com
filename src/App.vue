<template>
  <NavBar />
  <main class="px-7 py-10">
    <router-view />
    <Footer />
  </main>
</template>

<script setup lang="ts">
const theme = "lightmode";
const favicons = {
  link: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: `favicon/${theme}/apple-touch-icon.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: `favicon/${theme}/favicon-32x32.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: `favicon/${theme}/favicon-16x16.png`,
    },
    { rel: "manifest", href: `site.webmanifest` },
    {
      rel: "mask-icon",
      href: `favicon/${theme}/safari-pinned-tab.svg`,
      color: "#5bbad5",
    },
  ],
  meta: [
    /* Favicon meta */
    { name: "msapplication-TileColor", content: "#da532c" },
    { name: "theme-color", content: "#ffffff" },
  ],
};

useHead({
  meta: [
    { property: "og:title", content: "Lucas Della Bella" },
    { property: "og:image", content: "https://lucasdellabella.com/avatar.png" },
    { name: "description", content: "Lucas Della Bella's Portfolio" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:creator", content: "@FiveEels" },
    ...favicons.meta,
  ],
  link: [...favicons.link],
});
</script>
