import { createStore } from "vuex";
export default createStore({
  state: {
    showLoginModal: false,
    isLogin: false
  },
  mutations: {
    setLoginMadalMutation(state,value) {
      state.showLoginModal = value
    },
    setIsLogin(state, value) {
      state.isLogin = value
    }
  },
  actions: {
    setIsLogin(context,value) {
      context.commit('setLoginMadalMutation', value)
    },
  },
  modules: {}
});