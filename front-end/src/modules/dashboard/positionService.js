import axios from 'axios';

export default {

  async getPositions() {
    return await axios.get('/positions');
  },

  async getPositionById(id) {
    return await axios.get(`/positions/${id}`);
  },

  async createPosition(data) {
    return await axios.post(`/positions`, data);
  },

  async updatePosition(data, id) {
    return await axios.put(`/positions/${id}`, data);
  },

  async deletePosition(id) {
    return await axios.delete(`/positions/${id}`);
  },
  async deletePositions() {
    return await axios.delete(`/positions/`);
  }
}
