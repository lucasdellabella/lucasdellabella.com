<!-- <script setup lang="ts">
// defineProps<{ songs: Record<string, any[]> }>();
</script> -->

<script lang="ts">
import Airtable from "airtable";

const airtableApikey = "keyv2SuYqwDEJqBYY";
const base = new Airtable({ apiKey: airtableApikey }).base("appxPTeVC8ajJUNIV");
const randomItem: <A>(l: Array<A>) => A = (l) =>
  l[Math.floor(Math.random() * l.length)];

export default {
  methods: {
    pronounCard() {
      this.activePronoun = randomItem(this.pronouns);
    },
    conjugationCard() {
      this.activeConjugation = randomItem(this.conjugations);
    },
    verbCard() {
      this.activeVerb = randomItem(this.verbs);
    },
    cards() {
      this.pronounCard();
      this.conjugationCard();
      this.verbCard();
    },
    flipCards() {
      if (this.cardsFlipping) return;
      this.cardsFlipping = true;
      this.sessionCount++;
      setTimeout(() => {
        this.cardsFlipping = false;
        this.reloadKey++;
        this.cards();
      }, 400);
    },
    handleClick() {
      this.flipCards();
    },
    handleKeypress(e: KeyboardEvent) {
      if (["Space", "Enter"].includes(e.code)) {
        this.flipCards();
      }
    },
  },
  data() {
    return {
      pronouns: [] as string[],
      conjugations: [] as string[],
      verbs: [] as string[],

      activePronoun: "",
      activeConjugation: "",
      activeVerb: "",

      sessionCount: 0,

      cardsFlipping: false,
      reloadKey: -1,
    };
  },
  destroyed() {
    window.removeEventListener("keyup", this.handleKeypress);
  },
  created() {},
  mounted() {
    const self = this;
    window.addEventListener("keydown", function (e) {
      if (e.code === "Space" && e.target == document.body) {
        e.preventDefault();
      }
    });

    window.addEventListener("keyup", self.handleKeypress);

    let pronouns: string[] = [];
    let conjugations: string[] = [];
    let verbs: string[] = [];

    base("cards")
      .select({
        pageSize: 100,
      })
      .eachPage(
        (records, fetchNextPage) => {
          for (let i = 0; i < records.length; i++) {
            if (records[i].fields.pronoun) {
              pronouns.push(records[i].fields.pronoun as string);
            }
            if (records[i].fields.conjugation) {
              conjugations.push(records[i].fields.conjugation as string);
            }
            if (records[i].fields.verb) {
              verbs.push(records[i].fields.verb as string);
            }
          }
          fetchNextPage();
        },
        (err: any) => {
          this.pronouns = pronouns;
          this.conjugations = conjugations;
          this.verbs = verbs;

          this.cards();

          console.log(verbs);
        }
      );
  },
  setup() {},
};
</script>

<template>
  <div :key="reloadKey" class="cards" :onclick="handleClick">
    <div
      :class="{
        card: true,
        'flip-in': true,
        'flip-out': cardsFlipping,
        'delay-0': true,
      }"
    >
      {{ activePronoun }}
    </div>
    <div
      :class="{
        card: true,
        'flip-in': true,
        'flip-out': cardsFlipping,
        'delay-40': true,
      }"
    >
      {{ activeConjugation }}
    </div>
    <div
      :class="{
        card: true,
        'flip-in': true,
        'flip-out': cardsFlipping,
        'delay-80': true,
      }"
    >
      {{ activeVerb }}
    </div>
  </div>

  <div class="bottom-container">
    <div v-if="sessionCount >= 100">{{ sessionCount }}? You're crazy! 🤯</div>
    <div class="session-count">{{ sessionCount }} completed</div>
  </div>
</template>

<style>
.cards {
  display: flex;
  position: relative;
}

.encouraging-message {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
  background-color: white;
  border: 2px solid black;

  border-radius: 8px;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 125px;
  width: 500px;
  padding: 16px;
  border-radius: 8px;
  border: 2px solid black;

  color: black;
  font-size: 24px;
}

.card:not(:nth-child(3)) {
  margin-right: 8px;
}

.bottom-container {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  margin-right: 8px;
}

.session-count {
  margin-left: auto;
}

.flip-in {
  animation: flip-in both linear;
}

.flip-out {
  animation: flip-out both linear;
}

.delay-0 {
  animation-delay: 0ms;
  animation-duration: 220ms;
}

.delay-40 {
  animation-delay: 40ms;
  animation-duration: 260ms;
}

.delay-80 {
  animation-delay: 80ms;
  animation-duration: 300ms;
}

@keyframes flip-in {
  from {
    transform: rotateX(90deg);
  }
  to {
    transform: rotateX(0deg);
  }
}

@keyframes flip-out {
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(90deg);
  }
}
</style>
