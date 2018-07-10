export default {
  namespaced: true,
  state:{
    showHeader: false, // вынести в vueEx
  },
  getters:{
    showHeader: state => state.showHeader,
  },
  mutations: {
    setHeaderStatus(state, status){
      state.showHeader = typeof(status) === "boolean" ? state.showHeader = status : state.showHeader;
    }
  },
  actions: {

  }
}
