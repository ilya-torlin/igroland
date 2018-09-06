//todocomplete: Переработать структуру, изменить header.vue
export default {
  namespaced: true,
  state:{
    items: [
      /*
      * url: { name: 'user' } - имя маршрута в routers.js
      * admin: 0 - пункт меню не доступен пользователю
      * */
      {
        url: { name: 'dashboard' },
        text: 'DashBoard',
        admin: 0
      },
      {
        url: { name: 'catalog' } ,
        text: 'Каталоги',
        admin: 1
      },
      {
        url: { name: 'provider' } ,
        text: 'Поставщики',
        admin: 0
      },
      {
        url: { name: 'users' } ,
        text: 'Пользователи',
        admin: 0
      },
      {
        url: { name: 'applications' },
        text: 'Приложения',
        admin: 1
      }
    ]
  },
  getters:{
    items: state => state.items,
  },
  mutations: {

  },
  actions: {

  }
}
