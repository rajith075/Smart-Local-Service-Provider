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
  avatar: string;   // image path
  about: string;
  completedJobs: number;
  availability: string[]; // ["Mon", "Tue", ...]
  categoryId: string;
}