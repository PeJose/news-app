<template>
  <v-card tile elevation="2" class="px-5 py-5 my-6">
    <v-card-title class="text-h5">Filters</v-card-title>
    <v-row>
      <v-col>
        <date-picker-base
          :date="DateFrom"
          :label="labelFrom"
          @datechange="dateFrom = $event"
        ></date-picker-base
        ><date-picker-base
          :date="DateTo"
          :label="labelTo"
          @datechange="dateTo = $event"
        ></date-picker-base>
        <v-text-field
          v-model="searchPhrase"
          label="Search phrase"
          prepend-icon="mdi-clipboard-text-search"
        >
        </v-text-field>
        <v-btn block class="mt-5" dark color="blue" @click="acceptFilters"
          >FILTER ARTICLES</v-btn
        >
        <v-btn block class="mt-2" color="red" @click="resetFilters"
          >CLEAR FILTERS</v-btn
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DatePickerBase from "@/components/filters/datePicker/DatePickerBase.vue";
export default {
  components: {
    DatePickerBase,
  },
  props: ["target"],
  data() {
    return {
      dateFrom: "2021-01-01",
      dateTo: "2021-02-12",
      labelFrom: "Date from:",
      labelTo: "Date to:",
      searchPhrase: "",
    };
  },
  computed: {
    Categories() {
      return this.$store.getters.Categories;
    },
    DateFrom() {
      return this.$store.getters.DateFrom;
    },
    DateTo() {
      return this.$store.getters.DateTo;
    },
  },
  watch: {
    dateFrom() {
      this.changeDates();
    },
    dateTo() {
      this.changeDates();
    },
  },
  methods: {
    async acceptFilters() {
      this.$store.commit("change_search", this.searchPhrase);
      await this.$store.dispatch("getArticles");
    },
    async changeDates() {
      await this.$store.dispatch("changeDates", {
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
      });
    },
    async resetFilters() {
      this.searchPhrase = "";
      this.$store.commit("change_search", null);
      await this.$store.dispatch("changeDates", null);
      await this.$store.dispatch("getArticles");
    },
  },
};
</script>

<style></style>
