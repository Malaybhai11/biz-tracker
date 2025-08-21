/*
  Warnings:

  - You are about to drop the `DairyProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OtherBusinessProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."DairyProfile" DROP CONSTRAINT "DairyProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OtherBusinessProfile" DROP CONSTRAINT "OtherBusinessProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RestaurantProfile" DROP CONSTRAINT "RestaurantProfile_userId_fkey";

-- DropTable
DROP TABLE "public"."DairyProfile";

-- DropTable
DROP TABLE "public"."OtherBusinessProfile";

-- DropTable
DROP TABLE "public"."RestaurantProfile";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isOnboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "selectedSuite" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."businesses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessAddress" TEXT,
    "numberOfTables" INTEGER,
    "averageDailyCustomers" INTEGER,
    "whatsappOrderIntegration" BOOLEAN,
    "paymentMethods" TEXT[],
    "productsSold" TEXT[],
    "storeType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."restaurant_profiles" (
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
    "operatingHours" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurant_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dairy_profiles" (
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
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dairy_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."other_business_profiles" (
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
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "other_business_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "public"."accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "public"."sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "public"."verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "public"."verificationtokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_userId_key" ON "public"."businesses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_profiles_userId_key" ON "public"."restaurant_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "dairy_profiles_userId_key" ON "public"."dairy_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "other_business_profiles_userId_key" ON "public"."other_business_profiles"("userId");

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."businesses" ADD CONSTRAINT "businesses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."restaurant_profiles" ADD CONSTRAINT "restaurant_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dairy_profiles" ADD CONSTRAINT "dairy_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."other_business_profiles" ADD CONSTRAINT "other_business_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
