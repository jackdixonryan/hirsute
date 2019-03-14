import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameData: null,
  },
  getters: {
    gameData: state => {
      return state.gameData;
    }
  },
  mutations: {
    addGame (state, gameData) {
      state.gameData = gameData;
    }
  },
  actions: {

  }
})
