'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/data/mockData';
import CategoryCard from '@/components/services/CategoryCard';
import SearchBar from '@/components/ui/SearchBar';
import Button from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    router.push(`/services?search=${encodeURIComponent(query)}`);
  };

  const featuredCategories = categories.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Trusted Local Services
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Connect with skilled professionals in your neighborhood
          </p>
          
          <SearchBar onSearch={handleSearch} />
          
          <div className="mt-8 flex justify-center space-x-4">
            <span className="text-sm">Popular:</span>
            {['Plumbing', 'Cleaning', 'Electrical'].map((item) => (
              <button
                key={item}
                onClick={() => handleSearch(item)}
                className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the right professional for your needs from our wide range of service categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => router.push('/services')}
            >
              View All Categories
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect service provider
          </p>
          <Button 
            size="lg"
            onClick={() => router.push('/services')}
          >
            Find a Service Provider
          </Button>
        </div>
      </section>
    </div>
  );
}

const steps = [
  {
    title: 'Search',
    description: 'Find the service you need by browsing categories or searching directly'
  },
  {
    title: 'Compare',
    description: 'View provider profiles, ratings, and reviews to make an informed choice'
  },
  {
    title: 'Book',
    description: 'Select a date and time that works for you and confirm your booking'
  }
];