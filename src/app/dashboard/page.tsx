'use client';

import { useState } from 'react';

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: string;
  address: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Mock data
const mockBookings: Booking[] = [
  {
    id: '1',
    service: 'AC Repair & Servicing',
    date: '2024-02-01',
    time: '10:00',
    status: 'confirmed',
    price: '₹499',
    address: '123 Main St, Mumbai'
  },
  {
    id: '2',
    service: 'Deep Home Cleaning',
    date: '2024-02-05',
    time: '14:00',
    status: 'pending',
    price: '₹1499',
    address: '123 Main St, Mumbai'
  },
  {
    id: '3',
    service: 'Salon at Home',
    date: '2024-01-15',
    time: '11:00',
    status: 'completed',
    price: '₹699',
    address: '123 Main St, Mumbai'
  }
];

const mockProfile: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  address: '123 Main St, Mumbai'
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState(mockBookings);
  const [profile, setProfile] = useState(mockProfile);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  const upcomingBookings = bookings.filter(booking => 
    ['pending', 'confirmed'].includes(booking.status)
  );

  const pastBookings = bookings.filter(booking =>
    ['completed', 'cancelled'].includes(booking.status)
  );

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      ));
    }
  };

  const handleRescheduleBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setRescheduleDate('');
    setRescheduleTime('');
  };

  const confirmReschedule = () => {
    if (!rescheduleDate || !rescheduleTime) {
      alert('Please select both date and time');
      return;
    }

    setBookings(bookings.map(booking =>
      booking.id === selectedBooking?.id
        ? { ...booking, date: rescheduleDate, time: rescheduleTime }
        : booking
    ));

    setSelectedBooking(null);
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditingProfile(false);
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome, {profile.name}</h2>
              <nav className="space-y-2">
                <button
                  className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'bookings' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('bookings')}
                >
                  My Bookings
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'profile' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                {/* Upcoming Bookings */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Bookings</h3>
                    {upcomingBookings.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingBookings.map((booking) => (
                          <div key={booking.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">{booking.service}</h4>
                                <p className="text-sm text-gray-500 mt-1">{booking.date} at {booking.time}</p>
                                <p className="text-sm text-gray-500">{booking.address}</p>
                                <p className="text-sm font-medium text-primary mt-1">{booking.price}</p>
                              </div>
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            <div className="mt-4 flex space-x-4">
                              <button
                                onClick={() => handleRescheduleBooking(booking)}
                                className="text-primary hover:text-primary-dark text-sm font-medium"
                              >
                                Reschedule
                              </button>
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No upcoming bookings</p>
                    )}
                  </div>
                </div>

                {/* Past Bookings */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Past Bookings</h3>
                    {pastBookings.length > 0 ? (
                      <div className="space-y-4">
                        {pastBookings.map((booking) => (
                          <div key={booking.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">{booking.service}</h4>
                                <p className="text-sm text-gray-500 mt-1">{booking.date} at {booking.time}</p>
                                <p className="text-sm text-gray-500">{booking.address}</p>
                                <p className="text-sm font-medium text-primary mt-1">{booking.price}</p>
                              </div>
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No past bookings</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Profile Settings</h3>
                    {!isEditingProfile && (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="text-primary hover:text-primary-dark font-medium"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {isEditingProfile ? (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          value={editedProfile.name}
                          onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          value={editedProfile.email}
                          onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          value={editedProfile.phone}
                          onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          value={editedProfile.address}
                          onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={handleSaveProfile}
                          className="btn-primary"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setEditedProfile(profile);
                            setIsEditingProfile(false);
                          }}
                          className="btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                        <p className="mt-1">{profile.name}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Email</h4>
                        <p className="mt-1">{profile.email}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                        <p className="mt-1">{profile.phone}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Address</h4>
                        <p className="mt-1">{profile.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reschedule Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Reschedule Booking</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    min={new Date().toISOString().split('T')[0]}
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Time</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                  >
                    <option value="">Select a time</option>
                    {Array.from({ length: 12 }, (_, i) => i + 9).map((hour) => (
                      <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={confirmReschedule}
                    className="btn-primary"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}