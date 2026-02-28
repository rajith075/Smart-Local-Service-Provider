'use client';

import { ServiceCategory } from '@/types';
import Card from '../ui/Card';
import { useRouter } from 'next/navigation';

interface CategoryCardProps {
  category: ServiceCategory;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/services?category=${category.id}`);
  };

  return (
    <Card onClick={handleClick} className="cursor-pointer group">
      <div className="p-6">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
          {category.icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {category.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          {category.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {category.providerCount} providers
          </span>
          <span className="text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
            View →
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;