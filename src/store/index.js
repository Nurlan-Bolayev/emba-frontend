import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin: null,
  },
  mutations: {
    setAdmin(state, admin) {
      state.admin = admin
    }
  },
  actions: {
    async fetchUser({commit}) {
      try {
        const res = await axios.get('api/admin/user')
        commit('setAdmin', res.data)
      } catch (e) {
        // ignore
      }
    }
  },
  modules: {}
})
