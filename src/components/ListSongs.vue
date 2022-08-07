<!-- <script setup lang="ts">
// defineProps<{ songs: Record<string, any[]> }>();
</script> -->

<script lang="ts">
export default {
  methods: {
    embedURL(trackId: number) {
      return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
    },
    nextSong() {
      return (this.index = (this.index + 1) % this.songs.length);
    },
  },
  data() {
    return {
      index: 0,
      renderedSongs: [],
      firstEmbedHadTimeToLoad: false,
      songs: [
        { id: 835612252 },
        { id: 828577543 },
        { id: 455122617 },
        { id: 333356598 },
        { id: 330547202 },
        { id: 322109408 },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.firstEmbedHadTimeToLoad = true;
    }, 1500);
  },
  setup() {
    return {
      name: "Music",
    };
  },
};
</script>

<template>
  <div class="iframe-container">
    <div class="button-backing">
      <div class="button-wrapper">
        <button @click="nextSong">
          <div
            i-carbon:skip-forward-filled
            style="background-color: white; transform: scale(1.8, 1.8)"
          />
        </button>
      </div>
    </div>
    <template v-for="(song, i) of songs" :key="song.id">
      <iframe
        v-if="i === 0 || firstEmbedHadTimeToLoad"
        v-show="i === index"
        width="100%"
        height="300"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        :src="embedURL(song.id)"
      ></iframe>
    </template>
    <div class="loading-border"></div>
  </div>
</template>

<!-- TODO: Apply dark-theming for all these custom little elements -->

<style scoped>
.button-backing {
  background: linear-gradient(
    217deg,
    rgba(0, 0, 0, 0),
    rgba(255, 255, 255, 1) 30%
  );
  border-radius: 100px;

  position: absolute;
  width: 90px;
  height: 90px;
  top: -38px;
  right: -38px;

  display: flex;
  justify-content: center;
  align-items: center;

  -webkit-clip-path: circle(80%);
  clip-path: circle(50%);

  box-shadow: 10px -10px 8px -15px inset;
}
.loading-border {
  width: 100%;
  height: 100%;
  outline: solid 1px black;
  outline-offset: -1px;
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 12px;
}

.iframe-container {
  position: relative;
}

/* How do I reuse colors across the application? */

button {
  /* This button follows the positioning of its parent, but its parent  */
  width: 64px;
  height: 64px;

  background-image: linear-gradient(45deg, #d9d2c4, #fad9b7);
  color: white;
  border-radius: 100px;
  transition: all 0.45s ease-out;

  box-shadow: -3px 3px 10px 0px #cacaca;
}

button:hover {
  transform: scale(1.2);
}

iframe {
  border-radius: 10px;
  box-shadow: -15px 15px 30px;
}
</style>
