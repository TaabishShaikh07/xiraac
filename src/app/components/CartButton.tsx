'use client';

import { useCart } from '../context/CartContext';
import Cart from './Cart';

export default function CartButton() {
  const { items } = useCart();

  return (
    <div className="relative">
      <button
        className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
        onClick={() => document.getElementById('cart-drawer')?.classList.toggle('hidden')}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>
      <div id="cart-drawer" className="hidden">
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => document.getElementById('cart-drawer')?.classList.add('hidden')} />
        <Cart />
      </div>
    </div>
  );
}