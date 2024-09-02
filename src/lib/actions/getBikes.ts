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
    console.error('Error fetching bikes theft data:', error);
    throw error;
  }
};

export const fetchFilteredBikeThefts = async (
  page: number,
  titleFilter: string,
  startDate: string,
  endDate: string
) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        page: page,
        per_page: 10,
        location: 'Munich',
        distance: 100,
        stolenness: 'proximity',
        query: titleFilter,
        occurred_before: startDate ? new Date(startDate).getTime() / 1000 : undefined,
        occurred_after: endDate ? new Date(endDate).getTime() / 1000 : undefined,
      },
    });
    return response.data.bikes;
  } catch (error) {
    console.error('Error fetching filtered bike theft data:', error);
    throw error;
  }
};


export const fetchBikeDetails = async (bikeId: number) => {
  try {
    const response = await axios.get(`https://bikeindex.org/api/v3/bikes/${bikeId}`);
    return response.data.bike;
  } catch (error) {
    console.error('Error fetching bike theft data:', error);
    throw error;
  }
};