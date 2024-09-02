import axios from 'axios';

const API_BASE_URL = 'https://bikeindex.org/api/v3/search';


export const fetchBikeThefts = async (page: number) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        page: page,
        per_page: 10,
        location: 'Munich',
        distance: 100,
        stolenness: 'proximity',
      },
    });
    return response.data.bikes;
  } catch (error) {
    console.error('Error fetching bike theft data:', error);
    throw error;
  }
};