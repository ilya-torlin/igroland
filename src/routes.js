//register components
import Vue from "vue";

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import appLogin from './components/login.vue'
import appSignup from './components/SignUp.vue'
import appDashboard from './components/dashboard.vue'
import appCatalog from './components/catalogconfig.vue'
import appCatalogList from './components/catalogList'
import appProvider from './components/provider.vue'
import appAttachments from './components/attachments.vue'
import appUiKit from './components/ui-kit.vue'
import appProfileConfig from './components/profileConfig.vue'
import appAuth from './components/auth.vue'
import appUsersList from './components/usersList'
import E404 from './components/E404'
import {store} from './store/index.js'

// Vue.component('appLogin', appLogin);//авторизация пользователя
// Vue.component('appSignup', appSignup);//регистрация пользователя
// Vue.component('appDashboard', appDashboard);// Доска
// Vue.component('appCatalog', appCatalog);// Каталог
// Vue.component('appProvider', appProvider);// Поставщики
// Vue.component('appAttachments', appAttachments);// Приложеня
// Vue.component('appUiKit', appUiKit);// ui-kit
// Vue.component('appProfileConfig', appProfileConfig);// ui-kit
// Vue.component('appAuth', appAuth);// Авторизация


//Для модуля авторизации
const ifNotAuthenticated = (to, from, next) => {
  console.log('---->NotAuthenticated');
  if (!store.getters.isAuthenticated) {
    store.commit('config/setHeaderStatus', false);
    next();
    return
  }
  next('/')
};

const ifAuthenticated = (to, from, next) => {
  console.log('---->Authenticated', store.getters.isAuthenticated);
  $('[data-toggle="tooltip"]').tooltip();
  if (store.getters.isAuthenticated) {
    store.commit('config/setHeaderStatus', true); // что бы была видна шапка для авторизованных пользователей
    next();
    return
  }
  next({name: 'auth'});
};



//Определяем маршруты
const routes = [
  // { path: '/login', component: appLogin, name: 'login' },
  { path: '/dashboard', component: appDashboard, name: 'dashboard', beforeEnter: ifAuthenticated},
  { path: '/catalogconfig/:id?', component: appCatalog, name: 'catalogconfig', beforeEnter: ifAuthenticated},
  { path: '/catalog/:page?', component: appCatalogList, name: 'catalog', beforeEnter: ifAuthenticated},
  { path: '/provider', component: appProvider, name: 'provider', beforeEnter: ifAuthenticated},
  { path: '/attachments', component: appAttachments, name: 'attachments', beforeEnter: ifAuthenticated},
  { path: '/profileconfig/:id?', component: appProfileConfig, name: 'profileconfig', beforeEnter: ifAuthenticated},
  { path: '/auth', component: appAuth, name: 'auth', beforeEnter: ifNotAuthenticated},
  { path: '/users/:page?', component: appUsersList, name: 'users', beforeEnter: ifAuthenticated},
  { path: '*', component: E404},
  { path: '/', redirect: {name: 'catalog'}}
];

//Создаём экземпляр маршрутизатора и передаём маршруты в опции `routes`
export const router = new VueRouter({
  routes: routes,
  // mode: 'history',
  // base: __dirname
});
