import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user'
import Vue from 'vue'
import {AUTH_ERROR, AUTH_LOGOUT, AUTH_REQUEST, AUTH_SUCCESS} from '../actions/auth'
import axios from 'axios'
import {API_URL} from '../../constants'

//phone, name, site, surname, lastName, applicationList

const state = {
  logedIn: false,//Пользователь авторизован, с бекенда отправлять false
  name: '', // Имя пользователя
  role: '',//'права' пользователя
  avatar: 'src/assets/img/avatar.png',//аватарка
  id: 0, // id
  status: '', //для работы авторизиции, с бекенда отправлять просто как пустой атрибут
  applicationList: '',//список ид приложений у пользователя
  profile: {
    email: '', // email
    site: '', //сайт пользователя
    phone: '', // телефон
    surname: '', // фамилия
    patronymic: '', // отчество
    login: '', // login
    blocked: false, // заблокирован
  },
};

const getters = {
  logedIn: state => state.logedIn,
  name: state => state.name,
  role: state => state.role,
  avatar: state => state.avatar,
  profile: state => state.profile,
  id: state => state.id,
  isProfileLoaded: state => !!state.profile.email,
  status: state => state.status,
};

const mutations = {
  setHeaderStatus(state, status){
    state.showHeader = typeof(status) === "boolean" ? state.showHeader = status : state.showHeader;
  },
  setlogedIn(state, status){
    state.logedIn = typeof(status) === "boolean" ? state.logedIn = status : state.logedIn;
  },
  logOut(state){
    state.logedIn = false;
  },
  setName(state, value){
    state.name = value;
  },
  setRole(state, value){
    state.role = value;
  },
  setAvatar(state, value){
    state.avatar = value;
  },
  setId(state, value){
    state.id = value;
  },
  setApplicationList(state, value){
    state.applicationList = value;
  },
  setProfile(state, value){
    state.profile = value;
  },
  [USER_REQUEST]: (state, userData) => {
    state.status = 'loading';
    console.log('USER_REQUEST = ', userData);
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success';
    // Vue.set(state, 'profile', resp);
  },
  [USER_ERROR]: (state) => {
    state.status = 'error';
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {}
  }
};

const actions = {
  //запрос информации о пользователе, вызывать при перезагрузке страницы и после авторизации пользователя
  [USER_REQUEST]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST, 'USER_REQUEST');
      axios({url: API_URL + '/user/me', data: {}, method: 'GET' })
        .then(resp => {
          const error = resp.data.error;
          if(error){
            commit(USER_ERROR);
            reject(resp.data);
          }else {
            console.log('user is: ',  resp.data.data);
            let userData = resp.data.data;

            let emailData = userData.email ? userData.email : '',
                profile = {
                  email: emailData, // email
                  site: userData.site ? userData.site : '', //сайт пользователя
                  phone: userData.phone ? userData.phone : '', // телефон
                  surname: userData.surname ? userData.surname : '', // фамилия
                  patronymic: userData.patronymic ? userData.patronymic : '', // отчество
                  login: userData.login ? userData.login : '', // login
                  blocked: userData.isActive !== 1, // заблокирован
                };

            commit('setName', userData.name ? userData.name : '',); // !!! .name
            //commit('setRole', userData.role.name);
            commit('setRole', userData.role);
            commit('setAvatar', userData.image ? API_URL + userData.image.path : 'src/assets/img/avatar.png'); //
            commit('setId', userData.id);
            commit('setApplicationList', userData.applicationList ? userData.applicationList : '');
            commit('setProfile', profile);

            console.log('---=profileIs', profile);


            commit(USER_SUCCESS);
            resolve(resp);
          }
        })
        .catch(err => {
          commit(USER_ERROR);
          reject(err);
        });
    })
  },
  [AUTH_LOGOUT]:({commit}) => {
    commit(AUTH_LOGOUT);
  },
  USER_INFO: () => {
    return new Promise(resolve => {
      if(state.name !== ''){
        console.log('user isset',state.name);
        let result = {
          name : state.name,
          profile : state.profile
        };
        resolve(result);
      }
    });
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
