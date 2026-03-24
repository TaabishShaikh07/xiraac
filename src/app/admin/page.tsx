'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Booking {
  id: string;
  customerName: string;
  service: string;
  category: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  address: string;
  phone: string;
  email: string;
}

interface Service {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
}

// Mock data for demonstration
const mockBookings: Booking[] = [
  {
    id: 'b1',
    customerName: 'John Doe',
    service: 'AC Repair & Servicing',
    category: 'Appliance Repair',
    date: '2024-02-01',
    time: '10:00',
    status: 'pending',
    address: '123 Main St, Mumbai',
    phone: '+91 9876543210',
    email: 'john@example.com'
  },
  {
    id: 'b2',
    customerName: 'Jane Smith',
    service: 'Deep Home Cleaning',
    category: 'Cleaning & Pest Control',
    date: '2024-02-02',
    time: '14:00',
    status: 'confirmed',
    address: '456 Park Ave, Mumbai',
    phone: '+91 9876543211',
    email: 'jane@example.com'
  }
];

const mockServices: Service[] = [
  {
    id: 's1',
    name: 'AC Repair & Servicing',
    category: 'Appliance Repair',
    price: '₹499 onwards',
    description: 'Professional AC repair and maintenance service'
  },
  {
    id: 's2',
    name: 'Deep Home Cleaning',
    category: 'Cleaning & Pest Control',
    price: '₹1499 onwards',
    description: 'Complete home deep cleaning service'
  }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [bookingFilters, setBookingFilters] = useState({
    status: 'all',
    category: 'all',
    date: ''
  });
  const [serviceFilters, setServiceFilters] = useState({
    category: 'all'
  });
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, verify credentials with backend
    if (loginForm.email === 'admin@xiraac.com' && loginForm.password === 'admin123') {
      localStorage.setItem('adminToken', 'mock-token');
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const updateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const addService = (service: Omit<Service, 'id'>) => {
    const newService = {
      ...service,
      id: `s${services.length + 1}`
    };
    setServices([...services, newService]);
  };

  const editService = (serviceId: string, updatedService: Partial<Service>) => {
    setServices(services.map(service =>
      service.id === serviceId ? { ...service, ...updatedService } : service
    ));
  };

  const deleteService = (serviceId: string) => {
    setServices(services.filter(service => service.id !== serviceId));
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = bookingFilters.status === 'all' || booking.status === bookingFilters.status;
    const matchesCategory = bookingFilters.category === 'all' || booking.category === bookingFilters.category;
    const matchesDate = !bookingFilters.date || booking.date === bookingFilters.date;
    return matchesStatus && matchesCategory && matchesDate;
  });

  const filteredServices = services.filter(service => 
    serviceFilters.category === 'all' || service.category === serviceFilters.category
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-primary">Xiraac Admin</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${
                activeTab === 'bookings'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('bookings')}
            >
              Bookings
            </button>
            <button
              className={`${
                activeTab === 'services'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('services')}
            >
              Services
            </button>
          </nav>
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Manage Bookings</h2>
                
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <select
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    value={bookingFilters.status}
                    onChange={(e) => setBookingFilters({ ...bookingFilters, status: e.target.value })}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <select
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    value={bookingFilters.category}
                    onChange={(e) => setBookingFilters({ ...bookingFilters, category: e.target.value })}
                  >
                    <option value="all">All Categories</option>
                    <option value="Appliance Repair">Appliance Repair</option>
                    <option value="Cleaning & Pest Control">Cleaning & Pest Control</option>
                    {/* Add other categories */}
                  </select>

                  <input
                    type="date"
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    value={bookingFilters.date}
                    onChange={(e) => setBookingFilters({ ...bookingFilters, date: e.target.value })}
                  />
                </div>

                {/* Bookings Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                            <div className="text-sm text-gray-500">{booking.email}</div>
                            <div className="text-sm text-gray-500">{booking.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.service}</div>
                            <div className="text-sm text-gray-500">{booking.category}</div>
                            <div className="text-sm text-gray-500">{booking.address}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.date}</div>
                            <div className="text-sm text-gray-500">{booking.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <select
                              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm"
                              value={booking.status}
                              onChange={(e) => updateBookingStatus(booking.id, e.target.value as Booking['status'])}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirm</option>
                              <option value="completed">Complete</option>
                              <option value="cancelled">Cancel</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Manage Services</h2>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      // TODO: Implement add service modal
                      console.log('Add service clicked');
                    }}
                  >
                    Add New Service
                  </button>
                </div>

                {/* Service Filters */}
                <div className="mb-6">
                  <select
                    className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    value={serviceFilters.category}
                    onChange={(e) => setServiceFilters({ ...serviceFilters, category: e.target.value })}
                  >
                    <option value="all">All Categories</option>
                    <option value="Appliance Repair">Appliance Repair</option>
                    <option value="Cleaning & Pest Control">Cleaning & Pest Control</option>
                    {/* Add other categories */}
                  </select>
                </div>

                {/* Services Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredServices.map((service) => (
                        <tr key={service.id}>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{service.name}</div>
                            <div className="text-sm text-gray-500">{service.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {service.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {service.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              className="text-primary hover:text-primary-dark mr-3"
                              onClick={() => {
                                // TODO: Implement edit service modal
                                console.log('Edit service:', service.id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this service?')) {
                                  deleteService(service.id);
                                }
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}