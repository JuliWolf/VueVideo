import Vue from 'vue'
import Vuex from 'vuex'

import video from './video/video.js'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    video
  }
})
