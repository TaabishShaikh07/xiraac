'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    // Smooth scroll for service exploration
    const exploreButton = document.getElementById('explore-services');
    if (exploreButton) {
      exploreButton.addEventListener('click', (e) => {
        e.preventDefault();
        const servicesSection = document.getElementById('services');
        servicesSection?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, []);

  const services = [
    {
      id: 'appliance-repair',
      title: 'Appliance Repair',
      description: 'Professional appliance repair and maintenance',
      image: '/images/ac repairer.png',
    },
    {
      id: 'cleaning-pest-control',
      title: 'Cleaning & Pest Control',
      description: 'Deep cleaning for your home',
      image: '/images/cleaning.png',
    },
    {
      id: 'electricians',
      title: 'Electricians',
      description: 'Expert electrical services',
      image: '/images/electrician.png',
    },
    {
      id: 'beauty-spa',
      title: 'Beauty & Spa',
      description: 'Professional beauty services for men and women',
      image: '/images/salon.png',
    },
    {
      id: 'carpenters',
      title: 'Carpenters',
      description: 'Expert woodworking and repairs',
      image: '/images/carpenter.png',
    },
    {
      id: 'renovation-construction',
      title: 'Renovation & Construction',
      description: 'Professional renovation services',
      image: '/images/renovation.png',
    },
    {
      id: 'laundry-services',
      title: 'Laundry Services',
      description: 'Professional clothes care',
      image: '/images/laundry.png',
    },
    {
      id: 'plumbers',
      title: 'Plumbers',
      description: 'Expert plumbing solutions',
      image: '/images/plumbing.png',
    },
  ];

  const steps = [
    {
      title: 'Choose a service',
      description: 'Browse through our wide range of professional services',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
    },
    {
      title: 'Pick a time slot',
      description: 'Select a convenient time that works for you',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Get it done',
      description: 'Our professional will arrive and complete the service',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState(null);

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

  const testimonials = [
    {
      name: 'Priya Sharma',
      rating: 5,
      quote: 'Excellent service! The technician was professional and fixed my AC in no time.',
    },
    {
      name: 'Rahul Mehta',
      rating: 5,
      quote: 'Very reliable and punctual service. Will definitely use again!',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section min-h-[80vh] flex items-center bg-gradient-to-br from-primary/90 to-primary-dark/90 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight animate-fade-in">
              Home Services Delivered to Your Doorstep
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium animate-slide-up">
              Trusted professionals. Instant booking. Fair pricing.
            </p>
            <a
              href="#services"
              id="explore-services"
              className="btn-primary inline-flex items-center space-x-2 text-lg group"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* Available Locations */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            Available Locations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {locations.map((location) => (
              <div key={location.name} className="relative">
                <div
                  onClick={() => setSelectedLocation(selectedLocation === location.name ? null : location.name)}
                  className={`flex items-center gap-2 px-6 py-3 ${selectedLocation === location.name ? 'bg-primary/20' : 'bg-primary/10'} rounded-full text-primary font-medium hover:bg-primary/20 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md`}
                >
                  <img src={location.icon} alt={location.name} className="w-8 h-8 object-contain" />
                  {location.name}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${selectedLocation === location.name ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {selectedLocation === location.name && (
                  <div className="absolute z-10 w-full mt-2 py-2 bg-white rounded-lg shadow-lg">
                    {location.subLocations.map((subLocation) => (
                      <Link
                        key={subLocation}
                        href={`/book-service?location=${encodeURIComponent(location.name)}&subLocation=${encodeURIComponent(subLocation)}`}
                        className="block px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700 text-sm transition-colors duration-200"
                      >
                        {subLocation}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="section section-wave py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary animate-fade-in">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card"
              >
                <div className="relative h-32 overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <img src="/service-loader.svg" alt="loading" className="w-12 h-12" />
                  </div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-29 h-28 object-contain transition-all duration-300 group-hover:scale-110 group-hover:opacity-80"
                  />
                </div>
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">{service.description}</p>
                  <Link
                    href={`/booking?category=${encodeURIComponent(service.title)}`}
                    className="btn-primary text-base"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section section-wave section-wave-flip py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-teal-700 font-poppins">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center group animate-float">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section-wave py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-indigo-700 font-poppins">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Partners</h3>
              <p className="text-gray-600">All our professionals are thoroughly vetted and background-checked</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparent Pricing</h3>
              <p className="text-gray-600">No hidden charges. Pay only for what you book</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Support</h3>
              <p className="text-gray-600">24/7 customer support to assist you anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-wave section-wave-flip py-20 bg-gradient-to-br from-gray-900 to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white font-poppins">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center p-8 bg-white/10 backdrop-blur rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-white/20">
                <p className="text-gray-200 mb-6 text-lg italic">"{testimonial.quote}"</p>
                <p className="font-semibold text-white text-lg">{testimonial.name}</p>
                <div className="flex justify-center mt-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section section-wave py-20 bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to book your first service?
          </h2>
          <a
            href="/services"
            className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg group overflow-hidden relative hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"><span className="relative z-10">Get Started</span><div className="absolute inset-0 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}