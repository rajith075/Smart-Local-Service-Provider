'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { providers, categories } from '@/data/mockData';
import ProviderCard from '@/components/services/ProviderCard';
import ServiceFilters from '@/components/services/ServiceFilters';
import SearchBar from '@/components/ui/SearchBar';
import { Provider } from '@/types/provider';
import { Loader2 } from 'lucide-react';

function ServicesContent() {
  const searchParams = useSearchParams();
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>(providers);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    let filtered = [...providers];

    if (categoryParam) {
      filtered = filtered.filter(p => p.categoryId === categoryParam);
    }

    if (searchParam) {
      const query = searchParam.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.profession.toLowerCase().includes(query) ||
        p.skills.some(skill => skill.toLowerCase().includes(query))
      );
      setSearchQuery(searchParam);
    }

    setFilteredProviders(filtered);
  }, [searchParams]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = providers.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.profession.toLowerCase().includes(query.toLowerCase()) ||
      p.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredProviders(filtered);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...providers];

    if (filters.category) {
      filtered = filtered.filter(p => p.categoryId === filters.category);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.hourlyRate >= filters.priceRange[0] && 
        p.hourlyRate <= filters.priceRange[1]
      );
    }

    if (filters.rating) {
      filtered = filtered.filter(p => p.rating >= filters.rating);
    }

    if (filters.distance) {
      filtered = filtered.filter(p => p.distance <= filters.distance);
    }

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.profession.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProviders(filtered);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    const sorted = [...filteredProviders];
    switch (value) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_low':
        sorted.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'price_high':
        sorted.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case 'distance':
        sorted.sort((a, b) => a.distance - b.distance);
        break;
    }
    setFilteredProviders(sorted);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Find Local Service Providers
        </h1>
        <SearchBar onSearch={handleSearch} placeholder="Search by name, profession, or skill..." />
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <ServiceFilters onFilterChange={handleFilterChange} />
        
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="p-2 border rounded-lg bg-white"
          >
            <option value="rating">Top Rated</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="distance">Nearest First</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-gray-600 mb-4">
        Found {filteredProviders.length} service provider{filteredProviders.length !== 1 ? 's' : ''}
      </p>

      {/* Provider Grid */}
      {filteredProviders.length > 0 ? (
        <div className="space-y-4">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No providers found matching your criteria.</p>
          <button 
            onClick={() => {
              setFilteredProviders(providers);
              setSearchQuery('');
            }}
            className="mt-4 text-blue-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}