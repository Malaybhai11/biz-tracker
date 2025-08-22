"use client";

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  ShoppingCart,
  BarChart3,
  DollarSign,
  Package,
  Clock,
  ArrowUpRight,
  Plus,
  Eye,
  Bell,
  Search,
  Settings,
  User,
  MapPin,
  Calendar,
  MessageSquare,
  Truck,
  ChefHat,
  Utensils,
  Coffee
} from "lucide-react";
import { useSession } from 'next-auth/react';

export default function BizTrackerDashboard() {

  const session = useSession();
  console.log(session);
  const [greeting, setGreeting] = useState('');
  // Mock user data - in real app this would come from session/database
  const [user] = useState({
    name: session.data?.user.name || 'Gentle User',
    selectedSuite: 'User.Selected', // Can be 'restaurant', 'dairy', 'other', or 'demo'
    business: {
      businessName: 'Malay\'s Kitchen',
      businessType: 'restaurant'
    }
  });
  
  const currentTime = new Date();

  useEffect(() => {
    const hour = currentTime.getHours();
    const greetings = [
      { condition: hour < 12, messages: ['Good morning, Malay! ☀️', 'Hey Malay, ready to conquer today? 🚀', 'Morning sunshine, Malay! ✨'] },
      { condition: hour < 17, messages: ['Good afternoon, Malay! 🌤️', 'Hey Malay, crushing it today! 💪', 'Afternoon warrior, Malay! ⚡'] },
      { condition: hour >= 17, messages: ['Good evening, Malay! 🌙', 'Hey Malay, winding down nicely! 🌆', 'Evening champion, Malay! 🌟'] }
    ];

    const currentGreeting = greetings.find(g => g.condition);
    if (currentGreeting) {
      const randomMessage = currentGreeting.messages[Math.floor(Math.random() * currentGreeting.messages.length)];
      setGreeting(randomMessage);
    }
  }, []);

  interface Metric {
    title: string;
    value: string;
    change: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: string;
  }

  const getMetricsForSuite = (suiteType: string): Metric[] => {
    const baseMetrics: Metric[] = [
      { title: 'Total Inventory Items', value: '1,247', change: '+12.5%', icon: Package, color: 'from-blue-400 to-blue-600' },
      { title: "Today's Sales", value: '₹24,689', change: '+8.2%', icon: DollarSign, color: 'from-green-400 to-green-600' }
    ];

    switch (suiteType) {
      case 'restaurant':
        return [
          ...baseMetrics,
          { title: 'Active Tables', value: '18/25', change: '+5.1%', icon: Utensils, color: 'from-purple-400 to-purple-600' },
          { title: 'Pending Orders', value: '156', change: '+15.3%', icon: ShoppingCart, color: 'from-orange-400 to-orange-600' }
        ];
      case 'dairy':
        return [
          ...baseMetrics,
          { title: 'Active Riders', value: '23', change: '+5.1%', icon: Truck, color: 'from-purple-400 to-purple-600' },
          { title: 'Pending Deliveries', value: '156', change: '+15.3%', icon: ShoppingCart, color: 'from-orange-400 to-orange-600' }
        ];
      case 'other':
        return [
          ...baseMetrics,
          { title: 'SKUs in Stock', value: '892', change: '+3.2%', icon: Package, color: 'from-purple-400 to-purple-600' },
          { title: 'Pending Orders', value: '45', change: '+8.7%', icon: ShoppingCart, color: 'from-orange-400 to-orange-600' }
        ];
      default:
        return baseMetrics;
    }
  };

  interface Feature {
    title: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    desc: string;
  }

  const getFeaturesForSuite = (suiteType: string): Feature[] => {
    const baseFeatures: Feature[] = [
      { title: 'Inventory Management', icon: Package, desc: 'Real-time stock tracking & alerts' },
      { title: 'Sales Analytics', icon: BarChart3, desc: 'Advanced reporting & insights' }
    ];

    switch (suiteType) {
      case 'restaurant':
        return [
          ...baseFeatures,
          { title: 'Table Management', icon: Utensils, desc: 'Real-time table status & reservations' },
          { title: 'Kitchen Display', icon: ChefHat, desc: 'Order priority & timing system' },
          { title: 'Menu Management', icon: Coffee, desc: 'Dynamic pricing & availability' },
          { title: 'WhatsApp Orders', icon: MessageSquare, desc: 'Direct order processing' }
        ];
      case 'dairy':
        return [
          ...baseFeatures,
          { title: 'Rider Management', icon: Truck, desc: 'Live GPS & route optimization' },
          { title: 'Delivery Tracking', icon: MapPin, desc: 'Real-time delivery updates' },
          { title: 'WhatsApp Bot', icon: MessageSquare, desc: 'Automated order tracking' },
          { title: 'Expiry Tracking', icon: Clock, desc: 'Product freshness monitoring' }
        ];
      case 'other':
        return [
          ...baseFeatures,
          { title: 'Barcode Scanning', icon: Eye, desc: 'Quick inventory updates' },
          { title: 'Auto Reorder', icon: Plus, desc: 'Smart stock replenishment' },
          { title: 'Profit Analysis', icon: TrendingUp, desc: 'Detailed margin insights' },
          { title: 'Staff Management', icon: Users, desc: 'Employee scheduling & tracking' }
        ];
      default:
        return baseFeatures;
    }
  };

  interface RecentActivity {
    action: string;
    time: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }

  const getRecentActivitiesForSuite = (suiteType: string): RecentActivity[] => {
    switch (suiteType) {
      case 'restaurant':
        return [
          { action: 'New table order received', time: '2 minutes ago', icon: ShoppingCart },
          { action: 'Table 5 order completed', time: '15 minutes ago', icon: Utensils },
          { action: 'Kitchen display updated', time: '1 hour ago', icon: ChefHat },
          { action: 'Daily sales report generated', time: '2 hours ago', icon: BarChart3 }
        ];
      case 'dairy':
        return [
          { action: 'New delivery order received', time: '2 minutes ago', icon: ShoppingCart },
          { action: 'Rider completed milk delivery', time: '15 minutes ago', icon: Truck },
          { action: 'Product expiry alert triggered', time: '1 hour ago', icon: Clock },
          { action: 'Daily route optimization done', time: '2 hours ago', icon: MapPin }
        ];
      case 'other':
        return [
          { action: 'New order received', time: '2 minutes ago', icon: ShoppingCart },
          { action: 'Inventory auto-reorder triggered', time: '15 minutes ago', icon: Plus },
          { action: 'Barcode scan completed', time: '1 hour ago', icon: Eye },
          { action: 'Staff shift schedule updated', time: '2 hours ago', icon: Users }
        ];
      default:
        return [
          { action: 'New order received', time: '2 minutes ago', icon: ShoppingCart },
          { action: 'Inventory updated', time: '15 minutes ago', icon: Package },
          { action: 'Sales report generated', time: '1 hour ago', icon: BarChart3 },
          { action: 'System backup completed', time: '2 hours ago', icon: Settings }
        ];
    }
  };

  const getSuiteDisplayName = (suiteType: 'restaurant' | 'dairy' | 'other' | 'demo') => {
    const names = {
      'restaurant': 'Restaurant Management',
      'dairy': 'Dairy Operations',
      'other': 'Business Management',
      'demo': 'Demo Dashboard'
    };
    return names[suiteType] || 'Business Management';
  };

  const metrics = getMetricsForSuite(user.selectedSuite);
  const features = getFeaturesForSuite(user.selectedSuite);
  const recentActivities = getRecentActivitiesForSuite(user.selectedSuite);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Styles */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes floatingOrb {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.4;
          }
          25% { 
            transform: translateY(-15px) translateX(8px) scale(1.05);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-8px) translateX(-10px) scale(0.95);
            opacity: 0.8;
          }
          75% { 
            transform: translateY(10px) translateX(3px) scale(1.02);
            opacity: 0.5;
          }
        }

        @keyframes gentleGlow {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes subtleDrift {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-20px) translateX(10px);
            opacity: 0.4;
          }
        }

        @keyframes nebula {
          0%, 100% { 
            opacity: 0.1; 
            transform: scale(1) rotate(0deg);
          }
          50% { 
            opacity: 0.3; 
            transform: scale(1.1) rotate(180deg);
          }
        }

        @keyframes slideInGlass {
          0% { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 100%);
          filter: blur(2px);
        }

        .glow-dot {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(147, 197, 253, 0.3) 40%, transparent 100%);
          filter: blur(1px);
        }

        .star {
          animation: twinkle 2s ease-in-out infinite;
        }

        .nebula {
          animation: nebula 20s ease-in-out infinite;
        }

        .glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          animation: slideInGlass 0.8s ease-out;
        }

        .glass-header {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
          backdrop-filter: blur(25px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .metric-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.1) 100%);
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        .feature-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
        }

        .feature-card:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
          transform: scale(1.02);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-black overflow-hidden pointer-events-none z-0">
        {/* Nebula clouds */}
        <div className="absolute inset-0">
          <div className="nebula absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
          <div className="nebula absolute top-32 right-20 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-indigo-500/10 rounded-full blur-3xl" style={{animationDelay: '5s'}} />
          <div className="nebula absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl" style={{animationDelay: '10s'}} />
        </div>

        {/* Twinkling stars */}
        <div className="absolute inset-0">
          {[...Array(150)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="star absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: Math.random() > 0.8 ? '3px' : Math.random() > 0.6 ? '2px' : '1px',
                height: Math.random() > 0.8 ? '3px' : Math.random() > 0.6 ? '2px' : '1px',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                filter: Math.random() > 0.7 ? 'drop-shadow(0 0 4px #fff)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`orb-${i}`}
              className="floating-orb"
              style={{
                top: `${15 + Math.random() * 70}%`,
                left: `${10 + Math.random() * 80}%`,
                width: `${30 + Math.random() * 50}px`,
                height: `${30 + Math.random() * 50}px`,
                animation: `floatingOrb ${6 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Glow dots */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={`glow-${i}`}
              className="glow-dot"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${15 + Math.random() * 70}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                animation: `gentleGlow ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Drifting particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={`drift-${i}`}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `subtleDrift ${8 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="glass-header px-6 py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">BizTracker</h1>
                <p className="text-blue-200 text-sm">{getSuiteDisplayName(user.selectedSuite as 'restaurant' | 'dairy' | 'other' | 'demo')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="glass-card p-2 rounded-full hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5 text-white" />
              </button>
              <button className="glass-card p-2 rounded-full hover:bg-white/10 transition-colors">
                <Settings className="w-5 h-5 text-white" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-8">
          {/* Welcome Section */}
          <div className="glass-card p-8 rounded-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">{greeting}</h2>
                <p className="text-blue-200 text-lg">
                  Welcome back to your {user.business?.businessName || 'BizTracker'} dashboard. Here's what's happening with your {getSuiteDisplayName(user.selectedSuite as 'restaurant' | 'dairy' | 'other' | 'demo').toLowerCase()} today.
                </p>
                <div className="mt-4 flex items-center space-x-4 text-blue-300">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Jamnagar, Gujarat
                  </span>
                </div>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105">
                  Quick Actions
                </button>
                <button className="glass-card px-6 py-3 rounded-xl text-white hover:bg-white/10 transition-colors">
                  View Reports
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div key={index} className="metric-card p-6 rounded-2xl group cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-400 text-sm font-semibold flex items-center">
                      {metric.change}
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                    <p className="text-blue-200 text-sm">{metric.title}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Access Features */}
          <div className="glass-card p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Quick Access</h3>
              <button className="text-blue-300 hover:text-white transition-colors">
                View All Features →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="feature-card p-6 rounded-2xl cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
                    </div>
                    <p className="text-blue-200 text-sm">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3">
                          <IconComponent className="w-4 h-4 text-blue-300" />
                        </div>
                        <span className="text-white">{activity.action}</span>
                      </div>
                      <span className="text-blue-300 text-sm">{activity.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance Overview */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Today's Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Revenue Target</span>
                  <span className="text-white font-semibold">₹30,000</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{width: '82%'}}></div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400">82%</p>
                    <p className="text-blue-200 text-sm">Target Achieved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-400">23</p>
                    <p className="text-blue-200 text-sm">Orders/Hour</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Message */}
          <div className="glass-card p-6 rounded-2xl text-center">
            <p className="text-blue-200 mb-2">
              Built with ❤️ by <span className="text-white font-semibold">Malay Raval</span>
            </p>
            <p className="text-blue-300 text-sm">
              17-year-old dreamer on a journey to MAANG 🚀 | Passionate about DSA, Next.js, and AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}