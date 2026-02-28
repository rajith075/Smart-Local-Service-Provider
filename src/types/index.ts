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
  distance: number;
  avatar: string;
  about: string;
  completedJobs: number;
  availability: string[];
  categoryId: string;
}

export interface Booking {
  id: string;
  providerId: string;
  userId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
}

export interface BookingState {
  bookings: Booking[];
  currentBooking: Partial<Booking> | null;
  addBooking: (booking: Booking) => void;
  setCurrentBooking: (booking: Partial<Booking>) => void;
  clearCurrentBooking: () => void;
}