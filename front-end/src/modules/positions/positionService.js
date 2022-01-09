import axios from 'axios';

export default {

  async getPositions(dates) {
    // let result
    // if (dates) {
    //   result = await axios.get(`/positions?from=${dates.from}&to=${dates.to}`);
    // } else {
    //   result = await axios.get('/positions');
    // }
    const result = await axios.get('/positions', {
      params: {
        from: dates?.from,
        to: dates?.to
      }
    });
    return result.reverse();
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
