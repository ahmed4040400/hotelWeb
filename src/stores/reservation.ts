import { defineStore } from 'pinia';
import { reservationService } from '../services/api';

interface Reservation {
  id?: number;
  userId?: number;
  hotelId: number;
  checkIn: string;
  checkOut: string;
  price: string;
  status?: string;
  Hotel?: any;
  User?: any;
}

interface ReservationState {
  reservations: Reservation[];
  myReservations: Reservation[];
  selectedReservation: Reservation | null;
  loading: boolean;
  error: string | null;
}

export const useReservationStore = defineStore('reservation', {
  state: (): ReservationState => ({
    reservations: [],
    myReservations: [],
    selectedReservation: null,
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchAllReservations() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await reservationService.getAllReservations();
        this.reservations = response.data;
        return { success: true };
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch reservations';
        return { 
          success: false, 
          message: this.error
        };
      } finally {
        this.loading = false;
      }
    },
    
    async fetchMyReservations() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await reservationService.getMyReservations();
        this.myReservations = response.data;
        return { success: true };
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch your reservations';
        return { 
          success: false, 
          message: this.error
        };
      } finally {
        this.loading = false;
      }
    },
    
    async fetchReservationById(id: number) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await reservationService.getReservationById(id);
        this.selectedReservation = response.data;
        return { success: true };
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch reservation';
        return { 
          success: false, 
          message: this.error
        };
      } finally {
        this.loading = false;
      }
    },
    
    async createReservation(reservationData: Reservation) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await reservationService.createReservation(reservationData);
        this.myReservations.push(response.data);
        return { 
          success: true,
          reservation: response.data
        };
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to create reservation';
        return { 
          success: false, 
          message: this.error
        };
      } finally {
        this.loading = false;
      }
    },
    
    async updateReservationStatus(id: number, status: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await reservationService.updateReservationStatus(id, status);
        
        // Update in all reservations list
        const index = this.reservations.findIndex(r => r.id === id);
        if (index !== -1) {
          this.reservations[index] = response.data;
        }
        
        // Update in my reservations list
        const myIndex = this.myReservations.findIndex(r => r.id === id);
        if (myIndex !== -1) {
          this.myReservations[myIndex] = response.data;
        }
        
        // Update selected reservation if it's the same one
        if (this.selectedReservation?.id === id) {
          this.selectedReservation = response.data;
        }
        
        return { 
          success: true,
          reservation: response.data
        };
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to update reservation';
        return { 
          success: false, 
          message: this.error
        };
      } finally {
        this.loading = false;
      }
    },
    
    async deleteReservation(id: number) {
      this.loading = true;
      this.error = null;
      
      try {
        await reservationService.deleteReservation(id);
        this.reservations = this.reservations.filter(r => r.id !== id);
        this.myReservations = this.myReservations.filter(r => r.id !== id);
        return { success: true };
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to delete reservation';
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