<template>
  <v-card
    tile
    :elevation="elevation"
    class=" mb-6 px-10 py-5"
    @mouseover="elevation = 10"
    @mouseleave="elevation = 2"
  >
    <v-card-title
      style="word-break: normal!important; text-indent: 20px"
      class="text-h4 mb-5"
      align="start"
    >
      <v-img :src="article.fields.thumbnail"></v-img>
      <a class="mt-5" @click="goToArticle">{{ article.webTitle }}</a>
    </v-card-title>
    <v-card-subtitle>Publicated: {{ articleDate }}</v-card-subtitle>
    <v-card-text style="word-break: normal!important; text-indent: 10px"
      >{{ articleText }}... <a @click="goToArticle">Read more</a></v-card-text
    >
    <v-card-actions>
      <v-spacer />
      <a
        @click="
          saveToWatchlist({
            title: article.webTitle,
            url: article.apiUrl,
            category: article.sectionId,
            thumbnail: article.fields.thumbnail,
          })
        "
        ><v-icon class="pb-1">mdi-plus</v-icon>Add to watchlist</a
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SingleArticleMinified",
  props: ["article"],
  data() {
    return {
      elevation: 2,
    };
  },
  computed: {
    articleText() {
      return this.article.fields.bodyText.substring(0, 500).trim();
    },
    articleDate() {
      const date = new Date(this.article.webPublicationDate);
      const year = date.getUTCFullYear();
      const month = ("0" + (date.getUTCMonth() + 1)).substr(-2);
      const day = ("0" + date.getUTCDate()).substr(-2);
      const time =
        ("0" + date.getUTCHours()).substr(-2) +
        ":" +
        ("0" + date.getUTCMinutes()).substr(-2);
      return year + "/" + month + "/" + day + " " + time;
    },
  },
  methods: {
    goToArticle() {
      let route = this.$router.resolve({
        name: "Article",
        query: { url: this.article.apiUrl },
      });
      window.open(route.href, "_blank");
    },
    saveToWatchlist(article) {
      this.$store.dispatch("saveToWatchlist", article);
    },
  },
};
</script>

<style></style>
git commit -m "E-III: Added filters, night mode, sections in watchlist, miniatures in watchlist"