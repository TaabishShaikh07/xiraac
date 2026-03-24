'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileMenu from './ProfileMenu';
import CartButton from './CartButton';

export default function Header() {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img src="/favicon.svg" alt="Xiraac" className="w-8 h-8" />
            <span className="text-xl font-poppins font-bold text-primary">Xiraac</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/services" className="nav-link">Services</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
            <a href="/become-a-partner" className="nav-link">Become a Partner</a>
          </div>

          {/* Auth Buttons, Cart and Profile Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <CartButton />
            {user ? (
              <ProfileMenu />
            ) : (
              <>
                <a href="/login" className="text-primary hover:text-primary-dark transition-colors">
                  Login
                </a>
                <a href="/signup" className="btn-primary">
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a href="/services" className="nav-link block">Services</a>
              <a href="/about" className="nav-link block">About</a>
              <a href="/contact" className="nav-link block">Contact</a>
              <a href="/become-a-partner" className="nav-link block">Become a Partner</a>
              {!user && (
                <div className="pt-4 border-t border-gray-100">
                  <CartButton />
                  <a href="/login" className="block text-primary hover:text-primary-dark transition-colors mb-3">
                    Login
                  </a>
                  <a href="/signup" className="btn-primary block text-center">
                    Sign Up
                  </a>
                </div>
              )}
              {user && (
                <div className="pt-4 border-t border-gray-100">
                  <a href="/dashboard" className="block text-primary hover:text-primary-dark transition-colors mb-3">
                    Dashboard
                  </a>
                  <ProfileMenu />
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}