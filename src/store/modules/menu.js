export default {
  namespaced: true,
  state:{
    items: [
      {
        url: '/dashboard',
        text: 'DashBoard'
      },
      {
        url: '/catalog',
        text: 'Каталоги'
      },
      {
        url: '/provider',
        text: 'Поставщики'
      },
      {
        url: '/users',
        text: 'Пользователи'
      },
      {
        url: '/attachments',
        text: 'Приложения'
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
