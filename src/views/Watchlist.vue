<template>
  <v-container fluid class="px-15">
    <v-row>
      <v-col>
        <v-card tile class="px-5 py-5"
          ><div class="text-h2">
            {{
              WatchlistCategory !== null ? WatchlistCategory.name : "All news"
            }}
          </div></v-card
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9">
        <v-card
          tile
          elevation="2"
          v-for="(article, index) in Watchlist"
          :key="index"
          class=" mb-5 px-10 py-5"
          @mouseover="elevation = 10"
          @mouseleave="elevation = 2"
        >
          <v-row align="center">
            <v-col cols="8"
              ><v-card-title
                style="word-break: normal!important; text-indent: 20px"
                class="text-h6"
                align="start"
                >{{ article.title }}
              </v-card-title>
            </v-col>
            <v-col cols="4"
              ><v-btn
                block
                small
                class="mb-2"
                color="primary"
                @click="goToArticle(article.url)"
                >Go to article</v-btn
              >
              <v-btn
                block
                small
                color="error"
                @click="deleteFromWatchlist(index)"
                >Delete</v-btn
              ></v-col
            >
          </v-row>
        </v-card></v-col
      >
      <v-col cols="3"
        ><categories-list :target="'changeWatchlistCategory'"></categories-list>
      </v-col> </v-row
  ></v-container>
</template>

<script>
// @ is an alias to /src
import CategoriesList from "@/components/categories/CategoriesList.vue";

export default {
  name: "Watchlist",
  components: { CategoriesList },
  created() {
    this.$store.dispatch("getWatchlist");
  },
  computed: {
    Watchlist() {
      return this.$store.getters.Watchlist;
    },
    WatchlistCategory() {
      return this.$store.getters.WatchlistCategory;
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
