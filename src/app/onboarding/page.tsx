"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Building2,
  Milk,
  Store,
  Code,
  MapPin,
  Users,
  CreditCard,
  Smartphone,
  Utensils,
  Check,
  ShoppingBag,
} from "lucide-react";
import Lottie from "lottie-react";

/* =========================================================
   PROGRESS BAR COMPONENT
========================================================= */
const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

/* =========================================================
   SHARED UI COMPONENTS
========================================================= */

const WelcomeCard = ({ onNext }: { onNext: () => void }) => {
  const [welcomeAnimation, setWelcomeAnimation] = useState(null);

  useEffect(() => {
    fetch('/animations/welcome-building.json')
      .then(response => response.json())
      .then(data => setWelcomeAnimation(data))
      .catch(err => console.warn('Failed to load welcome animation:', err));
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-8">
              {welcomeAnimation ? (
                <Lottie 
                  animationData={welcomeAnimation} 
                  style={{width: '100%', height: '100%'}} 
                  loop={true}
                />
              ) : (
                <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-green-600" />
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Welcome to BizTracker
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Let's set up your business profile in just a few steps
            </p>
          </div>
          <button
            onClick={onNext}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

const SuiteSelector = ({
  onSelect,
}: {
  onSelect: (suite: string) => void;
}) => {
  const [animations, setAnimations] = useState<any>({});

  useEffect(() => {
    const loadAnimations = async () => {
      const animationNames = ['restaurant', 'dairy', 'store', 'computer'];
      const loadedAnimations: any = {};
      
      for (const name of animationNames) {
        try {
          const response = await fetch(`/animations/${name}.json`);
          const data = await response.json();
          loadedAnimations[name] = data;
        } catch (err) {
          console.warn(`Failed to load ${name} animation:`, err);
        }
      }
      
      setAnimations(loadedAnimations);
    };

    loadAnimations();
  }, []);

  const suites = [
    {
      id: "restaurant",
      title: "Restaurant",
      subtitle: "Perfect for restaurants, cafes, and food businesses",
      animation: "restaurant",
      icon: Utensils,
    },
    {
      id: "dairy",
      title: "Dairy Business",
      subtitle: "Built for dairy businesses and milk delivery services",
      animation: "dairy",
      icon: Milk,
    },
    {
      id: "other",
      title: "Other Business",
      subtitle: "For retail stores, malls, and general businesses",
      animation: "store",
      icon: Store,
    },
    {
      id: "demo",
      title: "Just Exploring",
      subtitle: "Take a tour with our interactive demo",
      animation: "computer",
      icon: Code,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ProgressBar current={1} total={8} />
      <div className="flex-1 flex items-center justify-center p-6 pt-16">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              What type of business do you have?
            </h2>
            <p className="text-gray-600">Choose the option that best describes your business</p>
          </div>
          <div className="space-y-4">
            {suites.map((suite) => (
              <button
                key={suite.id}
                onClick={() => onSelect(suite.id)}
                className="w-full p-6 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-green-300 rounded-2xl text-left transition-all duration-200 transform hover:scale-102 hover:shadow-lg"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 mr-4">
                    {animations[suite.animation] ? (
                      <Lottie 
                        animationData={animations[suite.animation]} 
                        style={{width: '100%', height: '100%'}} 
                        loop={true}
                      />
                    ) : (
                      <div className="w-full h-full bg-green-100 rounded-lg flex items-center justify-center">
                        <suite.icon className="w-6 h-6 text-green-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {suite.title}
                    </h3>
                    <p className="text-sm text-gray-600">{suite.subtitle}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const QuestionCard: React.FC<{
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
  isLast?: boolean;
  canProceed?: boolean;
  onFinish?: () => void;
  isSubmitting?: boolean;
  currentStep?: number;
  totalSteps?: number;
  animationData?: any;
}> = ({
  icon: Icon,
  title,
  children,
  onNext,
  onPrev,
  isLast = false,
  canProceed = true,
  onFinish,
  isSubmitting,
  currentStep = 0,
  totalSteps = 8,
  animationData,
}) => (
  <div className="min-h-screen bg-white flex flex-col">
    <ProgressBar current={currentStep} total={totalSteps} />
    <div className="flex-1 flex items-center justify-center p-6 pt-16">
      <div className="max-w-lg w-full">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-6">
            {animationData ? (
              <Lottie 
                animationData={animationData} 
                style={{width: '100%', height: '100%'}} 
                loop={true}
              />
            ) : (
              <div className="w-full h-full bg-green-100 rounded-2xl flex items-center justify-center">
                <Icon className="w-8 h-8 text-green-600" />
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8 leading-relaxed">
            {title}
          </h2>
          <div className="mb-12">{children}</div>
          <div className="flex gap-4">
            <button
              onClick={onPrev}
              className="flex items-center justify-center w-12 h-12 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              {isLast ? (
                <button
                  onClick={onFinish}
                  disabled={!canProceed || isSubmitting}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Completing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Check className="w-5 h-5 mr-2" />
                      Complete Setup
                    </div>
                  )}
                </button>
              ) : (
                <button
                  onClick={onNext}
                  disabled={!canProceed}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl disabled:shadow-none"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* =========================================================
   RESTAURANT STEPS
========================================================= */

const RestaurantSteps = ({
  currentStep,
  businessData,
  updateData,
  nextStep,
  prevStep,
  handleFinalSubmit,
  isSubmitting,
}: {
  currentStep: number;
  businessData: any;
  updateData: (key: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleFinalSubmit: () => void;
  isSubmitting: boolean;
}) => {
  const [animations, setAnimations] = useState<any>({});

  useEffect(() => {
    const loadAnimations = async () => {
      const animationNames = [
        'restaurant', 'location-pin', 'dining-table', 
        'customers', 'whatsapp', 'payment'
      ];
      const loadedAnimations: any = {};
      
      for (const name of animationNames) {
        try {
          const response = await fetch(`/animations/${name}.json`);
          const data = await response.json();
          loadedAnimations[name] = data;
        } catch (err) {
          console.warn(`Failed to load ${name} animation:`, err);
        }
      }
      
      setAnimations(loadedAnimations);
    };

    loadAnimations();
  }, []);

  const steps = [
    {
      icon: Building2,
      title: "What's your restaurant called?",
      animationData: animations['restaurant'],
      render: () => (
        <input
          type="text"
          value={businessData.businessName || ""}
          onChange={(e) => updateData("businessName", e.target.value)}
          placeholder="Enter your restaurant name"
          className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-green-400 transition-colors bg-gray-50 focus:bg-white"
          autoFocus
        />
      ),
      canProceed: () => Boolean(businessData.businessName?.trim()),
    },
    {
      icon: MapPin,
      title: "Where is your restaurant located?",
      animationData: animations['location-pin'],
      render: () => (
        <textarea
          value={businessData.businessAddress || ""}
          onChange={(e) => updateData("businessAddress", e.target.value)}
          placeholder="Enter your complete business address"
          className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-green-400 transition-colors bg-gray-50 focus:bg-white h-32 resize-none"
          autoFocus
        />
      ),
      canProceed: () => Boolean(businessData.businessAddress?.trim()),
    },
    {
      icon: Utensils,
      title: "How many tables do you have?",
      animationData: animations['dining-table'],
      render: () => (
        <input
          type="number"
          value={businessData.numberOfTables || ""}
          onChange={(e) =>
            updateData("numberOfTables", parseInt(e.target.value) || 0)
          }
          placeholder="Number of tables"
          min="1"
          className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-green-400 transition-colors bg-gray-50 focus:bg-white"
          autoFocus
        />
      ),
      canProceed: () => (businessData.numberOfTables || 0) > 0,
    },
    {
      icon: Users,
      title: "How many customers visit daily on average?",
      animationData: animations['customers'],
      render: () => (
        <div>
          <input
            type="number"
            value={businessData.averageDailyCustomers || ""}
            onChange={(e) =>
              updateData(
                "averageDailyCustomers",
                parseInt(e.target.value) || 0
              )
            }
            placeholder="Average daily customers"
            min="0"
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-green-400 transition-colors bg-gray-50 focus:bg-white"
            autoFocus
          />
          <p className="text-gray-500 text-sm mt-3 text-center">
            This helps us provide better analytics (optional)
          </p>
        </div>
      ),
      canProceed: () => true,
    },
    {
      icon: Smartphone,
      title: "Do you want WhatsApp Order Integration?",
      animationData: animations['whatsapp'],
      render: () => (
        <div className="space-y-3">
          {[
            { value: true, label: "Yes, enable WhatsApp orders", emoji: "✅" },
            { value: false, label: "No, maybe later", emoji: "❌" },
          ].map((option) => (
            <button
              key={String(option.value)}
              onClick={() => updateData("whatsappOrderIntegration", option.value)}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all transform hover:scale-102 ${
                businessData.whatsappOrderIntegration === option.value
                  ? "border-green-400 bg-green-50 shadow-md"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{option.emoji}</span>
                <span className="font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      ),
      canProceed: () => businessData.whatsappOrderIntegration !== undefined,
    },
    {
      icon: CreditCard,
      title: "What payment methods do you accept?",
      animationData: animations['payment'],
      render: () => {
        const methods = [
          { name: "Cash", emoji: "💵" },
          { name: "UPI", emoji: "📱" },
          { name: "Card", emoji: "💳" },
          { name: "Mixed", emoji: "🔄" }
        ];
        const selected = businessData.paymentMethods || [];
        return (
          <div className="space-y-3">
            {methods.map((method) => (
              <button
                key={method.name}
                onClick={() => {
                  const newMethods = selected.includes(method.name)
                    ? selected.filter((m: string) => m !== method.name)
                    : [...selected, method.name];
                  updateData("paymentMethods", newMethods);
                }}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all transform hover:scale-102 ${
                  selected.includes(method.name)
                    ? "border-green-400 bg-green-50 shadow-md"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{method.emoji}</span>
                  <span className="font-medium">{method.name}</span>
                  {selected.includes(method.name) && (
                    <Check className="w-5 h-5 text-green-600 ml-auto" />
                  )}
                </div>
              </button>
            ))}
            <p className="text-gray-500 text-sm mt-4 text-center">Select all that apply</p>
          </div>
        );
      },
      canProceed: () => (businessData.paymentMethods || []).length > 0,
    },
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
      onFinish={handleFinalSubmit}
      isSubmitting={isSubmitting}
      currentStep={currentStep}
      totalSteps={8}
      animationData={step.animationData}
    >
      {step.render()}
    </QuestionCard>
  );
};

/* =========================================================
   DAIRY STEPS
========================================================= */

const DairySteps = ({
  currentStep,
  businessData,
  updateData,
  nextStep,
  prevStep,
  handleFinalSubmit,
  isSubmitting,
}: {
  currentStep: number;
  businessData: any;
  updateData: (key: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleFinalSubmit: () => void;
  isSubmitting: boolean;
}) => {
  const [animations, setAnimations] = useState<any>({});

  useEffect(() => {
    const loadAnimations = async () => {
      const animationNames = ['dairy', 'location-pin', 'dairy-products'];
      const loadedAnimations: any = {};
      
      for (const name of animationNames) {
        try {
          const response = await fetch(`/animations/${name}.json`);
          const data = await response.json();
          loadedAnimations[name] = data;
        } catch (err) {
          console.warn(`Failed to load ${name} animation:`, err);
        }
      }
      
      setAnimations(loadedAnimations);
    };

    loadAnimations();
  }, []);

  const steps = [
    {
      icon: Milk,
      title: "What's your dairy business called?",
      animationData: animations['dairy'],
      render: () => (
        <input
          type="text"
          value={businessData.businessName || ""}
          onChange={(e) => updateData("businessName", e.target.value)}
          placeholder="Enter your dairy business name"
          className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-green-400 transition-colors bg-gray-50 focus:bg-white"
          autoFocus
        />
      ),
      canProceed: () => Boolean(businessData.businessName?.trim()),
    },
    {
      icon: MapPin,
      title: "Where is your dairy business located?",
      animationData: animations['location-pin'],
      render: () => (
        <textarea
          value={businessData.businessAddress || ""}
          onChange={(e) => updateData("businessAddress", e.target.value)}
          placeholder="Enter your complete business address"
          className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-green-400 transition-colors bg-gray-50 focus:bg-white h-32 resize-none"
          autoFocus
        />
      ),
      canProceed: () => Boolean(businessData.businessAddress?.trim()),
    },
    {
      icon: Milk,
      title: "What products do you sell?",
      animationData: animations['dairy-products'],
      render: () => {
        const products = [
          { name: "Milk", emoji: "🥛" },
          { name: "Paneer", emoji: "🧀" },
          { name: "Curd", emoji: "🥣" },
          { name: "Ice Cream", emoji: "🍦" },
          { name: "Butter", emoji: "🧈" },
          { name: "Cheese", emoji: "🧀" },
        ];
        const selected = businessData.productsSold || [];
        return (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <button
                key={product.name}
                onClick={() => {
                  const newProducts = selected.includes(product.name)
                    ? selected.filter((p: string) => p !== product.name)
                    : [...selected, product.name];
                  updateData("productsSold", newProducts);
                }}
                className={`p-4 rounded-2xl border-2 text-center transition-all transform hover:scale-105 ${
                  selected.includes(product.name)
                    ? "border-green-400 bg-green-50 shadow-md"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-2">{product.emoji}</div>
                <div className="font-medium text-sm">{product.name}</div>
                {selected.includes(product.name) && (
                  <Check className="w-4 h-4 text-green-600 mx-auto mt-1" />
                )}
              </button>
            ))}
          </div>
        );
      },
      canProceed: () => (businessData.productsSold || []).length > 0,
    },
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
      onFinish={handleFinalSubmit}
      isSubmitting={isSubmitting}
      currentStep={currentStep}
      totalSteps={5}
      animationData={step.animationData}
    >
      {step.render()}
    </QuestionCard>
  );
};

/* =========================================================
   OTHER BUSINESS STEPS
========================================================= */

const OtherBusinessSteps = ({
  currentStep,
  businessData,
  updateData,
  nextStep,
  prevStep,
  handleFinalSubmit,
  isSubmitting,
}: {
  currentStep: number;
  businessData: any;
  updateData: (key: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleFinalSubmit: () => void;
  isSubmitting: boolean;
}) => {
  const [animations, setAnimations] = useState<any>({});

  useEffect(() => {
    const loadAnimations = async () => {
      const animationNames = ['store', 'store-types'];
      const loadedAnimations: any = {};
      
      for (const name of animationNames) {
        try {
          const response = await fetch(`/animations/${name}.json`);
          const data = await response.json();
          loadedAnimations[name] = data;
        } catch (err) {
          console.warn(`Failed to load ${name} animation:`, err);
        }
      }
      
      setAnimations(loadedAnimations);
    };

    loadAnimations();
  }, []);

  const steps = [
    {
      icon: Store,
      title: "What's your business called?",
      animationData: animations['store'],
      render: () => (
        <input
          type="text"
          value={businessData.businessName || ""}
          onChange={(e) => updateData("businessName", e.target.value)}
          placeholder="Enter your business name"
          className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-green-400 transition-colors bg-gray-50 focus:bg-white"
          autoFocus
        />
      ),
      canProceed: () => Boolean(businessData.businessName?.trim()),
    },
    {
      icon: ShoppingBag,
      title: "What type of store do you run?",
      animationData: animations['store-types'],
      render: () => {
        const storeTypes = [
          { name: "Mall", emoji: "🏬" },
          { name: "Grocery", emoji: "🛒" },
          { name: "Electronics", emoji: "📱" },
          { name: "Clothing", emoji: "👕" },
          { name: "Pharmacy", emoji: "💊" },
          { name: "Other", emoji: "🏪" },
        ];
        return (
          <div className="grid grid-cols-2 gap-3">
            {storeTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => updateData("storeType", type.name)}
                className={`p-4 rounded-2xl border-2 text-center transition-all transform hover:scale-105 ${
                  businessData.storeType === type.name
                    ? "border-green-400 bg-green-50 shadow-md"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-2">{type.emoji}</div>
                <div className="font-medium text-sm">{type.name}</div>
                {businessData.storeType === type.name && (
                  <Check className="w-4 h-4 text-green-600 mx-auto mt-1" />
                )}
              </button>
            ))}
          </div>
        );
      },
      canProceed: () => Boolean(businessData.storeType),
    },
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
      onFinish={handleFinalSubmit}
      isSubmitting={isSubmitting}
      currentStep={currentStep}
      totalSteps={4}
      animationData={step.animationData}
    >
      {step.render()}
    </QuestionCard>
  );
};

/* =========================================================
   DEMO MODE
========================================================= */
const DemoMode = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
    <div className="max-w-md w-full text-center">
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Code className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Setting up your demo experience
      </h2>
      <p className="text-gray-600">
        We're preparing sample data from restaurants, dairies, and retail stores for you to explore
      </p>
    </div>
  </div>
);

/* =========================================================
   MAIN ONBOARDING FLOW COMPONENT
========================================================= */
const OnboardingFlow: React.FC = () => {
  // Demo simulation - replace these with your actual hooks
  const session = { user: { isOnboardingComplete: false } };
  const status = "authenticated" as "loading" | "authenticated" | "unauthenticated";

  // State
  const [selectedSuite, setSelectedSuite] = useState<string | null>(null);
  const [businessData, setBusinessData] = useState<any>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ----------------- Demo reset ----------------- */
  useEffect(() => {
    if (selectedSuite === "demo") {
      const timer = setTimeout(() => {
        alert("Demo completed! Redirecting...");
        setSelectedSuite(null);
        setBusinessData({});
        setCurrentStep(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedSuite]);

  /* ----------------- Helpers ----------------- */
  const updateData = (key: string, value: any) => {
    setBusinessData((prev: any) => ({ ...prev, [key]: value }));
  };

  const selectSuite = (suite: string) => {
    setSelectedSuite(suite);
    setBusinessData({});
    setCurrentStep(2);
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Onboarding data:", { selectedSuite, businessData });

      alert("Onboarding completed successfully!");
      setSelectedSuite(null);
      setBusinessData({});
      setCurrentStep(0);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ----------------- Conditional render ----------------- */
  if (status === "loading" || !session) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  if (status === "unauthenticated" || !session.user){
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You must be logged in to access the onboarding flow.
          </p>
          <button
            onClick={() => window.location.href = "/new/login"}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
          >
            Login
          </button>
        </div>
      </div>
    );
  }
  if (session.user.isOnboardingComplete) {
    window.location.href = "/dashboard";
    return null;
  }

  if (currentStep === 0) return <WelcomeCard onNext={nextStep} />;
  if (currentStep === 1) return <SuiteSelector onSelect={selectSuite} />;

  if (selectedSuite === "demo") return <DemoMode />;

  if (selectedSuite === "restaurant")
    return (
      <RestaurantSteps
        currentStep={currentStep}
        businessData={businessData}
        updateData={updateData}
        nextStep={nextStep}
        prevStep={prevStep}
        handleFinalSubmit={handleFinalSubmit}
        isSubmitting={isSubmitting}
      />
    );

  if (selectedSuite === "dairy")
    return (
      <DairySteps
        currentStep={currentStep}
        businessData={businessData}
        updateData={updateData}
        nextStep={nextStep}
        prevStep={prevStep}
        handleFinalSubmit={handleFinalSubmit}
        isSubmitting={isSubmitting}
      />
    );

  if (selectedSuite === "other")
    return (
      <OtherBusinessSteps
        currentStep={currentStep}
        businessData={businessData}
        updateData={updateData}
        nextStep={nextStep}
        prevStep={prevStep}
        handleFinalSubmit={handleFinalSubmit}
        isSubmitting={isSubmitting}
      />
    );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Onboarding Complete!
        </h2>
        <p className="text-gray-600 mb-6">
          Welcome to BizTracker. Your business profile has been set up successfully.
        </p>
        <button
          onClick={() => {
            setSelectedSuite(null);
            setBusinessData({});
            setCurrentStep(0);
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default OnboardingFlow;