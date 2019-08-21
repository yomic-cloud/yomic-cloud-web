import Vue from 'vue'
import Vuex from 'vuex'
import { namespace } from 'vuex-class'

import app from './modules/app'
import dict from './modules/dict'

Vue.use(Vuex)

export const AppModule = namespace('app')
export const DictModule = namespace('dict')

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    app,
    dict
  }
})
