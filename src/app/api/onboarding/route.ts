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

    // Debug: Log the user ID to check what we're getting
    console.log('Session user ID:', session.user.id);

    // First, check if the user exists in the database
    const existingUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!existingUser) {
      console.log('User not found in database. Creating user...');
      
      // Create the user if they don't exist
      const newUser = await prisma.user.create({
        data: {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.name || '',
          isOnboardingComplete: true,
          selectedSuite: selectedSuite,
        },
      });
      console.log('Created new user:', newUser);
    } else {
      // User exists, update their onboarding status
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          isOnboardingComplete: true,
          selectedSuite: selectedSuite,
        },
      });
    }

    // Create business record
    const businessRecord = await prisma.business.create({
      data: {
        user: { connect: { id: session.user.id } },
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

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
      business: businessRecord,
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