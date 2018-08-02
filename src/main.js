import Vue from 'vue'
import App from './App.vue'

import {store} from './store'

// import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap.js'

import {router} from "./routes";
import axios from 'axios'

import {AUTH_TOKEN_HEADER} from './store/actions/auth'


// Аутентификация пользователя в axios, если в localstorage есть токкен
const token = localStorage.getItem('user-token');
if (token) {
  axios.defaults.headers.common[AUTH_TOKEN_HEADER] = 'Bearer ' + token;
  console.log('axios = ', axios.defaults.headers);
}

new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App)
}).$mount('#app');

