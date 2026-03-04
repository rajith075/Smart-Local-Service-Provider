export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  providerCount: number;
}

export interface Provider {
  id: string;
  name: string;
  profession: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  distance: number; // in km
  avatar: string;
  about: string;
  completedJobs: number;
  availability: string[];
  categoryId: string;
}

export interface Booking {
  id: string;
  providerId: string;
  userName: string;
  userPhone: string;
  service: string;
  bookingDate: string;
  bookingTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;

  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
  setCurrentBooking: (booking: Partial<Booking>) => void;
  clearCurrentBooking: () => void;
}