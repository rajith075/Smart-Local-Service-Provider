
'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { providers } from '@/data/mockData';
import useBookingStore from '@/store/useBookingStore';
import Button from '@/components/ui/Button';
import Card, { CardBody, CardHeader, CardFooter } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { Calendar, Clock, User, Mail, Phone, MapPin } from 'lucide-react';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { setCurrentBooking, addBooking, currentBooking } = useBookingStore();
  
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const found = providers.find(p => p.id === params.id);
    setProvider(found);
    setLoading(false);
  }, [params.id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!bookingDetails.date) {
      newErrors.date = 'Please select a date';
    }
    if (!bookingDetails.time) {
      newErrors.time = 'Please select a time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!bookingDetails.name) {
      newErrors.name = 'Name is required';
    }
    if (!bookingDetails.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(bookingDetails.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!bookingDetails.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(bookingDetails.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!bookingDetails.address) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      // Create booking
      const booking = {
        id: `booking-${Date.now()}`,
        providerId: provider.id,
        userId: 'user-1', // Mock user ID
        date: bookingDetails.date,
        time: bookingDetails.time,
        status: 'confirmed',
        totalAmount: provider.hourlyRate * 2, // Assuming 2 hours minimum
        createdAt: new Date().toISOString()
      } as any;

      addBooking(booking);
      setCurrentBooking(booking);
      setBookingConfirmed(true);
    }
  };

  const handleNewBooking = () => {
    setBookingConfirmed(false);
    setStep(1);
    setBookingDetails({
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: ''
    });
  };

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
        <Button onClick={() => router.push('/services')}>
          Browse Services
        </Button>
      </div>
    );
  }

  if (bookingConfirmed) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Card>
          <CardBody className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Booking Confirmed!
            </h2>
            
            <p className="text-gray-600 mb-8">
              Thank you for booking with {provider.name}. Your booking has been confirmed.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold mb-4">Booking Details</h3>
              <div className="space-y-2">
                <p><span className="text-gray-600">Service:</span> {provider.profession}</p>
                <p><span className="text-gray-600">Date:</span> {new Date(bookingDetails.date).toLocaleDateString()}</p>
                <p><span className="text-gray-600">Time:</span> {bookingDetails.time}</p>
                <p><span className="text-gray-600">Provider:</span> {provider.name}</p>
                <p><span className="text-gray-600">Total:</span> ${provider.hourlyRate * 2}</p>
              </div>
            </div>

            <div className="flex space-x-4 justify-center">
              <Button variant="outline" onClick={handleNewBooking}>
                Book Another Service
              </Button>
              <Button onClick={() => router.push('/')}>
                Go to Home
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {['Select Date & Time', 'Your Details', 'Confirm'].map((label, index) => (
            <div key={index} className="flex-1 text-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2
                ${index + 1 < step ? 'bg-green-500 text-white' : 
                  index + 1 === step ? 'bg-blue-600 text-white' : 
                  'bg-gray-200 text-gray-600'}
              `}>
                {index + 1 < step ? '✓' : index + 1}
              </div>
              <span className="text-sm text-gray-600 hidden sm:block">{label}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
          <div 
            className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">
                {step === 1 ? 'Select Date & Time' : 'Your Information'}
              </h2>
            </CardHeader>
            
            <CardBody>
              {step === 1 ? (
                <div className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingDetails.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full p-3 border rounded-lg ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                    )}
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time
                    </label>
                    <select
                      name="time"
                      value={bookingDetails.time}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select a time slot</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                    {errors.time && (
                      <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={bookingDetails.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    icon={<User size={18} />}
                  />
                  
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={bookingDetails.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    icon={<Mail size={18} />}
                  />
                  
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={bookingDetails.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    icon={<Phone size={18} />}
                    placeholder="(123) 456-7890"
                  />
                  
                  <Input
                    label="Service Address"
                    name="address"
                    value={bookingDetails.address}
                    onChange={handleInputChange}
                    error={errors.address}
                    icon={<MapPin size={18} />}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={bookingDetails.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any special requests or details..."
                    />
                  </div>
                </div>
              )}
            </CardBody>

            <CardFooter className="flex justify-between">
              {step === 2 && (
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              <Button 
                onClick={step === 1 ? handleNext : handleSubmit}
                className={step === 1 ? 'ml-auto' : ''}
              >
                {step === 1 ? 'Continue' : 'Confirm Booking'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <h3 className="font-semibold">Booking Summary</h3>
            </CardHeader>
            
            <CardBody>
              <div className="flex items-start space-x-3 mb-4">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{provider.name}</p>
                  <p className="text-sm text-gray-600">{provider.profession}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Rate</span>
                  <span className="font-medium">${provider.hourlyRate}/hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">2 hours (minimum)</span>
                </div>
                {bookingDetails.date && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">
                      {new Date(bookingDetails.date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {bookingDetails.time && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time</span>
                    <span className="font-medium">{bookingDetails.time}</span>
                  </div>
                )}
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-blue-600">${provider.hourlyRate * 2}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
