import axios from 'axios';
 
const API_URL = 'http://localhost:3001/movies';
 
/*export const fetchMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};*/
 
export const createMovie = async (movie) => {
  const response = await axios.post(API_URL, movie);
  return response.data;
};
 
export const updateMovie = async (id, movie) => {
  const response = await axios.put(`${API_URL}/${id}`, movie);
  return response.data;
};
 
export const deleteMovie = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchMovies = async (id) => {
    id = id || '';
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  };
  