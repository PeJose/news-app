import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  WATCHLIST_NAME: "news_watchlist",
  currentArticle: {},
  currentCategory: null,
  watchlistCategory: null,
  watchlistSections: [],
  articles: [],
  watchlist: [],
  categories: [
    { id: "politics", name: "Politics", color: "blue" },
    { id: "sport", name: "Sport", color: "green" },
    { id: "music", name: "Music", color: "purple lighten-2" },
    { id: "us-news", name: "US News", color: "light-blue darken-3" },
    { id: "books", name: "Books", color: "red lighten-1" },
    { id: "money", name: "Money", color: "yellow darken-2" },
  ],
  defaultDates: { dateFrom: "2021-01-01", dateTo: "2021-02-12" },
  dateFrom: "2021-01-01",
  dateTo: "2021-02-12",
  searchPhrase: "",
  page: 1,
  pages: 1,
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
  WatchlistCategory: (state) => {
    return state.watchlistCategory;
  },
  Watchlist: (state) => {
    return state.watchlist;
  },
  WatchlistSections: (state) => {
    return state.watchlistSections;
  },
  CurrentPage: (state) => {
    return state.page;
  },
  Pages: (state) => {
    return state.pages;
  },
  DateFrom: (state) => {
    return state.dateFrom;
  },
  DateTo: (state) => {
    return state.dateTo;
  },
};
const mutations = {
  save_articles(state, articles) {
    state.articles = articles;
  },
  set_current_article(state, article) {
    state.currentArticle = article;
  },
  set_watchlist(state, watchlist) {
    state.watchlist = watchlist;
  },
  set_watchlist_sections(state, watchlistSections) {
    state.watchlistSections = watchlistSections;
  },
  change_page(state, page) {
    state.page = page;
  },
  change_pages(state, pages) {
    state.pages = pages;
  },
  change_category(state, category) {
    state.currentCategory = category;
  },
  change_watchlist_category(state, category) {
    state.watchlistCategory = category;
  },
  change_date(state, payload) {
    state[payload.target] = payload.date;
  },
  change_search(state, search) {
    state.searchPhrase = search;
  },
};
const actions = {
  async getArticles({ commit }) {
    let url =
      "https://content.guardianapis.com/search?api-key=test&show-fields=bodyText,thumbnail&page=" +
      state.page +
      "&from-date=" +
      state.dateFrom +
      "&to-date=" +
      state.dateTo;
    if (state.currentCategory !== null) {
      url += "&section=" + state.currentCategory.id;
    }
    if (state.searchPhrase !== "") {
      url += "&q=" + state.searchPhrase;
    }
    console.log(url);
    await axios
      .get(url)
      .then((result) => {
        commit("save_articles", result.data.response.results);
        commit("change_pages", result.data.response.pages - 1);
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
  async changeCategory({ commit, dispatch }, category) {
    commit("change_page", 1);
    commit("change_category", category);
    await dispatch("getArticles");
  },
  changeWatchlistCategory({ commit, dispatch }, category) {
    commit("change_watchlist_category", category);
    dispatch("getWatchlist");
  },
  saveToWatchlist({ state, dispatch }, article) {
    dispatch("getWatchlist");
    if (state.watchlist.findIndex((item) => item.url === article.url) === -1) {
      state.watchlist.push(article);
      localStorage[state.WATCHLIST_NAME] = JSON.stringify(state.watchlist);
    }
  },
  deleteFromWatchlist({ state, dispatch }, id) {
    let watchlist = [];
    if (localStorage.getItem(state.WATCHLIST_NAME) !== null) {
      watchlist = JSON.parse(localStorage.getItem(state.WATCHLIST_NAME));
    }
    watchlist.splice(id, 1);
    localStorage[state.WATCHLIST_NAME] = JSON.stringify(watchlist);
    dispatch("getWatchlist");
  },
  getWatchlist({ state, commit }) {
    let watchlist = [];
    let sections = [];
    if (localStorage.getItem(state.WATCHLIST_NAME) !== null) {
      watchlist = JSON.parse(localStorage.getItem(state.WATCHLIST_NAME));
      sections = watchlist
        .map((item) => item.category)
        .filter((value, index, array) => array.indexOf(value) === index);
    }
    if (state.watchlistCategory !== null) {
      watchlist = watchlist.filter(
        (item) => item.category === state.watchlistCategory.id
      );
      sections = sections.filter((item) => item === state.watchlistCategory.id);
    }
    commit("set_watchlist", watchlist);
    commit("set_watchlist_sections", sections);
  },
  async changeDates({ commit }, payload) {
    if (payload === null) {
      commit("change_date", {
        target: "dateFrom",
        date: state.defaultDates.dateFrom,
      });
      commit("change_date", {
        target: "dateTo",
        date: state.defaultDates.dateTo,
      });
    } else {
      commit("change_date", { target: "dateFrom", date: payload.dateFrom });
      commit("change_date", { target: "dateTo", date: payload.dateTo });
    }
  },
};

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
});
