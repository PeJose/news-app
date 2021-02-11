<template>
  <v-container fluid class="px-15">
    <v-card
      tile
      elevation="2"
      v-for="(article, index) in Watchlist"
      :key="index"
      class=" my-5 px-10 py-5"
      @mouseover="elevation = 10"
      @mouseleave="elevation = 2"
    >
      <v-row align="center">
        <v-col cols="10"
          ><v-card-title
            style="word-break: normal!important; text-indent: 20px"
            class="text-h5"
            align="start"
            >{{ article.title }}
          </v-card-title>
        </v-col>
        <v-col cols="2"
          ><v-btn
            block
            class="mb-2"
            color="primary"
            @click="goToArticle(article.url)"
            >Go to article</v-btn
          >
          <v-btn block color="error" @click="deleteFromWatchlist(index)"
            >Delete</v-btn
          ></v-col
        >
      </v-row>
    </v-card></v-container
  >
</template>

<script>
// @ is an alias to /src

export default {
  name: "Watchlist",
  created() {
    this.$store.dispatch("getWatchlist");
  },
  computed: {
    Watchlist() {
      return this.$store.getters.Watchlist;
    },
  },
  methods: {
    goToArticle(url) {
      let route = this.$router.resolve({
        name: "Article",
        query: { url: url },
      });
      window.open(route.href, "_blank");
    },
    deleteFromWatchlist(url) {
      this.$store.dispatch("deleteFromWatchlist", url);
    },
  },
};
</script>
