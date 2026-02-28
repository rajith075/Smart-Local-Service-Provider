
import { create } from 'zustand';
import { Booking, BookingState } from '@/types/provider';

const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  currentBooking: null,
  
  addBooking: (booking: Booking) => 
    set((state) => ({ 
      bookings: [...state.bookings, booking] 
    })),
    
  setCurrentBooking: (booking: Partial<Booking>) => 
    set({ currentBooking: booking }),
    
  clearCurrentBooking: () => 
    set({ currentBooking: null })
}));

export default useBookingStore;
