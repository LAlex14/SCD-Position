import axios from 'axios';
import store from "@/store";

export default {

  setToken(token) {
    localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.getItem('token');
  },

  async login(data, params) {
    let result = await axios.post('/login', data, {
      params,
    });
    let { token } = result.data;
    this.setToken(token);
    return result.data;
  },

  async getProfile() {
    let result = await axios.get('/restify/profile', {
      params: {
        related: 'groups'
      }
    });
    return result.data;
  },

  async updateProfile(data) {
    return axios.post(`/restify/profile`, data);
  },

  async register(data, params) {
    const requestData = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      account_name: data.account_name,
      subdomain: data.subdomain,
      password: data.password,
      password_confirmation: data.password,
    }
    const requestParams = {
      from: params.from,
      token: params.invitation,
    }
    let result = await axios.post('/register', requestData, {
      params: requestParams,
    });
    let { plainTextToken } = result;
    this.setToken(plainTextToken);
    return result;
  },

  async logout() {
    await axios.post('/logout')

    store.reset({
      self: true,
      modules: {
        route: {
          self: false 
        }
      }
    })

    localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
  },

  async resetPassword(data) {
    return axios.post('/resetPassword', data);
  },

  async confirmInvitation(token, data) {
    return axios.post(`/validate/invitation/${token}`, data);
  },

  async forgotPassword(data) {
    return axios.post('/forgotPassword', data);
  },
}
