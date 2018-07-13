/* eslint-disable promise/param-names */
import { REGISTER_REQUEST, REGISTER_ERROR, REGISTER_SUCCESS, REGISTER_LOGOUT } from '../actions/REGISTER'
import { USER_REQUEST } from '../actions/user'
import {API_URL} from '../../constants'

import axios from 'axios'

const state = {
  status: ''
};

const getters = {
  regStatus: state => state.status,
};

const actions = {
  [REGISTER_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(REGISTER_REQUEST);
      axios({url: API_URL+'/login', data: user, method: 'POST' })
        .then(resp => {
          const error = resp.data.error;
          console.log('Lol kek', resp);
          if(error){
            commit(REGISTER_ERROR, resp.data);
            localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
            reject(resp.data);
          }else {
            const token = resp.data.data.token;
            localStorage.setItem('user-token', token); // store the token in localstorage
            commit(REGISTER_SUCCESS, token);
            // you have your token, now log in your user :)

            // dispatch( `user/${USER_REQUEST}`);
            resolve(resp);
          }
        })
        .catch(err => {
          commit(REGISTER_ERROR, err);
          localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
          reject(err);
        });
    })
  },
  [REGISTER_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(REGISTER_LOGOUT);
      localStorage.removeItem('user-token');
      resolve();
    })
  }
};

const mutations = {
  [REGISTER_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [REGISTER_SUCCESS]: (state, resp) => {
    state.status = 'success';
    state.token = resp;
    state.hasLoadedOnce = true;
  },
  [REGISTER_ERROR]: (state) => {
    state.status = 'error';
    state.hasLoadedOnce = true;
  },
  [REGISTER_LOGOUT]: (state) => {
    state.token = '';
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
