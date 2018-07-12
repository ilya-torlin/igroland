import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user'
import Vue from 'vue'
import { AUTH_LOGOUT } from '../actions/auth'

// const state = { status: '', profile: {} }

const state = {
  logedIn: false,//Пользователь авторизован
  name: 'MrAmiD', // Имя пользователя
  role: 'Ninja',//'права' пользователя
  avatar: 'src/assets/img/avatar.png',//аватарка
  status: '',
  profile: {}
};

const getters = {
  logedIn: state => state.logedIn,
  name: state => state.name,
  role: state => state.role,
  avatar: state => state.avatar,
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
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
  [USER_REQUEST]: (state, userData) => {
    state.status = 'loading';
    console.log('mutationsData = ', userData);
  },
    [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp)
  },
    [USER_ERROR]: (state) => {
    state.status = 'error'
  },
    [AUTH_LOGOUT]: (state) => {
    state.profile = {}
  }
}

const actions = {
  [USER_REQUEST]: ({commit, dispatch}) => {
    commit(USER_REQUEST);
    // console.log('USER req action here', dispatch);
    //commit(USER_SUCCESS, resp)

    // apiCall({url: 'user/me'})
    //   .then(resp => {
    //     commit(USER_SUCCESS, resp)
    //   })
    //   .catch(resp => {
    //     commit(USER_ERROR)
    //     // if resp is unauthorized, logout, to
    //     dispatch(AUTH_LOGOUT)
    //   })
  },
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
