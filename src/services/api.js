import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

const getAll = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const create = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const update = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const remove = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
