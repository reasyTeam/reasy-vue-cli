import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);



export default new Vuex.Store({
  modules: {
  },
  state: {
    count: 0,
    global: {
      mode: "ap"
    }
  },
  mutations: {
    increment(state) {
      state.count++;

    },
    getMode(state, mode) {
      state.global.mode = mode;
    },
    count(state) {
      return state.count;
    }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
    getMode({ state, commit }, mode) {
      commit('getMode', mode);
    },
  }
});