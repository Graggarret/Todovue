import Vue from 'vue'
import Vuex from 'vuex'
import Tasks from './Tasks'
import Links from './Links'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Tasks,
    Links
  }
})
