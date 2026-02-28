import { ServiceCategory, Provider } from '@/types';

export const categories: ServiceCategory[] = [
  {
    id: '1',
    name: 'Home Cleaning',
    icon: '🧹',
    description: 'Professional cleaning services for your home',
    providerCount: 24
  },
  {
    id: '2',
    name: 'Plumbing',
    icon: '🔧',
    description: 'Expert plumbers for all your needs',
    providerCount: 18
  },
  {
    id: '3',
    name: 'Electrical',
    icon: '⚡',
    description: 'Licensed electricians for repairs and installations',
    providerCount: 15
  },
  {
    id: '4',
    name: 'Painting',
    icon: '🎨',
    description: 'Interior and exterior painting services',
    providerCount: 12
  },
  {
    id: '5',
    name: 'Carpentry',
    icon: '🔨',
    description: 'Skilled carpenters for furniture and repairs',
    providerCount: 10
  },
  {
    id: '6',
    name: 'Moving',
    icon: '📦',
    description: 'Reliable moving and packing services',
    providerCount: 8
  }
];

export const providers: Provider[] = [
  {
    id: '1',
    name: 'John Smith',
    profession: 'Professional Cleaner',
    skills: ['Deep Cleaning', 'Carpet Cleaning', 'Window Cleaning'],
    rating: 4.8,
    reviewCount: 156,
    hourlyRate: 35,
    location: 'Downtown',
    distance: 2.3,
    avatar: 'https://i.pravatar.cc/150?img=1',
    about: 'Experienced cleaner with 5+ years in residential and commercial cleaning. Eco-friendly products used.',
    completedJobs: 342,
    availability: ['Mon', 'Wed', 'Fri'],
    categoryId: '1'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    profession: 'Master Plumber',
    skills: ['Pipe Repair', 'Fixture Installation', 'Drain Cleaning'],
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: 45,
    location: 'Midtown',
    distance: 1.5,
    avatar: 'https://i.pravatar.cc/150?img=2',
    about: 'Licensed plumber specializing in residential plumbing. Fast response and quality work guaranteed.',
    completedJobs: 567,
    availability: ['Tue', 'Thu', 'Sat'],
    categoryId: '2'
  },
  {
    id: '3',
    name: 'Mike Williams',
    profession: 'Electrician',
    skills: ['Wiring', 'Lighting Installation', 'Circuit Repair'],
    rating: 4.7,
    reviewCount: 98,
    hourlyRate: 50,
    location: 'Uptown',
    distance: 3.1,
    avatar: 'https://i.pravatar.cc/150?img=3',
    about: 'Certified electrician with 8 years of experience. Safe and reliable electrical services.',
    completedJobs: 289,
    availability: ['Mon', 'Tue', 'Thu'],
    categoryId: '3'
  },
  {
    id: '4',
    name: 'Emily Brown',
    profession: 'Interior Painter',
    skills: ['Wall Painting', 'Texture Finishing', 'Color Consulting'],
    rating: 4.6,
    reviewCount: 67,
    hourlyRate: 40,
    location: 'Westside',
    distance: 4.2,
    avatar: 'https://i.pravatar.cc/150?img=4',
    about: 'Creative painter transforming spaces with color. Attention to detail and clean work.',
    completedJobs: 178,
    availability: ['Wed', 'Fri', 'Sat'],
    categoryId: '4'
  },
  {
    id: '5',
    name: 'David Chen',
    profession: 'Master Carpenter',
    skills: ['Custom Furniture', 'Cabinet Making', 'Wood Repair'],
    rating: 4.9,
    reviewCount: 112,
    hourlyRate: 55,
    location: 'Eastside',
    distance: 5.0,
    avatar: 'https://i.pravatar.cc/150?img=5',
    about: 'Artisan carpenter creating beautiful custom pieces. Quality craftsmanship guaranteed.',
    completedJobs: 234,
    availability: ['Mon', 'Wed', 'Fri'],
    categoryId: '5'
  },
  {
    id: '6',
    name: 'Maria Garcia',
    profession: 'Moving Specialist',
    skills: ['Packing', 'Loading', 'Transportation'],
    rating: 4.5,
    reviewCount: 89,
    hourlyRate: 30,
    location: 'Northside',
    distance: 2.8,
    avatar: 'https://i.pravatar.cc/150?img=6',
    about: 'Professional mover with a team. Careful handling of all items. Free estimates.',
    completedJobs: 156,
    availability: ['Tue', 'Thu', 'Sat'],
    categoryId: '6'
  }
];