import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
}

const Rating = ({ value, count, size = 'md' }: RatingProps) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const starSize = sizes[size];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <Star 
                key={i} 
                className={`${starSize} fill-yellow-400 text-yellow-400`} 
              />
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <div key={i} className="relative">
                <Star className={`${starSize} text-gray-300`} />
                <Star 
                  className={`${starSize} fill-yellow-400 text-yellow-400 absolute top-0 left-0`} 
                  style={{ clipPath: 'inset(0 50% 0 0)' }}
                />
              </div>
            );
          } else {
            return (
              <Star 
                key={i} 
                className={`${starSize} text-gray-300`} 
              />
            );
          }
        })}
      </div>
      <span className="text-sm font-medium text-gray-700">
        {value.toFixed(1)}
      </span>
      {count && (
        <span className="text-sm text-gray-500">
          ({count} reviews)
        </span>
      )}
    </div>
  );
};

export default Rating;