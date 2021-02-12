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
        <v-container
          class="py-0 px-0 mb-15"
          v-for="(section, index) in WatchlistSections"
          :key="index"
        >
          <v-card tile class="text-h5 mb-5 px-5 py-5">
            {{ section.charAt(0).toUpperCase() + section.slice(1) }}
          </v-card>
          <v-card
            tile
            elevation="2"
            v-for="(article, index) in Watchlist.filter(
              (item) => item.category === section
            )"
            :key="index"
            class=" mb-5 px-5 py-5"
            @mouseover="elevation = 10"
            @mouseleave="elevation = 2"
          >
            <v-row align="center">
              <v-col cols="3"
                ><v-img :src="article.thumbnail"></v-img
              ></v-col>
              <v-col cols="6"
                ><v-card-title
                  style="word-break: normal!important; text-indent: 20px"
                  class="text-h6"
                  align="start"
                  >{{ article.title }}
                </v-card-title>
              </v-col>
              <v-col cols="3"
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
          </v-card>
        </v-container>
      </v-col>
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
  computed: {
    Watchlist() {
      return this.$store.getters.Watchlist;
    },
    WatchlistCategory() {
      return this.$store.getters.WatchlistCategory;
    },
    WatchlistSections() {
      return this.$store.getters.WatchlistSections;
    },
  },
  created() {
    this.$store.dispatch("getWatchlist");
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
