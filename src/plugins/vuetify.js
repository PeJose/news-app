import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      light: {
        primary: colors.grey.darken3,
        secondary: colors.grey.darken3,
        accent: colors.green.darken1,
        accent1: colors.green.lighten4,
        error: colors.red.accent3,
        navbar: colors.shades.black,
        sheets: colors.shades.white,
        background: colors.grey.lighten1, // Not automatically applied
      },
      dark: {
        primary: colors.shades.black,
        secondary: colors.shades.black,
        accent: colors.green.darken4,
        accent1: colors.grey.darken1,
        error: colors.red.accent3,
        navbar: colors.green.darken4,
        sheets: colors.grey.darken4,
        background: colors.grey.darken5, // Not automatically applied
      },
    },
  },
});
