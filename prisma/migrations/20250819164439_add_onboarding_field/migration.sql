/*
  Warnings:

  - You are about to drop the `UserProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserProgress" DROP CONSTRAINT "UserProgress_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "isOnboardingComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "selectedSuite" TEXT;

-- DropTable
DROP TABLE "public"."UserProgress";

-- CreateTable
CREATE TABLE "public"."RestaurantProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessAddress" TEXT NOT NULL,
    "numberOfTables" INTEGER,
    "averageDailyCustomers" INTEGER,
    "staffCount" INTEGER,
    "whatsappOrderIntegration" BOOLEAN NOT NULL DEFAULT false,
    "paymentMethods" TEXT[],
    "kitchenDisplaySystem" BOOLEAN NOT NULL DEFAULT false,
    "operatingHours" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RestaurantProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DairyProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessAddress" TEXT NOT NULL,
    "numberOfRiders" INTEGER,
    "riderShiftTimings" JSONB,
    "productsSold" TEXT[],
    "dailyAverageOrders" INTEGER,
    "whatsappOrderTracking" BOOLEAN NOT NULL DEFAULT false,
    "expiryDateTracking" BOOLEAN NOT NULL DEFAULT false,
    "paymentMethods" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DairyProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OtherBusinessProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessAddress" TEXT NOT NULL,
    "storeType" TEXT NOT NULL,
    "numberOfSKUs" INTEGER,
    "barcodeScanning" BOOLEAN NOT NULL DEFAULT false,
    "stockAutoReorder" BOOLEAN NOT NULL DEFAULT false,
    "salesProfitAnalytics" BOOLEAN NOT NULL DEFAULT false,
    "paymentMethods" TEXT[],
    "staffCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtherBusinessProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantProfile_userId_key" ON "public"."RestaurantProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DairyProfile_userId_key" ON "public"."DairyProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OtherBusinessProfile_userId_key" ON "public"."OtherBusinessProfile"("userId");

-- AddForeignKey
ALTER TABLE "public"."RestaurantProfile" ADD CONSTRAINT "RestaurantProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DairyProfile" ADD CONSTRAINT "DairyProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OtherBusinessProfile" ADD CONSTRAINT "OtherBusinessProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
