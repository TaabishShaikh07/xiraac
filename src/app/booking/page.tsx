'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../context/CartContext';

interface TimeSlot {
  time: string;
  available: boolean;
}

const generateTimeSlots = () => {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    slots.push({ time, available: Math.random() > 0.3 }); // Simulated availability
  }
  return slots;
};

export default function BookingPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    category: categoryFromUrl || '',
    service: '',
    notes: '',
    location: '',
    subLocation: ''
  });

  const locations = [
    {
      name: 'Dadar',
      icon: '/images/locations/dadar.svg',
      subLocations: ['Dadar East', 'Dadar West', 'Hindamata', 'Shivaji Park']
    },
    {
      name: 'Kurla',
      icon: '/images/locations/kurla.svg',
      subLocations: ['Kurla West', 'Kurla East', 'BKC', 'Nehru Nagar']
    },
    {
      name: 'Byculla',
      icon: '/images/locations/byculla.svg',
      subLocations: ['Byculla East', 'Byculla West', 'Clare Road', 'Gloria Church']
    },
    {
      name: 'Khar',
      icon: '/images/locations/khar.svg',
      subLocations: ['Khar West', 'Khar East', 'Pali Hill', 'Union Park']
    },
    {
      name: 'Virar',
      icon: '/images/locations/virar.svg',
      subLocations: ['Virar East', 'Virar West', 'Global City', 'Arnala']
    },
    {
      name: 'Thane',
      icon: '/images/locations/thane.svg',
      subLocations: ['Thane West', 'Thane East', 'Ghodbunder Road', 'Majiwada']
    },
    {
      name: 'Navi Mumbai',
      icon: '/images/locations/navi-mumbai.svg',
      subLocations: ['Vashi', 'Nerul', 'Kharghar', 'Panvel']
    }
  ];

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Simulate fetching available time slots
    setTimeSlots(generateTimeSlots());
  }, [formData.date]);

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Add the service to cart
      addToCart({
        service: formData.service,
        category: formData.category,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        area: formData.subLocation,
        address: formData.address,
        notes: formData.notes,
        price: '₹499' // You might want to get the actual price from your service data
      });

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        date: '',
        time: '',
        category: categoryFromUrl || '',
        service: '',
        notes: '',
        location: '',
        subLocation: ''
      });
    } catch (err) {
      setError('Failed to add to cart. Please try again.');
      console.error('Add to cart error:', err);
    }

    setLoading(false);
  };

  const servicesByCategory: { [key: string]: string[] } = {
    'Beauty & Spa': ['Womens Salon at Home', 'Womens Hair Spa', 'Bridal Makeup', 'Mens Haircut & Grooming', 'Mens Massage', 'Mens Hair Spa'],
    'Cleaning & Pest Control': ['Deep Home Cleaning', 'Sofa Cleaning', 'Kitchen/Bathroom Cleaning', 'Pest Control'],
    'Appliance Repair': ['AC Repair & Servicing', 'Washing Machine Repair', 'Refrigerator Repair', 'Microwave Repair', 'Water Purifier Repair','Cooler Repair'],
    'Electricians': ['Fan Installation', 'Switchboard Repair', 'Full Home Wiring','CCTV Installation'],
    'Plumbers': ['Tap Installation', 'Water Tank Cleaning', 'Pipe Leakage Fix'],
    'Carpenters': ['Door & Window Repairs', 'Furniture Assembly', 'Custom Wooden Work'],
    'Renovation & Construction': ['Full Home Renovation', 'Modular Kitchen Design', 'Bathroom Renovation'],
    'Laundry Services': ['Wash & Fold', 'Dry Cleaning', 'Ironing Services'],
    'Home Shifting & Packers': ['Local Shifting', 'Long-Distance Shifting', 'Furniture Disassembly']
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a Service</h1>
          <p className="text-xl text-gray-600">Schedule your service appointment</p>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="mt-4 text-2xl font-semibold text-gray-900">Booking Confirmed!</h2>
            <p className="mt-2 text-gray-600">We'll send you a confirmation email with all the details.</p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 btn-primary"
            >
              Book Another Service
            </button>
          </div>
        ) : (
          <form onSubmit={handleAddToCart} className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Service Category</label>
                <select
                  id="category"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value, service: ''})}
                >
                  <option value="">Select a category</option>
                  {Object.keys(servicesByCategory).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
                <select
                  id="service"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="">Select a service</option>
                  {formData.category && servicesByCategory[formData.category].map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <select
                  id="location"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value, subLocation: ''})}
                >
                  <option value="">Select a location</option>
                  {locations.map((location) => (
                    <option key={location.name} value={location.name}>{location.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subLocation" className="block text-sm font-medium text-gray-700">Area</label>
                <select
                  id="subLocation"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={formData.subLocation}
                  onChange={(e) => setFormData({...formData, subLocation: e.target.value})}
                  disabled={!formData.location}
                >
                  <option value="">Select an area</option>
                  {formData.location && locations.find(loc => loc.name === formData.location)?.subLocations.map((subLocation) => (
                    <option key={subLocation} value={subLocation}>{subLocation}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  required
                  min={today}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
                <select
                  id="time"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  disabled={!formData.date}
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((slot) => (
                    <option
                      key={slot.time}
                      value={slot.time}
                      disabled={!slot.available}
                    >
                      {slot.time} {!slot.available && '(Not Available)'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Service Address</label>
                <textarea
                  id="address"
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Any specific requirements or instructions..."
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 text-red-600 text-sm">{error}</div>
            )}

            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-lg"
              >
                {loading ? 'Adding to Cart...' : 'Add to Cart'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}