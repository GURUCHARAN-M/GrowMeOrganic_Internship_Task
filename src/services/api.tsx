import axios from 'axios';

const BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export const fetchArtworks = async (page: number) => {
  const response = await axios.get(`${BASE_URL}?page=${page}`);
  return response.data;
};
