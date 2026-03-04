import { create } from "zustand";
import { Booking, BookingState } from "@/types/provider";

const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  currentBooking: null,

  addBooking: (booking: Booking) =>
    set((state) => ({
      bookings: [...state.bookings, booking],
    })),

  removeBooking: (id: string) =>
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== id),
    })),

  setCurrentBooking: (booking: Partial<Booking>) =>
    set((state) => ({
      currentBooking: {
        ...(state.currentBooking || {}),
        ...booking,
      } as Booking,
    })),

  clearCurrentBooking: () =>
    set({
      currentBooking: null,
    }),
}));

export default useBookingStore;