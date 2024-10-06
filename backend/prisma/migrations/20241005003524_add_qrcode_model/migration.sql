-- CreateTable
CREATE TABLE "QRCode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,

    CONSTRAINT "QRCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QRCode_email_key" ON "QRCode"("email");

-- CreateIndex
CREATE UNIQUE INDEX "QRCode_qrCode_key" ON "QRCode"("qrCode");
