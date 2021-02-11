<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-app-bar app color="secondary">
      <div class="d-flex align-center">
        <router-link to="/"
          ><v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="@/assets/images/logo.svg"
            transition="scale-transition"
            width="200"
            @click="changeCategory(null)"
        /></router-link>
      </div>
      <v-spacer />
      <v-btn
        to="/"
        class="mx-3"
        color="primary"
        tile
        depressed
        @click="changeCategory(null)"
        >Articles</v-btn
      >
      <v-btn to="/watchlist" class="ml-3 mr-10" color="primary" tile depressed
        >Watchlist</v-btn
      >
      <v-switch
        append-icon="mdi-weather-night"
        dark
        class="pt-5"
        color="yellow"
        v-model="$vuetify.theme.dark"
        inset
      ></v-switch>
    </v-app-bar>

    <v-main><router-view></router-view> </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  data() {
    return {};
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    async changeCategory(category) {
      this.$store.commit("change_category", category);
      await this.$store.dispatch("getArticles");
    },
  },
};
</script>
