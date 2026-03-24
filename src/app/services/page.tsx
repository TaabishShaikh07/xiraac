'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const serviceCategories = [
  {
    name: 'Beauty & Spa',
    icon: '/images/salon.svg',
    services: [
      { name: "Women's Salon at Home", price: '₹499 onwards' },
      { name: "Women's Hair Spa", price: '₹799 onwards' },
      { name: 'Bridal Makeup', price: '₹4999 onwards' },
      { name: "Men's Haircut & Grooming", price: '₹299 onwards' },
      { name: "Men's Massage", price: '₹699 onwards' },
      { name: "Men's Hair Spa", price: '₹599 onwards' }
    ]
  },
  {
    name: 'Cleaning & Pest Control',
    icon: '/images/cleaning.svg',
    services: [
      { name: 'Deep Home Cleaning', price: '₹1499 onwards' },
      { name: 'Sofa Cleaning', price: '₹399 per seat' },
      { name: 'Kitchen/Bathroom Cleaning', price: '₹699 onwards' },
      { name: 'Pest Control', price: '₹899 onwards' }
    ]
  },
  {
    name: 'Appliance Repair',
    icon: '/images/ac-repair.svg',
    services: [
      { name: 'AC Repair & Servicing', price: '₹499 onwards' },
      { name: 'Washing Machine Repair', price: '₹399 onwards' },
      { name: 'Refrigerator Repair', price: '₹449 onwards' },
      { name: 'Microwave Repair', price: '₹349 onwards' },
      { name: 'Water Purifier Repair', price: '₹299 onwards' },
      { name: 'Cooler Repair', price: '₹499 onwards' },
    ]
  },
  {
    name: 'Electricians',
    icon: '/images/electrician.svg',
    services: [
      { name: 'Fan Installation', price: '₹299 onwards' },
      { name: 'Switchboard Repair', price: '₹199 onwards' },
      { name: 'Full Home Wiring', price: 'Custom Quote' },
      { name: 'CCTV Installation', price: '₹299 onwards' },
    ]
  },
  {
    name: 'Plumbers',
    icon: '/images/plumbing.svg',
    services: [
      { name: 'Tap Installation', price: '₹199 onwards' },
      { name: 'Water Tank Cleaning', price: '₹999 onwards' },
      { name: 'Pipe Leakage Fix', price: '₹299 onwards' }
    ]
  },
  {
    name: 'Carpenters',
    icon: '/images/carpenter.svg',
    services: [
      { name: 'Door & Window Repairs', price: '₹299 onwards' },
      { name: 'Furniture Assembly', price: '₹499 onwards' },
      { name: 'Custom Wooden Work', price: 'Custom Quote' }
    ]
  },
  {
    name: 'Renovation & Construction',
    icon: '/images/renovation.svg',
    services: [
      { name: 'Full Home Renovation', price: 'Custom Quote' },
      { name: 'Modular Kitchen Design', price: 'Custom Quote' },
      { name: 'Bathroom Renovation', price: 'Custom Quote' }
    ]
  },
  {
    name: 'Laundry Services',
    icon: '/images/laundry.svg',
    services: [
      { name: 'Wash & Fold', price: '₹50 per kg' },
      { name: 'Dry Cleaning', price: '₹199 onwards' },
      { name: 'Ironing Services', price: '₹15 per piece' }
    ]
  },
  {
    name: 'Home Shifting & Packers',
    icon: '/images/moving.svg',
    services: [
      { name: 'Local Shifting', price: '₹2999 onwards' },
      { name: 'Long-Distance Shifting', price: 'Custom Quote' },
      { name: 'Furniture Disassembly', price: '₹499 onwards' }
    ]
  }
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  const filteredCategories = serviceCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.services.some(service => service.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || category.name === selectedCategory;

    const matchesPrice = priceFilter === 'all' ||
      (priceFilter === 'under500' && category.services.some(service => 
        service.price !== 'Custom Quote' && parseInt(service.price.replace(/[^0-9]/g, '')) < 500)) ||
      (priceFilter === 'under1000' && category.services.some(service => 
        service.price !== 'Custom Quote' && parseInt(service.price.replace(/[^0-9]/g, '')) < 1000)) ||
      (priceFilter === 'above1000' && category.services.some(service => 
        service.price !== 'Custom Quote' && parseInt(service.price.replace(/[^0-9]/g, '')) >= 1000));

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600">Professional services at your doorstep</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search services..."
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {serviceCategories.map(category => (
                  <option key={category.name} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="under500">Under ₹500</option>
                <option value="under1000">Under ₹1000</option>
                <option value="above1000">₹1000 & Above</option>
              </select>
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category) => (
            <div key={category.name} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 relative">
                    <Image
                      src={category.icon}
                      alt={category.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4">{category.name}</h3>
                </div>
                <ul className="space-y-3">
                  {category.services.map((service) => (
                    <li key={service.name} className="flex justify-between items-center">
                      <span className="text-gray-600">{service.name}</span>
                      <span className="text-primary font-medium">{service.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link 
                    href={`/booking?category=${encodeURIComponent(category.name)}`}
                    className="btn-primary w-full text-center"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}