// app/api/onboarding/complete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
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

    console.log('Session user ID:', session.user.id);

    // Use a transaction to ensure both operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // First, upsert the user (create if doesn't exist, update if exists)
      const user = await tx.user.upsert({
        where: {
          id: session.user.id,
        },
        update: {
          isOnboardingComplete: true,
          selectedSuite: selectedSuite,
        },
        create: {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.name || '',
          isOnboardingComplete: true,
          selectedSuite: selectedSuite,
        },
      });

      console.log('User upserted:', user);

      // Now create the business record with the correct relation
      const businessRecord = await tx.business.create({
        data: {
          // Use userId instead of connect if your schema expects userId field
          userId: session.user.id,
          businessType: selectedSuite,
          businessName: businessData.businessName,
          businessAddress: businessData.businessAddress,
          // Restaurant fields
          numberOfTables: selectedSuite === 'restaurant' ? businessData.numberOfTables : null,
          averageDailyCustomers: selectedSuite === 'restaurant' ? businessData.averageDailyCustomers : null,
          whatsappOrderIntegration: selectedSuite === 'restaurant' ? businessData.whatsappOrderIntegration : null,
          paymentMethods: selectedSuite === 'restaurant' ? (businessData.paymentMethods || []) : [],
          // Dairy fields
          productsSold: selectedSuite === 'dairy' ? (businessData.productsSold || []) : [],
          // Other fields
          storeType: selectedSuite === 'other' ? businessData.storeType : null,
        },
      });

      return { user, businessRecord };
    });

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
      user: result.user,
      business: result.businessRecord,
    });

  } catch (error) {
    console.error('Onboarding completion error:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}