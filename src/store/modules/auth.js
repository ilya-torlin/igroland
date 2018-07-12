/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'

import axios from 'axios'

const state = { token: localStorage.getItem('user-token') || '', status: '', hasLoadedOnce: false }

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
};

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      axios({url: 'http://igroland-api.praweb.ru/login', data: user, method: 'POST' })
        .then(resp => {
          const error = resp.data.error;
          console.log('Lol kek', resp);
          if(error){
            commit(AUTH_ERROR, resp.data);
            localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
            reject(resp.data);
          }else {
            const token = resp.data.data.token;
            localStorage.setItem('user-token', token); // store the token in localstorage
            commit(AUTH_SUCCESS, token);
            // you have your token, now log in your user :)

            // dispatch( `user/${USER_REQUEST}`);
            resolve(resp);
          }
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
          reject(err);
        });
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem('user-token');
      resolve();
    })
  }
};

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success';
    state.token = resp;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error';
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = '';
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
