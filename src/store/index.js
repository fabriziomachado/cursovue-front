import Vue from 'vue'
import Vuex from 'vuex'

import profile from './profile'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    profile
  },

})

export default store
