
export default {
  namespaced: true,
  state:{
    logedIn: true,//Пользователь авторизован
    tokken: 'fg4u89br9girt945iboi', // Токкен
    name: 'MrAmiD', // Имя пользователя
    role: 'Ninja',//'права' пользователя
    avatar: 'src/assets/img/avatar.png'//аватарка
  },
  getters:{
    logedIn: state => state.logedIn,
    tokken: state => state.tokken,
    name: state => state.name,
    role: state => state.role,
    avatar: state => state.avatar,
  },
  mutations: {
    setHeaderStatus(state, status){
      state.showHeader = typeof(status) === "boolean" ? state.showHeader = status : state.showHeader;
    },
    setlogedIn(state, status){
      state.logedIn = typeof(status) === "boolean" ? state.logedIn = status : state.logedIn;
    },
    logOut(state){
      state.logedIn = false;
    }
  },
  actions: {

  }
}
