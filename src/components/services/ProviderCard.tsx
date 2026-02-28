'use client';

import { Provider } from '@/types/provider';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Rating from '../ui/Rating';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { MapPin, Clock } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  const router = useRouter();

  const handleViewProfile = () => {
    router.push(`/provider/${provider.id}`);
  };

  return (
    <Card>
      <CardBody className="flex items-start space-x-4">
        <img
          src={provider.avatar}
          alt={provider.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800">{provider.name}</h3>
              <p className="text-sm text-gray-600">{provider.profession}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-600">${provider.hourlyRate}</p>
              <p className="text-xs text-gray-500">per hour</p>
            </div>
          </div>
          
          <div className="mt-2">
            <Rating value={provider.rating} count={provider.reviewCount} size="sm" />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {provider.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-3 space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={14} className="mr-1" />
              {provider.location} • {provider.distance} miles away
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={14} className="mr-1" />
              {provider.completedJobs} jobs completed
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-end space-x-3">
        <Button variant="outline" size="sm" onClick={handleViewProfile}>
          View Profile
        </Button>
        <Button size="sm" onClick={() => router.push(`/booking/${provider.id}`)}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProviderCard;