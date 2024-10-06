"use client"; // Add this line to indicate it's a Client Component

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5001/api/qrcodes', { name, number, email });
    setQrCode(res.data.qrCode);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Generate QR Code</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-black placeholder:text-gray-400"
        />
        <input
          type="text"
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-black placeholder:text-gray-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-black placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="bg-orange-600 text-white font-semibold rounded-md p-2 w-full hover:bg-orange-700 transition duration-200"
        >
          Generate QR Code
        </button>
      </form>
      {qrCode && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-orange-600">Scan this QR Code:</h2>
          <img src={qrCode} alt="QR Code" className="mt-2 mx-auto" />
          <p className="mt-2 text-gray-700">QR Code generated for: <span className="font-semibold">{email}</span></p>
        </div>
      )}
    </div>
  );
}
