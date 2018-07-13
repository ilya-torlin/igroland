/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_TOKEN_HEADER } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import {API_URL} from '../../constants'

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
      axios({url: API_URL + '/login', data: user, method: 'POST' })
        .then(resp => {
          const error = resp.data.error;
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
      axios({url: API_URL + '/login/logout', data: {}, method: 'POST' })
        .then(resp => {
          commit(AUTH_LOGOUT);
          localStorage.removeItem('user-token');
          resolve();
        })
        .catch(err => {
          // commit(AUTH_ERROR, err);
          localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
          commit(AUTH_LOGOUT);
          console.log('logout ERR');
          //todo: переделать, axios возвращает reject
          // Request header field token is not allowed by Access-Control-Allow-Headers in preflight response
          resolve();
          // reject(err);
        });
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
    axios.defaults.headers.common[AUTH_TOKEN_HEADER] = resp;
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
