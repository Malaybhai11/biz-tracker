"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Building2, Milk, Store, Code, MapPin, Users, CreditCard, Smartphone, Utensils } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const OnboardingFlow = () => {
  // ALL HOOKS MUST BE CALLED AT THE TOP LEVEL - BEFORE ANY CONDITIONAL LOGIC
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // State hooks - these must be called unconditionally
  const [selectedSuite, setSelectedSuite] = useState<string | null>(null);
  const [businessData, setBusinessData] = useState<any>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect logic - this useEffect is fine because it doesn't affect hook order
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated" || !session) {
      router.replace("/new/login");
      return;
    }
    if ((session.user as any).isOnboardingComplete) {
      router.replace("/dashboard");
    }
  }, [session, status, router]);

  // Demo mode effect
  useEffect(() => {
    if (selectedSuite === 'demo') {
      const timer = setTimeout(() => {
        alert('Demo completed! This would normally redirect to a dashboard.');
        setSelectedSuite(null);
        setBusinessData({});
        setCurrentStep(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedSuite]);

  // NOW we can do conditional rendering AFTER all hooks are called
  
  // Loading spinner
  if (status === "loading" || !session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  
  if ((session.user as any).isOnboardingComplete) return null;

  // Update business data - memoized to prevent re-renders
  const updateData = useCallback((key: string, value: any) => {
    setBusinessData((prev: any) => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Suite selection - memoized
  const selectSuite = useCallback((suite: string) => {
    setSelectedSuite(suite);
    setBusinessData({});
    setCurrentStep(2);
  }, []);

  // Navigation - memoized
  const nextStep = useCallback(() => setCurrentStep(prev => prev + 1), []);
  const prevStep = useCallback(() => setCurrentStep(prev => prev - 1), []);

  // Final submission - memoized
  const handleFinalSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Onboarding data:', { selectedSuite, businessData });
      alert('Onboarding completed successfully! (This is a demo)');
      setSelectedSuite(null);
      setBusinessData({});
      setCurrentStep(0);
      window.location.href = "/dashboard";
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedSuite, businessData]);

  // Welcome Card
  const WelcomeCard = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full text-center border border-white/20 shadow-2xl">
        <div className="mb-8">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Hey there, Future Business Hero! 👋
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Ready to supercharge your business with BizTracker? 
            <br />Let's discover what brings you here and tailor the perfect solution for you!
          </p>
        </div>
        <button
          onClick={nextStep}
          className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Let's Get Started! 🚀
        </button>
      </div>
    </div>
  );

  // Suite Selector
  const SuiteSelector = () => {
    const suites = [
      {
        id: 'restaurant',
        title: '🍽️ Restaurant Management',
        description: 'Perfect for restaurants, cafes, and food businesses',
        icon: Building2,
        color: 'from-orange-500 to-red-600'
      },
      {
        id: 'dairy',
        title: '🥛 Dairy Management',
        description: 'Built for dairy businesses and milk delivery services',
        icon: Milk,
        color: 'from-blue-500 to-cyan-600'
      },
      {
        id: 'other',
        title: '🏬 Other Businesses',
        description: 'For retail stores, malls, and general businesses',
        icon: Store,
        color: 'from-green-500 to-emerald-600'
      },
      {
        id: 'demo',
        title: '🧑‍💻 Just Exploring',
        description: 'Take a tour with our interactive demo',
        icon: Code,
        color: 'from-purple-500 to-indigo-600'
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What brings you here?</h2>
            <p className="text-xl text-gray-300">Choose the perfect suite for your business</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suites.map(suite => {
              const IconComponent = suite.icon;
              return (
                <div
                  key={suite.id}
                  onClick={() => selectSuite(suite.id)}
                  className={`bg-gradient-to-br ${suite.color} p-6 rounded-3xl cursor-pointer hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl`}
                >
                  <IconComponent className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{suite.title}</h3>
                  <p className="text-white/80 mb-4">{suite.description}</p>
                  <div className="flex items-center text-white font-semibold">
                    Get Started <ChevronRight className="ml-2 w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Question Card
  const QuestionCard: React.FC<{
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
    onNext: () => void;
    onPrev: () => void;
    isLast?: boolean;
    canProceed?: boolean;
  }> = ({ icon: Icon, title, children, onNext, onPrev, isLast = false, canProceed = true }) => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
            <Icon className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="mb-8">{children}</div>
        <div className="flex justify-between">
          <button
            onClick={onPrev}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          {isLast ? (
            <button
              onClick={handleFinalSubmit}
              disabled={!canProceed || isSubmitting}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Completing...' : 'Complete Setup! 🎉'}
            </button>
          ) : (
            <button
              onClick={onNext}
              disabled={!canProceed}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Restaurant Steps - memoized to prevent re-creation
  const RestaurantSteps = useCallback(() => {
    const steps = [
      {
        icon: Building2,
        title: "What's your restaurant called?",
        render: () => (
          <input
            type="text"
            value={businessData.businessName || ''}
            onChange={(e) => updateData('businessName', e.target.value)}
            placeholder="e.g., Mario's Pizza Palace"
            className="w-full p-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
        ),
        canProceed: () => Boolean(businessData.businessName?.trim())
      },
      {
        icon: MapPin,
        title: "Where is your restaurant located?",
        render: () => (
          <input
            value={businessData.businessAddress || ''}
            onChange={(e) => updateData('businessAddress', e.target.value)}
            placeholder="Enter your complete business address"
            className="w-full p-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
            autoFocus
          />
        ),
        canProceed: () => Boolean(businessData.businessAddress?.trim())
      },
      {
        icon: Utensils,
        title: "How many tables do you have?",
        render: () => (
          <input
            type="number"
            value={businessData.numberOfTables || ''}
            onChange={(e) => updateData('numberOfTables', parseInt(e.target.value) || 0)}
            placeholder="e.g., 15"
            min="1"
            className="w-full p-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
        ),
        canProceed: () => (businessData.numberOfTables || 0) > 0
      },
      {
        icon: Users,
        title: "How many customers visit daily on average?",
        render: () => (
          <div>
            <input
              type="number"
              value={businessData.averageDailyCustomers || ''}
              onChange={(e) => updateData('averageDailyCustomers', parseInt(e.target.value) || 0)}
              placeholder="e.g., 150"
              min="0"
              className="w-full p-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
            <p className="text-gray-600 text-sm mt-2">This helps us provide better analytics (optional)</p>
          </div>
        ),
        canProceed: () => true
      },
      {
        icon: Smartphone,
        title: "Do you want WhatsApp Order Integration?",
        render: () => (
          <div className="space-y-4">
            {[
              { value: true, label: "✅ Yes, enable WhatsApp orders!" },
              { value: false, label: "❌ No, maybe later" }
            ].map(option => (
              <button
                key={String(option.value)}
                onClick={() => updateData('whatsappOrderIntegration', option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  businessData.whatsappOrderIntegration === option.value
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        ),
        canProceed: () => businessData.whatsappOrderIntegration !== undefined
      },
      {
        icon: CreditCard,
        title: "What payment methods do you accept?",
        render: () => {
          const methods = ['Cash', 'UPI', 'Card', 'Mixed'];
          const selected = businessData.paymentMethods || [];
          return (
            <div className="space-y-3">
              {methods.map(method => (
                <button
                  key={method}
                  onClick={() => {
                    const newMethods = selected.includes(method) 
                      ? selected.filter((m: string) => m !== method)
                      : [...selected, method];
                    updateData('paymentMethods', newMethods);
                  }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selected.includes(method)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {selected.includes(method) ? '✅' : '⚪'} {method}
                </button>
              ))}
              <p className="text-gray-600 text-sm mt-2">Select all that apply</p>
            </div>
          );
        },
        canProceed: () => (businessData.paymentMethods || []).length > 0
      }
    ];

    const currentStepIndex = currentStep - 2;
    const step = steps[currentStepIndex];
    if (!step) return null;

    return (
      <QuestionCard
        icon={step.icon}
        title={step.title}
        onNext={nextStep}
        onPrev={prevStep}
        isLast={currentStepIndex === steps.length - 1}
        canProceed={step.canProceed()}
      >
        {step.render()}
      </QuestionCard>
    );
  }, [businessData, currentStep, nextStep, prevStep, updateData, handleFinalSubmit]);

  // Dairy Steps - memoized
  const DairySteps = useCallback(() => {
    const steps = [
      {
        icon: Milk,
        title: "What's your dairy business called?",
        render: () => (
          <input
            type="text"
            value={businessData.businessName || ''}
            onChange={(e) => updateData('businessName', e.target.value)}
            placeholder="e.g., Fresh Valley Dairy"
            className="w-full p-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
        ),
        canProceed: () => Boolean(businessData.businessName?.trim())
      },
      {
        icon: MapPin,
        title: "Where is your dairy business located?",
        render: () => (
          <textarea
            value={businessData.businessAddress || ''}
            onChange={(e) => updateData('businessAddress', e.target.value)}
            placeholder="Enter your complete business address"
            className="w-full p-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
            autoFocus
          />
        ),
        canProceed: () => Boolean(businessData.businessAddress?.trim())
      },
      {
        icon: Milk,
        title: "What products do you sell?",
        render: () => {
          const products = ['Milk', 'Paneer', 'Curd', 'Ice Cream', 'Butter', 'Cheese'];
          const selected = businessData.productsSold || [];
          return (
            <div className="grid grid-cols-2 gap-3">
              {products.map(product => (
                <button
                  key={product}
                  onClick={() => {
                    const newProducts = selected.includes(product) 
                      ? selected.filter((p: string) => p !== product)
                      : [...selected, product];
                    updateData('productsSold', newProducts);
                  }}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    selected.includes(product)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {selected.includes(product) ? '✅' : '⚪'} {product}
                </button>
              ))}
            </div>
          );
        },
        canProceed: () => (businessData.productsSold || []).length > 0
      }
    ];

    const currentStepIndex = currentStep - 2;
    const step = steps[currentStepIndex];
    if (!step) return null;

    return (
      <QuestionCard
        icon={step.icon}
        title={step.title}
        onNext={nextStep}
        onPrev={prevStep}
        isLast={currentStepIndex === steps.length - 1}
        canProceed={step.canProceed()}
      >
        {step.render()}
      </QuestionCard>
    );
  }, [businessData, currentStep, nextStep, prevStep, updateData]);

  // Other Business Steps
  const OtherBusinessSteps = () => {
    const steps = [
      {
        icon: Store,
        title: "What's your business called?",
        render: () => (
          <input
            type="text"
            value={businessData.businessName || ''}
            onChange={(e) => updateData('businessName', e.target.value)}
            placeholder="e.g., City Mall Electronics"
            className="w-full p-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ),
        canProceed: () => Boolean(businessData.businessName?.trim())
      },
      {
        icon: Store,
        title: "What type of store do you run?",
        render: () => {
          const storeTypes = ['Mall', 'Grocery', 'Electronics', 'Clothing', 'Pharmacy', 'Other'];
          return (
            <div className="grid grid-cols-2 gap-3">
              {storeTypes.map(type => (
                <button
                  key={type}
                  onClick={() => updateData('storeType', type)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    businessData.storeType === type
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {businessData.storeType === type ? '✅' : '⚪'} {type}
                </button>
              ))}
            </div>
          );
        },
        canProceed: () => Boolean(businessData.storeType)
      }
    ];

    const currentStepIndex = currentStep - 2;
    const step = steps[currentStepIndex];
    if (!step) return null;

    return (
      <QuestionCard
        icon={step.icon}
        title={step.title}
        onNext={nextStep}
        onPrev={prevStep}
        isLast={currentStepIndex === steps.length - 1}
        canProceed={step.canProceed()}
      >
        {step.render()}
      </QuestionCard>
    );
  };

  // Demo Mode
  const DemoMode = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full text-center border border-white/20 shadow-2xl">
        <div className="animate-spin w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-6"></div>
        <h2 className="text-3xl font-bold text-white mb-4">Setting up your demo experience...</h2>
        <p className="text-white/80 text-lg">
          We're preparing sample data from restaurants, dairies, and retail stores for you to explore!
        </p>
      </div>
    </div>
  );

  // Render logic
  if (currentStep === 0) return <WelcomeCard />;
  if (currentStep === 1) return <SuiteSelector />;
  if (selectedSuite === 'demo') return <DemoMode />;
  if (selectedSuite === 'restaurant') return <RestaurantSteps />;
  if (selectedSuite === 'dairy') return <DairySteps />;
  if (selectedSuite === 'other') return <OtherBusinessSteps />;

  // Fallback
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Onboarding goes here!</h2>
      </div>
    </div>
  );
};

export default OnboardingFlow;