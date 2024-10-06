const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const QRCode = require('qrcode');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Endpoint to create a new QR code entry
app.post('/api/qrcodes', async (req, res) => {
  try {
    const { name, number, email } = req.body;

    // Validate input
    if (!name || !number || !email) {
      return res.status(400).json({ message: 'Name, Number, and Email are required' });
    }

    // Generate QR code from the email (or a unique identifier)
    const qrCodeData = `${email}`; // Can be modified to include other identifiers
    const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

    // Store in the database
    const qrCodeEntry = await prisma.qRCode.create({
      data: {
        name,
        number,
        email,
        qrCode: qrCodeUrl, // Store the generated QR code URL in the database
      },
    });

    res.json(qrCodeEntry);
  } catch (error) {
    console.error('Error creating QR code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to fetch the QR code data by unique ID, email, or another identifier
app.get('/api/qrcodes/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;

    // Check if the identifier is a numeric ID or an email
    const isNumericId = !isNaN(identifier);

    let qrCodeEntry;


    if (isNumericId) {
      // If numeric, treat it as an ID lookup

      console.error("numeric");


      qrCodeEntry = await prisma.qRCode.findFirst({
        where: { id: parseInt(identifier) }, // Find by ID
      });
    } else {
      console.error("not");
      // Otherwise, treat it as an email lookup
      qrCodeEntry = await prisma.qRCode.findFirst({
        where: { id: identifier }, // Find by email
      });
    }

    console.log(qrCodeEntry)

    if (!qrCodeEntry) {
      return res.status(404).json({ message: 'QR Code not found' });
    }

    res.json(qrCodeEntry);
  } catch (error) {
    console.error('Error fetching QR code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
