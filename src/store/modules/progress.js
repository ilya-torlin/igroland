import Vue from 'vue'

const state = {
  progStateWidth: 0, // ширина прогрессбара
  progShow: false
};

const getters = {
  progStateWidth: state => state.progStateWidth,
  progShow: state => state.progShow,
};

const mutations = {
  setProgStateWidth(state, payload){
    state.progStateWidth = payload;
  },
  setProgShow(state, payload){
    state.progShow = payload;
  },
  stepOneActive(state){
    state.progShow = true;
    state.progStateWidth = 40;
  },
  stepTwoActive(state){
    state.progShow = true;
    state.progStateWidth = 90;
  },
  stepLastActive(state){
    state.progStateWidth = 100;
    state.progShow = false;
    setTimeout(()=>{ state.progStateWidth = 0; }, 1000);
  },
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
