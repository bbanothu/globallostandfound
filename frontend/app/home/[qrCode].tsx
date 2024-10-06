import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function QRCodeDisplay() {
  const router = useRouter();
  const { qrCode } = router.query; // Get the QR code identifier from the URL
  const [data, setData] = useState(null);

  useEffect(() => {
    if (qrCode) {
      const fetchQRCodeData = async () => {
        const res = await axios.get(`http://localhost:5000/api/qrcodes/${qrCode}`);
        setData(res.data);
      };
      fetchQRCodeData();
    }
  }, [qrCode]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>QR Code Details</h1>
      <p>Name: {data.name}</p>
      <p>Number: {data.number}</p>
      <p>Email: {data.email}</p>
    </div>
  );
}
