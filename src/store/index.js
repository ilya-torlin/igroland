import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//!!! Добавлять все изменения в googleDocs
/**
* @param {boolean} showHeader
*
* */

import menu from './modules/menu'
import config from './modules/config'
import user from './modules/user'
//todo: разделить склад на модули!

export const store = new Vuex.Store({
  //при добавлении нового атрибута в модулях, прописать getters and mutations
  //в компоненте:
  // Создать computed hideHeader(){return this.$store.state.hideHeader; }
  // Или использовать import {mapGetters} from 'vuex'

  //все мутации и гетеры прописываем в модуле, сюда напрямую ничего не пишем!
  modules:{
    menu, // меню
    config,//конфиги приложения
    user // Информация о пользователе
  },
  strict: process.env.NODE_ENV !== 'production' // строгий режим, только для режима разработки, отслеживает, что бы state не изменялся напрямую, т.е. state можно менять только при помощи мутаций
});
