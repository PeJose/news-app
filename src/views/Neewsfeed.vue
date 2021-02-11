<template>
  <v-container fluid class="px-15">
    <v-row>
      <v-col>
        <v-card tile class="px-5 py-5"
          ><div class="text-h2">
            {{ CurrentCategory !== null ? CurrentCategory.name : "All news" }}
          </div></v-card
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9">
        <single-article-minified
          v-for="(article, index) in Articles"
          :key="index"
          :article="article"
        ></single-article-minified>
        <v-pagination
          v-model="page"
          class="my-4"
          :length="Pages"
          :total-visible="7"
          @input="changePage"
        ></v-pagination>
      </v-col>
      <v-col cols="3"><categories-list :target="'changeCategory'"></categories-list> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SingleArticleMinified from "@/components/article/SingleArticleMinified.vue";
import CategoriesList from "@/components/categories/CategoriesList.vue";
export default {
  components: { SingleArticleMinified, CategoriesList },
  data() {
    return {
      page: 1,
    };
  },
  async created() {
    await this.$store.dispatch("getArticles");
  },
  computed: {
    Articles() {
      return this.$store.getters.Articles;
    },
    CurrentCategory() {
      return this.$store.getters.CurrentCategory;
    },
    CurrentPage() {
      return this.$store.getters.CurrentPage;
    },
    Pages() {
      return this.$store.getters.Pages;
    },
  },
  watch: {
    Page() {
      this.page = this.$store.getters.Page;
    },
  },
  methods: {
    async changePage(event) {
      this.$store.commit("change_page", event);
      await this.$store.dispatch("getArticles");
    },
  },
};
</script>

<style></style>
