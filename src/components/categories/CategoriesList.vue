<template>
  <v-card tile elevation="2" class="px-5 py-5">
    <v-card-title class="text-h5">Categories List</v-card-title>
    <v-row>
      <v-col>
        <v-btn
          block
          class="my-2"
          :color="category.color"
          v-for="(category, index) in Categories"
          :key="index"
          @click="changeCategory(category)"
          >{{ category.name }}</v-btn
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  computed: {
    Categories() {
      return this.$store.getters.Categories;
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

<style></style>
