'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../../config/emailjs';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedUpiMethod, setSelectedUpiMethod] = useState('');
  const [error, setError] = useState('');

  if (items.length === 0) {
    router.push('/');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: "Xiraac",
          to_email: formData.email,  // user's email
          name: formData.name,
          email: formData.email,
          service: items[0].service,
          date: items[0].date,
          time: items[0].time,
          phone: formData.phone,
          address: formData.address,
          total: total,
        },
        EMAILJS_CONFIG.publicKey
      );
      
  
      alert('Order placed successfully! Check your email for confirmation.');
      clearCart();
      router.push('/');
    } catch (err) {
      setError('Failed to process order. Please try again.');
    }
  };
  

  const handlePaymentMethodChange = (e) => {
    setError('');
    setSelectedPaymentMethod(e.target.value);
    setSelectedUpiMethod('');
  };

  const handleUpiMethodChange = (e) => {
    setError('');
    setSelectedUpiMethod(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="order-2 md:order-1">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            {!showPaymentMethods ? (
              <button
                type="button"
                onClick={() => setShowPaymentMethods(true)}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-200"
              >
                Proceed to Pay
              </button>
            ) : (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Select Payment Method</h3>
                <div className="space-y-2">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                          <span className="block sm:inline">{error}</span>
                        </div>
                      )}
                      <input
                        type="radio"
                        id="upi"
                        name="paymentMethod"
                        value="upi"
                        checked={selectedPaymentMethod === 'upi'}
                        onChange={handlePaymentMethodChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="upi" className="ml-2 block text-sm text-gray-900">
                        UPI
                      </label>
                    </div>
                    {selectedPaymentMethod === 'upi' && (
                      <div className="ml-6 space-y-2">
                        <div className="flex items-center">
                          <img src="/images/Gpay.png" alt="GPay" className="h-8 w-auto mr-2" />
                          <input
                            type="radio"
                            id="gpay"
                            name="upiMethod"
                            value="gpay"
                            checked={selectedUpiMethod === 'gpay'}
                            onChange={handleUpiMethodChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          />
                          <label htmlFor="gpay" className="ml-2 flex items-center text-sm text-gray-900">
                            <span>Google Pay</span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <img src="/images/icons8-phone-pe-48.png" alt="PhonePe" className="h-8 w-auto mr-2" />
                          <input
                            type="radio"
                            id="phonepe"
                            name="upiMethod"
                            value="phonepe"
                            checked={selectedUpiMethod === 'phonepe'}
                            onChange={handleUpiMethodChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          />
                          <label htmlFor="phonepe" className="ml-2 flex items-center text-sm text-gray-900">
                            <span>PhonePe</span>
                          </label>
                        </div>
                        {selectedUpiMethod === 'phonepe' && (
                          <div className="mt-2 space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="phonepeUpiId"
                                  name="phonepeMethod"
                                  value="upiId"
                                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                />
                                <label htmlFor="phonepeUpiId" className="ml-2 block text-sm text-gray-900">
                                  Enter UPI ID
                                </label>
                              </div>
                              <div className="ml-6">
                                <input
                                  type="text"
                                  placeholder="Enter your UPI ID"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="phonepeQrCode"
                                  name="phonepeMethod"
                                  value="qrCode"
                                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                />
                                <label htmlFor="phonepeQrCode" className="ml-2 block text-sm text-gray-900">
                                  Scan QR Code
                                </label>
                              </div>
                              <div className="ml-6">
                                <img
                                  src="/images/PhoneePe-QR.png"
                                  alt="PhonePe QR Code"
                                  className="w-49 h-49 object-contain"
                                />
                                <p className="text-sm text-gray-700 mt-2">Scan the QR code using PhonePe app to make the payment</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedUpiMethod === 'gpay' && (
                          <div className="mt-2 space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="upiId"
                                  name="gpayMethod"
                                  value="upiId"
                                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                />
                                <label htmlFor="upiId" className="ml-2 block text-sm text-gray-900">
                                  Enter UPI ID
                                </label>
                              </div>
                              <div className="ml-6">
                                <input
                                  type="text"
                                  placeholder="Enter your UPI ID"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="qrCode"
                                  name="gpayMethod"
                                  value="qrCode"
                                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                />
                                <label htmlFor="qrCode" className="ml-2 block text-sm text-gray-900">
                                  Scan QR Code
                                </label>
                              </div>
                              <div className="ml-6">
                                <img
                                  src="/images/Gpay-QR.png"
                                  alt="GPay QR Code"
                                  className="w-49 h-49 object-contain"
                                />
                                <p className="text-sm text-gray-700 mt-2">Scan the QR code using Google Pay app to make the payment</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={selectedPaymentMethod === 'card'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <label htmlFor="card" className="ml-2 block text-sm text-gray-900">
                      Credit/Debit Card
                    </label>
                  </div>
                </div>

                {selectedPaymentMethod === 'card' && (
                  <div className="space-y-4 mt-4 p-4 border rounded-md">
                    <div>
                      <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">Card Holder Name</label>
                      <input
                        type="text"
                        id="cardHolder"
                        name="cardHolder"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        placeholder="Name on card"
                      />
                    </div>
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        required
                        maxLength={19}
                        pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        placeholder="1234 5678 9012 3456"
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          value = value.match(/.{1,4}/g)?.join(' ') || '';
                          e.target.value = value;
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          required
                          maxLength={5}
                          pattern="(0[1-9]|1[0-2])/([0-9]{2})"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          placeholder="MM/YY"
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2);
                            }
                            e.target.value = value;
                          }}
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                          type="password"
                          id="cvv"
                          name="cvv"
                          required
                          maxLength={3}
                          pattern="[0-9]{3}"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!selectedPaymentMethod}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pay Now
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            {items.map((item, index) => (
              <div key={index} className="border-b py-2 last:border-0">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{item.service}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-sm text-gray-500">{item.date} at {item.time}</p>
                  </div>
                  <span className="font-medium">{item.price}</span>
                </div>
              </div>
            ))}
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold text-lg">₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  try {
    setError('');
    setSelectedPaymentMethod(e.target.value);
    setSelectedUpiMethod('');
  } catch (err) {
    setError('Failed to select payment method. Please try again.');
  }
};

const handleUpiMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  try {
    setError('');
    setSelectedUpiMethod(e.target.value);
  } catch (err) {
    setError('Failed to select UPI method. Please try again.');
  }
};