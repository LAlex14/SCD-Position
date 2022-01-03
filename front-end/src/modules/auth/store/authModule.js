import AuthService from "@/modules/auth/services/AuthService.js";

import { error, notifications, notify } from '@/components/common/NotificationPlugin/index'

const state = () => ({
  user: { },
  isLoggedIn: false,
});

const mutations = {
  setUser(state, value) {
    state.user = value;
  },
  setLoggedIn(state, value) {
    state.isLoggedIn = value;
  },
};

const actions = {
  async login({ commit }, data) {
    try {
      const { user } = await AuthService.login(data);
      commit('setUser', user)
      commit('setLoggedIn', true);
    } catch (err) {
      if (![400, 401, 422].includes(err.response.status)) {
        error('An error occurred during login. Please try again or contact us')
      }
      throw err
    }
  },
  async register({ commit }, { data, params }) {
    try {
      const res = await AuthService.register(data, params)
      localStorage.setItem('token', res.token);
      commit('setLoggedIn', true);
      return {}
    } catch (err) {
      console.warn(err)
      throw err
    }
  },
  logout({ commit }) {
    commit('setLoggedIn', false);
    AuthService.logout();
  }
}

const getters = {
  userCan: (state, getters) => action =>  {
    return true
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
