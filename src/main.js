import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap.js'



Vue.use(VueRouter);

/* libs:
* 1. Drag&Drop files
* 2. Context menu?
* 3. 
* */

//import components
//todo: Сделать локальную регистрацию Компонентов?
import appLogin from './components/login.vue'
import appSignup from './components/SignUp.vue'
import appDashboard from './components/dashboard.vue'
import appCatalog from './components/catalog.vue'
import appProvider from './components/provider.vue' 
import appAttachments from './components/attachments.vue'
import appUiKit from './components/ui-kit.vue'
import appProfileConfig from './components/profileConfig.vue'

//register components
Vue.component('appLogin', appLogin);//
Vue.component('appSignup', appSignup);//
Vue.component('appDashboard', appDashboard);// Доска
Vue.component('appCatalog', appCatalog);// Каталог
Vue.component('appProvider', appProvider);// Поставщики
Vue.component('appAttachments', appAttachments);// Приложеня
Vue.component('appUiKit', appUiKit);// ui-kit
Vue.component('appProfileConfig', appProfileConfig);// ui-kit

//todo: routes перенести в папку jsModules
//Определяем маршруты
const routes = [
  { path: '/login', component: appLogin },
  { path: '/signup', component: appSignup},
  { path: '/dashboard', component: appDashboard},
  { path: '/catalog', component: appCatalog},
  { path: '/provider', component: appProvider},
  { path: '/attachments', component: appAttachments},
  { path: '/profileconfig', component: appProfileConfig}
];

//Создаём экземпляр маршрутизатора и передаём маршруты в опции `routes`
const router = new VueRouter({
  routes: routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app');

