import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//!!! Добавлять все изменения в googleDocs

/**
* @param {boolean} showHeader
*
* */

export const store = new Vuex.Store({
  state: {
    //при добавлении нового атрибута прописать getters and mutations
    showHeader: false, // вынести в vueEx
    logedIn: false,
    config: { //Конфигурация приложения, роуты
      loginRoute: '/dashboard' // на какую страницу перенаправлять, после авторизации
    }
    //в компоненте:
    // Создать computed hideHeader(){return this.$store.state.hideHeader; }
    // Или использовать import {mapGetters} from 'vuex'
  },
  getters: {
    showHeader(state){
      return state.showHeader;
    },
    logedIn(state){
      return state.logedIn;
    }
  },
  mutations:{
    setHeaderStatus(state, status){
      state.showHeader = typeof(status) === "boolean" ? state.showHeader = status : state.showHeader;
    },
    setlogedIn(state, status){
      state.logedIn = typeof(status) === "boolean" ? state.logedIn = status : state.logedIn;
    }
  },
  actions: {
    //Добавить actions
  },
  strict: process.env.NODE_ENV !== 'production' // строгий режим, только для режима разработки, отслеживает, что бы state не изменялся напрямую, т.е. state можно менять только при помощи мутаций
});
