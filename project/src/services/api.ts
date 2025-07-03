import axios from 'axios';
import { User, CarListing } from '../App';

const API_BASE_URL = 'http://localhost:8000'; // PHP development server URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User Authentication APIs
export const registerUser = async (userData: User & { password: string }): Promise<{ success: boolean; message: string; user?: Partial<User> }> => {
  try {
    console.log('Attempting registration with:', { ...userData, password: '[REDACTED]' });
    const response = await api.post('/register.php', userData);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error);
    const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
    return {
      success: false,
      message: errorMessage
    };
  }
};

export const loginUser = async (username: string, password: string): Promise<{ success: boolean; user?: User; token?: string; message: string }> => {
  try {
    console.log('Attempting login with:', { username, password });
    const response = await api.post('/login.php', { username, password });
    console.log('Login response:', response.data);
    
    // Store token if login successful
    if (response.data.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed. Please try again.'
    };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('authToken');
};

// Car Listing APIs
export const fetchCarListings = async (): Promise<CarListing[]> => {
  const response = await api.get('/cars.php');
  return response.data;
};

export const addCarListing = async (carData: Omit<CarListing, 'id'>): Promise<{ success: boolean; car?: CarListing; message: string }> => {
  const response = await api.post('/add-car.php', carData);
  return response.data;
};

export const searchCars = async (filters: any): Promise<CarListing[]> => {
  const response = await api.post('/search-cars.php', filters);
  return response.data;
};

export interface CarDetails extends CarListing {
  seller_name: string;
  seller_phone: string;
  seller_email: string;
}

export const getCarDetails = async (carId: string): Promise<{ success: boolean; car?: CarDetails; message?: string }> => {
  try {
    const response = await api.get(`/get-car-details.php?id=${carId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching car details:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch car details'
    };
  }
};