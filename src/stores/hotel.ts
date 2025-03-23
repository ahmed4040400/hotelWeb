import { defineStore } from 'pinia';
import { hotelService } from '../services/api';

interface Hotel {
  id?: number;
  name: string;
  image: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  price: string;
}

interface HotelState {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  loading: boolean;
  error: string | null;
}

export const useHotelStore = defineStore('hotel', {
  state: (): HotelState => ({
    hotels: [],
    selectedHotel: null,
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchHotels() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await hotelService.getAllHotels();
        this.hotels = response.data;
        return { success: true };
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch hotels';
        return { 
          success: false, 
          message: this.error
        };
      } finally {
        this.loading = false;
      }
    },
    
    async fetchHotelById(id: number) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await hotelService.getHotelById(id);
        this.selectedHotel = response.data;
        return { success: true };
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch hotel';
        return { 
          success: false, 
          message: this.error
        };
      } finally {
        this.loading = false;
      }
    },
    
    async createHotel(hotelData: Hotel) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await hotelService.createHotel(hotelData);
        this.hotels.push(response.data);
        return { 
          success: true,
          hotel: response.data
        };
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to create hotel';
        return { 
          success: false, 
          message: this.error
        };
      } finally {
        this.loading = false;
      }
    },
    
    async updateHotel(id: number, hotelData: Partial<Hotel>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await hotelService.updateHotel(id, hotelData);
        const index = this.hotels.findIndex(h => h.id === id);
        if (index !== -1) {
          this.hotels[index] = response.data;
        }
        return { 
          success: true,
          hotel: response.data
        };
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to update hotel';
        return { 
          success: false, 
          message: this.error
        };
      } finally {
        this.loading = false;
      }
    },
    
    async deleteHotel(id: number) {
      this.loading = true;
      this.error = null;
      
      try {
        await hotelService.deleteHotel(id);
        this.hotels = this.hotels.filter(h => h.id !== id);
        return { success: true };
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to delete hotel';
        return { 
          success: false, 
          message: this.error
        };
      } finally {
        this.loading = false;
      }
    }
  }
});