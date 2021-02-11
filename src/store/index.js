import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  WATCHLIST_NAME: "news_watchlist",
  currentArticle: {},
  currentCategory: null,
  articles: [],
  watchlist: [],
  categories: [
    { id: "politics", name: "Politics", color: "blue" },
    { id: "sport", name: "Sport", color: "green" },
    { id: "music", name: "Music", color: "purple lighten-2" },
    { id: "us-news", name: "US News", color: "light-blue darken-4" },
    { id: "books", name: "Books", color: "red lighten-1" },
    { id: "money", name: "Money", color: "yellow darken-2" },
  ],
  page: 1,
};
const getters = {
  Articles: (state) => {
    return state.articles;
  },
  CurrentArticle: (state) => {
    return state.currentArticle;
  },
  Categories: (state) => {
    return state.categories;
  },
  CurrentCategory: (state) => {
    return state.currentCategory;
  },
  Watchlist: (state) => {
    return state.watchlist;
  },
};
const mutations = {
  save_articles(state, articles) {
    state.articles = articles;
  },
  set_current_article(state, article) {
    state.currentArticle = article;
  },
  change_page(state, page) {
    state.page = page;
  },
  change_category(state, category) {
    state.currentCategory = category;
  },
};
const actions = {
  async getArticles({ commit }) {
    let url =
      "https://content.guardianapis.com/search?api-key=test&show-fields=bodyText,thumbnail&show-blocks=all&page=" +
      state.page;
    if (state.currentCategory !== null) {
      url += "&section=" + state.currentCategory.id;
    }
    await axios
      .get(url)
      .then((result) => {
        commit("save_articles", result.data.response.results);
        commit("change_page", result.data.response.currentPage);
      })
      .catch((error) => console.log(error));
  },
  async getArticle({ commit }, apiUrl) {
    let url =
      apiUrl + "?api-key=test&show-fields=bodyText,thumbnail&show-blocks=all";
    await axios
      .get(url)
      .then((result) => {
        commit("set_current_article", result.data.response.content);
      })
      .catch((error) => console.log(error));
  },
  saveToWatchlist({ state, dispatch }, permalink) {
    dispatch("getWatchlist");
    state.watchlist.push(permalink);
    localStorage[state.WATCHLIST_NAME] = JSON.stringify(state.watchlist);
  },
  deleteFromWatchlist({ state, dispatch }, id) {
    dispatch("getWatchlist");
    state.watchlist.splice(id, 1);
    localStorage[state.WATCHLIST_NAME] = JSON.stringify(state.watchlist);
  },
  getWatchlist({ state }) {
    if (localStorage.getItem(state.WATCHLIST_NAME) !== null) {
      state.watchlist = JSON.parse(localStorage.getItem(state.WATCHLIST_NAME));
    }
  },
};

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
