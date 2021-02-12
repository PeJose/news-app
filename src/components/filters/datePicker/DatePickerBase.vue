<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    :return-value.sync="pickedDate"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="pickedDate"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="pickedDate" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="changeDate">
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DatePickerBase",
  props: ["date", "label"],
  data() {
    return {
      pickedDate: "",
    };
  },
  watch: {
    date() {
      this.pickedDate = this.date;
    },
  },
  created() {
    this.pickedDate = this.date;
  },
  methods: {
    changeDate() {
      this.$refs.menu.save(this.pickedDate);
      this.$emit("datechange", this.pickedDate);
    },
  },
};
</script>

<style></style>
