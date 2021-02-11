import Vue from "vue";
import App from "@/components/App.vue";
import vuetify from "@/plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import store from "@/store/index.js";
import axios from "axios";
import router from "./router";

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
