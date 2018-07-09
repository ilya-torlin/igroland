import Vue from 'vue'
import App from './App.vue'

import {store} from './store'

// import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap.js'

import {router} from "./routes";

/* libs:
* 1. Drag&Drop files
* 2. Context menu?
* 3.
* */
new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App)
}).$mount('#app');

