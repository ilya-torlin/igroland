import Vue from 'vue'
import App from './App.vue'

/* libs:
* 1. Drag&Drop files
* 2. Context menu?
* 3. 
* */


//import components
//todo: Сделать локальную регистрацию Компонентов?
import appLogin from './components/login.vue'
import appSignup from './components/SignUp.vue'


//register components

Vue.component('appLogin', appLogin);
Vue.component('appSignup', appSignup);

new Vue({
  el: '#app',
  render: h => h(App)
})
