import Vue from 'vue'

const state = {
  /*{
   msg: 'Всё хорошо',
   show: false
},*/
  succesAlert: [
  ],
  errorAlert: [
  ]
};

const getters = {
  succesAlert: state => state.succesAlert,
  errorAlert: state => state.errorAlert,
};

const mutations = {
  setSuccessAlertMsg(state, payload){
    state.succesAlert.push(payload);
  },
  setErrorAlertMsg(state, payload){
    state.errorAlert.push(payload);
  },
  setSuccessAlertShow(state){
    state.succesAlert.pop();
  },
  setErrorAlertShow(state){
    state.errorAlert.pop();
  }
};

const actions = {
  setSuccessAlertMsg({commit, dispatch},message){
    return new Promise((resolve) => {
      let payload = {
        msg: message,
        show: true
      };
      commit('setSuccessAlertMsg',payload);
      setTimeout(()=>{
        commit('setSuccessAlertShow');
      }, 5000);
      resolve();
    });

  },
  setErrorAlertMsg({commit, dispatch},message) {
    return new Promise((resolve) => {
      let payload = {
        msg: message,
        show: true
      };
      commit('setErrorAlertMsg', payload);
      setTimeout(() => { commit('setErrorAlertShow'); }, 5000);
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
