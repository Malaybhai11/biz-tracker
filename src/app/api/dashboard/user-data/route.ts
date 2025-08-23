import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// For App Router (app/api/dashboard/user-data/route.ts)
export async function GET(request: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch user with business data using the hybrid approach
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        business: true, // This is the consolidated business model
        // Include specific profiles if needed for advanced features
        restaurantProfile: true,
        dairyProfile: true,
        otherBusinessProfile: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prepare response data
    const responseData = {
      user: {
        name: user.name,
        email: user.email,
        selectedSuite: user.selectedSuite || 'demo',
        isOnboardingComplete: user.isOnboardingComplete
      },
      // Use the consolidated Business model for dashboard
      business: user.business ? {
        businessName: user.business.businessName,
        businessType: user.business.businessType,
        businessAddress: user.business.businessAddress,
        // Restaurant specific
        numberOfTables: user.business.numberOfTables,
        averageDailyCustomers: user.business.averageDailyCustomers,
        // Dairy specific  
        numberOfRiders: user.business.businessType === 'dairy' ? getDairyRiders(user) : null,
        productsSold: user.business.productsSold,
        // Other business specific
        numberOfSKUs: user.business.businessType === 'other' ? getBusinessSKUs(user) : null,
        storeType: user.business.storeType
      } : null,
      // Additional profile data for advanced features (optional)
      profiles: {
        restaurant: user.restaurantProfile,
        dairy: user.dairyProfile,
        other: user.otherBusinessProfile
      }
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Helper functions to get specific business data
function getDairyRiders(user: any): number | null {
  // If detailed profile exists, use it, otherwise use basic business data
  if (user.dairyProfile?.numberOfRiders) {
    return user.dairyProfile.numberOfRiders;
  }
  // You could estimate from business data or return a default
  return 25; // Default value
}

function getBusinessSKUs(user: any): number | null {
  // If detailed profile exists, use it, otherwise estimate
  if (user.otherBusinessProfile?.numberOfSKUs) {
    return user.otherBusinessProfile.numberOfSKUs;
  }
  // Estimate based on store type or return default
  return 1000; // Default value
}