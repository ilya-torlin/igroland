import Vue from 'vue'

//todo: Сделать массив аллертов (очередь)

const state = {
  succesAlert: {
    msg: 'Всё хорошо',
    show: false
  },
  errorAlert: {
    msg: 'Чёт пошло не так!',
    show: false
  }
};

const getters = {
  succesAlert: state => state.succesAlert,
  errorAlert: state => state.errorAlert,
};

const mutations = {
  setSuccesAlertMsg(state, payload){
    state.succesAlert.msg = payload;
  },
  setErrorAlertMsg(state, payload){
    state.errorAlert.msg = payload;
  },
  setSuccesAlertShow(state, payload){
    if (payload === true){
      setTimeout(()=>{ state.succesAlert.show = false }, 5000);
    }
    state.succesAlert.show = payload;
  },
  setErrorAlertShow(state, payload){
    if (payload === true){
      setTimeout(()=>{ state.errorAlert.show = false }, 5000);
    }
    state.errorAlert.show = payload;
  }
};

const actions = {

};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
