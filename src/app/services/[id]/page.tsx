'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ServiceDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  reviews: Review[];
}

// Mock data - replace with actual API call
const mockService: ServiceDetail = {
  id: '1',
  name: 'Deep Home Cleaning',
  category: 'Cleaning & Pest Control',
  description: 'Professional deep cleaning service for your entire home. Our trained staff uses eco-friendly products and advanced equipment to ensure your home is spotless and hygienic.',
  price: '₹1499',
  image: '/images/cleaning.svg',
  features: [
    'Complete house deep cleaning',
    'Eco-friendly cleaning products',
    'Professional cleaning staff',
    'Advanced cleaning equipment',
    'Bathroom and kitchen deep cleaning',
    'Floor and carpet cleaning'
  ],
  reviews: [
    {
      id: 'r1',
      userId: 'u1',
      userName: 'Rahul Kumar',
      rating: 5,
      comment: 'Excellent service! The team was professional and thorough.',
      date: '2024-01-15'
    },
    {
      id: 'r2',
      userId: 'u2',
      userName: 'Priya Shah',
      rating: 4,
      comment: 'Very good service, but they were a bit late.',
      date: '2024-01-10'
    }
  ]
};

export default function ServiceDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [service] = useState<ServiceDetail>(mockService);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Service Header */}
          <div className="p-6 sm:p-8 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                <p className="mt-2 text-sm text-gray-500">{service.category}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-2xl font-bold text-primary">{service.price}</p>
              </div>
            </div>
          </div>

          {/* Service Content */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Service</h2>
                <p className="text-gray-600">{service.description}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Reviews</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center">
                      {renderStars(Number(calculateAverageRating(service.reviews)))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {calculateAverageRating(service.reviews)} out of 5 ({service.reviews.length} reviews)
                    </span>
                  </div>

                  <div className="space-y-6">
                    {service.reviews.map((review) => (
                      <div key={review.id} className="border-t pt-6 first:border-t-0 first:pt-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{review.userName}</p>
                            <div className="flex items-center mt-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                        </div>
                        <p className="mt-2 text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Section */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Book This Service</h3>
                <button
                  onClick={() => router.push('/booking')}
                  className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark transition-colors duration-200"
                >
                  Book Now
                </button>
                <div className="mt-6 space-y-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Flexible scheduling</p>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Satisfaction guaranteed</p>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p>Secure payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}