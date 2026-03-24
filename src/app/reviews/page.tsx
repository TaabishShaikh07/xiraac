'use client';

import { useState } from 'react';

interface Review {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock data - replace with actual API calls
const mockReviews: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    serviceId: 's1',
    serviceName: 'Deep Home Cleaning',
    rating: 5,
    comment: 'Excellent service! The team was professional and thorough.',
    date: '2024-01-15'
  },
  {
    id: 'r2',
    userId: 'u2',
    serviceId: 's2',
    serviceName: 'AC Repair & Servicing',
    rating: 4,
    comment: 'Very good service, technician was knowledgeable.',
    date: '2024-01-10'
  }
];

export default function Reviews() {
  const [reviews] = useState<Review[]>(mockReviews);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  // Mock completed bookings that need reviews
  const pendingReviews = [
    { id: 'b1', serviceName: 'Salon at Home', date: '2024-01-20' },
    { id: 'b2', serviceName: 'Plumbing Service', date: '2024-01-18' }
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking || !rating) {
      alert('Please select a booking and provide a rating');
      return;
    }

    // TODO: Submit review to backend
    console.log('Submitting review:', {
      bookingId: selectedBooking,
      rating,
      comment
    });

    // Reset form
    setSelectedBooking(null);
    setRating(0);
    setComment('');
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type={interactive ? 'button' : undefined}
        className={`text-2xl ${interactive ? 'cursor-pointer focus:outline-none' : ''} ${
          index < (interactive ? (hoveredStar || rating) : rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
        onClick={interactive ? () => setRating(index + 1) : undefined}
        onMouseEnter={interactive ? () => setHoveredStar(index + 1) : undefined}
        onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Write a Review Section */}
        {pendingReviews.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Write a Review</h2>
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Booking
                  </label>
                  <select
                    value={selectedBooking || ''}
                    onChange={(e) => setSelectedBooking(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="">Choose a service to review</option>
                    {pendingReviews.map((booking) => (
                      <option key={booking.id} value={booking.id}>
                        {booking.serviceName} - {new Date(booking.date).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex space-x-1">
                    {renderStars(rating, true)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Share your experience with this service..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-200"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Your Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Reviews</h2>
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{review.serviceName}</h3>
                        <div className="flex space-x-1 mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">You haven't written any reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}