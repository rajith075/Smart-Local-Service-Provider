'use client';

import { useState } from 'react';
import { categories } from '@/data/mockData';
import { Filter, X } from 'lucide-react';

interface ServiceFiltersProps {
  onFilterChange: (filters: any) => void;
}

const ServiceFilters = ({ onFilterChange }: ServiceFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [rating, setRating] = useState<number>(0);
  const [distance, setDistance] = useState<number>(10);

  const handleApplyFilters = () => {
    onFilterChange({
      category: selectedCategory,
      priceRange,
      rating,
      distance
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setPriceRange([0, 100]);
    setRating(0);
    setDistance(10);
    onFilterChange({});
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Filter size={18} />
        <span>Filters</span>
      </button>

      {/* Filter Modal */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-80 bg-white rounded-lg shadow-xl z-10 border">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Filters</h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range (per hour)
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-1/2 p-2 border rounded-lg"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-1/2 p-2 border rounded-lg"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
              >
                <option value="0">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>

            {/* Distance Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Distance (miles)
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">{distance} miles</div>
            </div>
          </div>

          <div className="p-4 border-t flex justify-between">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceFilters;