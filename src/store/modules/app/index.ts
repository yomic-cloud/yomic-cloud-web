import { Module } from 'vuex'

class AppState {
  expand: boolean = true
}

const app: Module<AppState, any> = {
  namespaced: true,
  state: new AppState(),
  mutations: {
    setExpand (state: AppState, expand: boolean) {
      state.expand = expand
    }
  },
  getters: {},
  actions: {}
}

export default app
