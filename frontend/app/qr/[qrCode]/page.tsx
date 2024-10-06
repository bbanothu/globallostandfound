"use client"; // Required for Next.js client components

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function QRCodeDisplay() {
  const searchParams = useSearchParams();
  const qrCode = searchParams.get("qrCode"); // Get `qrCode` from URL params
  const [data, setData] = useState(null);

  useEffect(() => {
    if (qrCode) {
      const fetchQRCodeData = async () => {
        try {
          const res = await axios.get(`http://localhost:5001/api/qrcodes/${qrCode}`);
          setData(res.data);
        } catch (error) {
          console.error("Error fetching QR code data:", error);
        }
      };
      fetchQRCodeData();
    }
  }, [qrCode]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-orange-50">
        <p className="text-lg text-orange-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">QR Code Details</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <p className="text-lg mb-4 text-gray-700">
          <span className="font-semibold text-orange-600">Name:</span> {data.name}
        </p>
        <p className="text-lg mb-4 text-gray-700">
          <span className="font-semibold text-orange-600">Number:</span> {data.number}
        </p>
        <p className="text-lg mb-6 text-gray-700">
          <span className="font-semibold text-orange-600">Email:</span> {data.email}
        </p>
        {data.qrCode && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-orange-600 mb-2">Generated QR Code:</h2>
            <img src={data.qrCode} alt="QR Code" className="w-48 h-48 mb-4" />
            <p className="text-gray-700">
              This QR Code corresponds to: <span className="font-semibold">{data.email}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

