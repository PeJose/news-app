<template>
  <v-container>
    <v-card tile elevation="2" class="my-5 px-10 py-5">
      <v-card-title
        style="word-break: normal!important; text-indent: 20px"
        class="text-h4 font-weight-black mb-5"
        align="start"
        >{{ CurrentArticle.webTitle }}</v-card-title
      >
      <v-card-subtitle class="text-subtitle-1 font-italic"
        >Publicated: {{ articleDate }}
      </v-card-subtitle>
      <v-card-text
        style="word-break: normal!important; text-indent: 10px"
        v-html="articleHtml"
        >{{
      }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <a
          @click="
            saveToWatchlist({
              title: CurrentArticle.webTitle,
              url: CurrentArticle.apiUrl,
              category: CurrentArticle.sectionId,
              thumbnail: CurrentArticle.fields.thumbnail,
            })
          "
          ><v-icon class="pb-1">mdi-plus</v-icon>Add to watchlist</a
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Article",
  computed: {
    CurrentArticle() {
      return this.$store.getters.CurrentArticle;
    },
    articleHtml() {
      if (typeof this.CurrentArticle.blocks !== "undefined") {
        return this.CurrentArticle.blocks.body
          .slice(0)
          .reverse()
          .map((item) => {
            return item.bodyHtml;
          })
          .join("");
      } else {
        return '';
      }
    },
    articleDate() {
      const date = new Date(this.CurrentArticle.webPublicationDate);
      const year = date.getUTCFullYear();
      const month = ("0" + (date.getUTCMonth() + 1)).substr(-2);
      const day = ("0" + date.getUTCDate()).substr(-2);
      const time =
        ("0" + date.getUTCHours()).substr(-2) +
        ":" +
        ("0" + date.getUTCMinutes()).substr(-2);
      ":" + ("0" + date.getUTCSeconds()).substr(-2);
      return year + "/" + month + "/" + day + " " + time;
    },
  },
  async created() {
    await this.$store.dispatch("getArticle", this.$route.query.url);
  },
  methods: {
    saveToWatchlist(article) {
      this.$store.dispatch("saveToWatchlist", article);
    },
  },
};
</script>

<style>
.v-card__text figure {
  margin: 50px 10px;
}
.v-card__text p {
  margin: 0;
}
.v-card__text figcaption {
  text-align: center;
  margin-bottom: 10px;
}
.v-card__text .element-image__caption,
.v-card__text .element-image__credit {
  font-size: 11px;
}
.v-card__text .element-video {
  display: flex;
  margin: 50px 0;
}
.element-video iframe {
  margin: auto;
}
</style>
