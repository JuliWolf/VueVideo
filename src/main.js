import Vue from 'vue'
import axios from 'axios';
import App from './App.vue'
import router from './router'
import store from './store'
import VueLocalStorage from 'vue-localstorage'

import './assets/css/tailwind.css';
Vue.use(VueLocalStorage);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
