'use client';

import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, total } = useCart();

  return (
    <div className="fixed right-4 top-20 z-50 w-96 bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.service}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-sm text-gray-500">{item.date} at {item.time}</p>
                  <p className="text-sm text-gray-500">{item.address}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{item.price}</span>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
              {item.notes && (
                <p className="text-sm text-gray-500 mt-2">Notes: {item.notes}</p>
              )}
            </div>
          ))}
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">₹{total}</span>
            </div>
            <button
              className="w-full mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-200"
              onClick={() => window.location.href = '/checkout'}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}