import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to add the auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: (email: string, password: string) => {
    return apiClient.post('/users/login', { email, password });
  },
  register: (userData: any) => {
    return apiClient.post('/users/register', userData);
  },
  getUserProfile: () => {
    return apiClient.get('/users/profile');
  }
};

// Hotel services
export const hotelService = {
  getAllHotels: () => {
    return apiClient.get('/hotels');
  },
  getHotelById: (id: number) => {
    return apiClient.get(`/hotels/${id}`);
  },
  createHotel: (hotelData: any) => {
    return apiClient.post('/hotels', hotelData);
  },
  updateHotel: (id: number, hotelData: any) => {
    return apiClient.put(`/hotels/${id}`, hotelData);
  },
  deleteHotel: (id: number) => {
    return apiClient.delete(`/hotels/${id}`);
  }
};

// Reservation services
export const reservationService = {
  getAllReservations: () => {
    return apiClient.get('/reservations');
  },
  getMyReservations: () => {
    return apiClient.get('/reservations/myreservations');
  },
  getReservationById: (id: number) => {
    return apiClient.get(`/reservations/${id}`);
  },
  createReservation: (reservationData: any) => {
    return apiClient.post('/reservations', reservationData);
  },
  updateReservationStatus: (id: number, status: string) => {
    return apiClient.put(`/reservations/${id}`, { status });
  },
  deleteReservation: (id: number) => {
    return apiClient.delete(`/reservations/${id}`);
  }
};

export default {
  auth: authService,
  hotels: hotelService,
  reservations: reservationService
};