import Vue from 'vue'

//todo: Сделать массив аллертов (очередь)

const state = {
  succesAlert: [
    // {
    //   msg: 'Всё хорошо',
    //   show: false
    // },
  ],
  errorAlert: [
    // {
    //   msg: 'Чёт пошло не так!',
    //   show: false
    // }
  ]
};

const getters = {
  succesAlert: state => state.succesAlert,
  errorAlert: state => state.errorAlert,
};

const mutations = {
  setSuccessAlertMsg(state, payload){
    let message = {
        msg: payload,
        show: false
    };
    state.succesAlert.push(message);
    // возвращаем индекс алерта
    //return state.succesAlert.length - 1;
  },
  setErrorAlertMsg(state, payload){
    let message = {
      msg: payload,
      show: false
    };
    state.errorAlert.push(message);
  },
  setSuccessAlertShow(state, payload){
    let length = state.succesAlert.length - 1;
    if (payload === true){
      setTimeout(()=>{
        state.succesAlert[length].show = false;
        //state.succesAlert.shift();
      }, 5000);
    }
    state.succesAlert[length].show = payload;
  },
  setErrorAlertShow(state, payload){
    let length = state.errorAlert.length - 1;
    if (payload === true){
      setTimeout(()=>{
        state.errorAlert[length].show = false;
        //state.errorAlert.shift();
        console.log(state.errorAlert);
      }, 5000);
    }
    state.errorAlert[length].show = payload;
  }
};

const actions = {
  setSuccessAlertMsg({commit, dispatch},message){
    return new Promise((resolve,reject) => {

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
