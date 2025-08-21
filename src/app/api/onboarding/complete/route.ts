// app/api/onboarding/complete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Adjust the path to your auth file
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the request body
    const { selectedSuite, businessData } = await request.json();

    if (!selectedSuite || !businessData) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      );
    }

    // Update user's onboarding status and save business data
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        isOnboardingComplete: true,
        // You can also store the business data in a separate Business model
        // or add fields to the User model for business info
      },
    });

    // Create business record (you'll need to create this model in your Prisma schema)
    const businessRecord = await prisma.business.create({
      data: {
        user: { connect: { id: session.user.id } },
        businessType: selectedSuite,
        businessName: businessData.businessName,
        businessAddress: businessData.businessAddress,
        // Restaurant fields
        numberOfTables: selectedSuite === 'restaurant' ? businessData.numberOfTables : undefined,
        averageDailyCustomers: selectedSuite === 'restaurant' ? businessData.averageDailyCustomers : undefined,
        whatsappOrderIntegration: selectedSuite === 'restaurant' ? businessData.whatsappOrderIntegration : undefined,
        paymentMethods: selectedSuite === 'restaurant' ? businessData.paymentMethods : [],
        // Dairy fields
        productsSold: selectedSuite === 'dairy' ? businessData.productsSold : [],
        // Other fields
        storeType: selectedSuite === 'other' ? businessData.storeType : undefined,
      },
    });
    // Optionally, update the user's selectedSuite field
    await prisma.user.update({
      where: { id: session.user.id },
      data: { selectedSuite },
    });
    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
      user: updatedUser,
      business: businessRecord,
    });

  } catch (error) {
    console.error('Onboarding completion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}