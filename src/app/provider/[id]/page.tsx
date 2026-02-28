'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { providers } from '@/data/mockData';
import { Provider } from '@/types';
import Rating from '@/components/ui/Rating';
import Button from '@/components/ui/Button';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import { MapPin, Clock, Calendar, Star, Briefcase, Award, ChevronLeft } from 'lucide-react';

export default function ProviderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const found = providers.find(p => p.id === params.id);
      setProvider(found || null);
      setLoading(false);
    }, 500);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Provider Not Found</h2>
        <p className="text-gray-600 mb-8">The service provider you're looking for doesn't exist.</p>
        <Button onClick={() => router.push('/services')}>
          Browse Services
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ChevronLeft size={20} />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Header */}
          <Card>
            <CardBody>
              <div className="flex items-start space-x-6">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-800 mb-1">
                    {provider.name}
                  </h1>
                  <p className="text-gray-600 mb-2">{provider.profession}</p>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <Rating value={provider.rating} count={provider.reviewCount} />
                    <span className="text-sm text-gray-500">
                      {provider.completedJobs} jobs completed
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">
                      {provider.location} • {provider.distance} miles away
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">About</h2>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700 leading-relaxed">{provider.about}</p>
            </CardBody>
          </Card>

          {/* Skills & Expertise */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Skills & Expertise</h2>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-2">
                {provider.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Reviews</h2>
              <span className="text-sm text-gray-500">{provider.reviewCount} reviews</span>
            </CardHeader>
            <CardBody>
              {sampleReviews.map((review, index) => (
                <div key={index} className="border-b last:border-0 py-4 first:pt-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-800">{review.name}</p>
                      <Rating value={review.rating} size="sm" />
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Card */}
          <Card>
            <CardBody>
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-blue-600">${provider.hourlyRate}</p>
                <p className="text-sm text-gray-500">per hour</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-2" />
                  <span className="text-sm">Available today</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">Flexible scheduling</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Award size={16} className="mr-2" />
                  <span className="text-sm">Verified professional</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full mb-3"
                onClick={() => router.push(`/booking/${provider.id}`)}
              >
                Book Now
              </Button>

              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
              >
                Contact
              </Button>
            </CardBody>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Availability</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {provider.availability.map((day, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{day}</span>
                    <span className="text-sm text-gray-500">9:00 AM - 5:00 PM</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Stats */}
          <Card>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">{provider.completedJobs}</p>
                  <p className="text-xs text-gray-500">Jobs Done</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">{provider.reviewCount}</p>
                  <p className="text-xs text-gray-500">Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">5+</p>
                  <p className="text-xs text-gray-500">Years Exp</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">98%</p>
                  <p className="text-xs text-gray-500">Satisfaction</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

const sampleReviews = [
  {
    name: 'John Doe',
    rating: 5,
    date: '2 days ago',
    comment: 'Excellent service! Very professional and completed the job quickly.'
  },
  {
    name: 'Jane Smith',
    rating: 4.5,
    date: '1 week ago',
    comment: 'Great work, very knowledgeable. Would definitely recommend.'
  },
  {
    name: 'Mike Johnson',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Fantastic experience from start to finish. Will hire again.'
  }
];