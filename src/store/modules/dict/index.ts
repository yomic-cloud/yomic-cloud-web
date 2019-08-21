import { Module } from 'vuex'

class DictState {

}

const dict: Module<DictState, any> = {
  namespaced: true,
  state: new DictState(),
  mutations: {},
  getters: {},
  actions: {}
}

export default dict
