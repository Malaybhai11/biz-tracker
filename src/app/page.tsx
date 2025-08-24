"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { 
  Home, 
  Settings, 
  Users, 
  ShoppingCart, 
  BarChart2, 
  Sparkles, 
  Bell, 
  User,
  ChevronDown,
  Activity,
  TrendingUp,
  Package,
  Utensils,
  Milk,
  Monitor,
  Star
} from "lucide-react"

export default function MainLanding() {
  const [activeItem, setActiveItem] = useState("home")
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navigationItems = [
    { href: "#home", id: "home", label: "Home", icon: Home },
    { href: "#dashboard", id: "dashboard", label: "Dashboard", icon: Monitor },
    { href: "#restaurant", id: "restaurant", label: "Restaurant Suite", icon: Utensils },
    { href: "#dairy", id: "dairy", label: "Dairy Suite", icon: Milk },
  ]

  const quickActions = [
    {
      title: "Business Strategy Advice",
      description: "Get AI-powered business insights",
      icon: TrendingUp,
      action: () => {
        window.location.href = "/ai"
      }
    },
    {
      title: "Operations Optimization",
      description: "Streamline your workflows with AI",
      icon: Activity,
      action: () => {
        window.location.href = "/ai"
      }
    },
    {
      title: "Smart Analytics Questions",
      description: "Ask AI about your business data",
      icon: BarChart2,
      action: () => {
        window.location.href = "/ai"
      }
    }
  ]

  // Smooth scroll function
  const scrollToSection = (href : string, id : string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setActiveItem(id)
      }
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsQuickActionsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      {/*Enhanced Cosmic Background Animations*/}
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
      `}</style>
      {/* Enhanced Cosmic Background */}
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

        {/* Subtle floating orbs */}
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

        {/* Professional glow dots */}
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

        {/* Clean drifting particles */}
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

      {/* Enhanced Landing Page Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Enhanced Brand / Logo */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <span className="text-xl font-bold text-white">B</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white drop-shadow-lg">BizTracker</span>
                <span className="text-xs text-blue-200 font-medium">Business Intelligence</span>
              </div>
            </div>

            {/* Landing Page Navigation Menu */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="flex gap-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.id
                  
                  return (
                    <NavigationMenuItem key={item.id}>
                      <NavigationMenuLink 
                        className={`${navigationMenuTriggerStyle()} relative transition-all duration-300 hover:scale-105 cursor-pointer ${
                          isActive 
                            ? 'bg-white/90 text-gray-900 border border-white/20 shadow-lg backdrop-blur-sm font-semibold' 
                            : 'bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/10'
                        }`}
                        onClick={() => scrollToSection(item.href, item.id)}
                      >
                        <Icon className={`mr-2 h-4 w-4 ${isActive ? 'text-gray-700' : 'text-white/80'}`} />
                        {item.label}
                        {isActive && (
                          <div className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full shadow-lg" />
                        )}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                })}

                {/* Enhanced AI-Powered Quick Actions Dropdown */}
                <NavigationMenuItem>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                      className={`${navigationMenuTriggerStyle()} group bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 flex items-center gap-2`}
                    >
                      <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                      AI Assistant
                      <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isQuickActionsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* AI-Powered Dropdown Content */}
                    {isQuickActionsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Star className="h-5 w-5" />
                            AI Business Assistant
                          </h3>
                          <p className="text-purple-100 text-sm">Get intelligent insights for your business</p>
                        </div>
                        <div className="p-2 space-y-1">
                          {quickActions.map((action, index) => {
                            const Icon = action.icon
                            return (
                              <button
                                key={index}
                                onClick={action.action}
                                className="group w-full cursor-pointer flex items-start gap-3 rounded-lg p-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:scale-[1.02] text-left backdrop-blur-sm"
                              >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 border border-white/20">
                                  <Icon className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-200" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-white group-hover:text-blue-200 transition-colors duration-200">
                                    {action.title}
                                  </p>
                                  <p className="text-sm text-gray-400 group-hover:text-blue-300 transition-colors duration-200">
                                    {action.description}
                                  </p>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20">
                  <Bell className="h-4 w-4 text-gray-200" />
                </button>
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <span className="text-xs font-bold text-white">3</span>
                </div>
              </div>

              {/* Settings */}
              <Link href="/settings">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20">
                  <Settings className="h-4 w-4 text-gray-200" />
                </button>
              </Link>

              {/* User Profile */}
              <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 pr-4 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20">
                <div className="h-8 w-8 rounded-full bg-white/90 flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-700" />
                </div>
                <span className="text-sm font-medium text-white hidden sm:block drop-shadow-sm">Get Started</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="flex items-center justify-around py-2">
            {navigationItems.slice(0, 4).map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id
              return (
                <button 
                  key={item.id}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    isActive 
                      ? 'text-blue-300 bg-white/10 backdrop-blur-sm' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => scrollToSection(item.href, item.id)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Enhanced Landing Page Content */}
      <main className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          {/* Hero Section */}
          <section id="home" className="mb-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Business Intelligence Platform
            </h1>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Transform your business with AI-powered analytics, automated operations, and intelligent insights
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link href="/new/signup">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
                  Start Free Trial
                </button>
              </Link>
              <Link href="/Demo">
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  Watch Demo
                </button>
              </Link>
            </div>
          </section>

          {/* Personalized Dashboard Section */}
          <section id="dashboard" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Personalized Dashboard Experience</h2>
              <p className="text-xl text-blue-200 mb-8 max-w-4xl mx-auto">
                Every business is unique. Our AI-powered dashboard adapts to your specific industry, size, and goals, 
                providing personalized insights that matter to your success.
              </p>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Monitor className="h-6 w-6 text-blue-400" />
                  </div>
                  <span className="text-sm text-green-400 font-medium">Personalized</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Smart Widgets</h3>
                <p className="text-gray-300 text-sm">AI-curated data visualization</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <BarChart2 className="h-6 w-6 text-green-400" />
                  </div>
                  <span className="text-sm text-green-400 font-medium">Real-time</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Live Analytics</h3>
                <p className="text-gray-300 text-sm">Instant business insights</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-sm text-green-400 font-medium">Predictive</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">AI Forecasting</h3>
                <p className="text-gray-300 text-sm">Future trend predictions</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <Sparkles className="h-6 w-6 text-orange-400" />
                  </div>
                  <span className="text-sm text-green-400 font-medium">Adaptive</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Smart Alerts</h3>
                <p className="text-gray-300 text-sm">Intelligent notifications</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Why Personalized Dashboards Matter</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></div>
                      <span><strong className="text-white">Industry-Specific Metrics:</strong> Track KPIs that actually matter for your business type</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></div>
                      <span><strong className="text-white">Role-Based Views:</strong> Different insights for owners, managers, and staff</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2"></div>
                      <span><strong className="text-white">Learning Algorithm:</strong> Gets smarter as it learns your business patterns</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2"></div>
                      <span><strong className="text-white">Custom Workflows:</strong> Automate tasks based on your unique processes</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-8 border border-white/10">
                    <Monitor className="h-20 w-20 text-blue-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-white mb-2">Experience the Difference</h4>
                    <p className="text-gray-300 text-sm mb-4">See how a personalized dashboard can transform your business operations</p>
                    <Link href="/Demo">
                      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                        Try Interactive Demo
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Restaurant Management Suite */}
          <section id="restaurant" className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Utensils className="h-8 w-8 text-orange-400" />
                <h2 className="text-3xl font-bold text-white">Restaurant Management Suite</h2>
              </div>
              <p className="text-gray-300 text-lg">Complete restaurant operations platform with AI-powered optimization</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="p-4 bg-red-500/20 rounded-xl w-fit mx-auto mb-4">
                  <div className="h-8 w-8 bg-red-400 rounded-lg mx-auto"></div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Smart Table Management</h4>
                <p className="text-gray-400 text-sm">AI-optimized seating, real-time availability, and automated reservation system</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-yellow-500/20 rounded-xl w-fit mx-auto mb-4">
                  <div className="h-8 w-8 bg-yellow-400 rounded-lg mx-auto"></div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Kitchen Intelligence</h4>
                <p className="text-gray-400 text-sm">Smart order prioritization, prep time optimization, and staff coordination</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-indigo-500/20 rounded-xl w-fit mx-auto mb-4">
                  <div className="h-8 w-8 bg-indigo-400 rounded-lg mx-auto"></div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Dynamic Menu Control</h4>
                <p className="text-gray-400 text-sm">AI-driven pricing, popularity tracking, and real-time availability updates</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-teal-500/20 rounded-xl w-fit mx-auto mb-4">
                  <div className="h-8 w-8 bg-teal-400 rounded-lg mx-auto"></div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Staff Optimization</h4>
                <p className="text-gray-400 text-sm">Predictive scheduling, performance analytics, and automated shift management</p>
              </div>
            </div>
          </section>

          {/* Dairy Management Suite */}
          <section id="dairy" className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Milk className="h-8 w-8 text-blue-400" />
                <h2 className="text-3xl font-bold text-white">Dairy Management Suite</h2>
              </div>
              <p className="text-gray-300 text-lg">Specialized dairy business automation with WhatsApp integration</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="p-4 bg-blue-500/20 rounded-xl w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-400 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Smart Rider Management</h4>
                <p className="text-gray-400 text-sm">Real-time tracking, route optimization, and delivery performance analytics</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-green-500/20 rounded-xl w-fit mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-green-400 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">WhatsApp Order System</h4>
                <p className="text-gray-400 text-sm">Automated order processing directly from WhatsApp messages with AI parsing</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-purple-500/20 rounded-xl w-fit mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-purple-400 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Intelligent WhatsApp Bot</h4>
                <p className="text-gray-400 text-sm">24/7 customer support, order updates, and automated daily reports</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-orange-500/20 rounded-xl w-fit mx-auto mb-4">
                  <BarChart2 className="h-8 w-8 text-orange-400 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Advanced Analytics</h4>
                <p className="text-gray-400 text-sm">Rider performance insights, delivery metrics, and customer behavior analysis</p>
              </div>
            </div>

            {/* Additional Dairy Features */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-400" />
                  Inventory Intelligence
                </h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Expiry date tracking and alerts</li>
                  <li>• Automatic reorder suggestions</li>
                  <li>• Temperature monitoring integration</li>
                  <li>• Quality assurance workflows</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Customer Insights
                </h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Purchase pattern analysis</li>
                  <li>• Subscription management automation</li>
                  <li>• Personalized product recommendations</li>
                  <li>• Customer lifetime value tracking</li>
                </ul>
              </div>
            </div>
          </section>

          {/* AI-Powered Features */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">AI-Powered Business Intelligence</h2>
              <p className="text-xl text-blue-200 mb-8 max-w-4xl mx-auto">
                Our advanced AI doesn't just collect data—it understands your business and provides actionable insights
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* AI Analytics */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-blue-500/20 rounded-xl mr-4">
                    <BarChart2 className="h-8 w-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Smart Analytics</h3>
                    <p className="text-gray-400 text-sm">AI-driven business insights</p>
                  </div>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Predictive trend analysis
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Anomaly detection & alerts
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Customer behavior insights
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Revenue optimization suggestions
                  </li>
                </ul>
              </div>

              {/* AI Automation */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-green-500/20 rounded-xl mr-4">
                    <Sparkles className="h-8 w-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Process Automation</h3>
                    <p className="text-gray-400 text-sm">Intelligent workflow management</p>
                  </div>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Automated inventory reordering
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Smart scheduling optimization
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Dynamic pricing adjustments
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Intelligent task prioritization
                  </li>
                </ul>
              </div>

              {/* AI Assistant */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-purple-500/20 rounded-xl mr-4">
                    <Star className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI Business Assistant</h3>
                    <p className="text-gray-400 text-sm">Your intelligent business advisor</p>
                  </div>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Natural language queries
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Strategic recommendations
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Performance optimization tips
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    24/7 business guidance
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Creator Section */}
          <section className="text-center mb-16">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-6">Built by Malay Raval</h2>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">MR</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-white">Malay Raval</h3>
                    <p className="text-blue-200">17-year-old Full-Stack Developer</p>
                    <p className="text-gray-400 text-sm">Aspiring MAANG Engineer</p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Hi! I'm a passionate 17-year-old student with big dreams of becoming a MAANG engineer. 
                  I specialize in Data Structures & Algorithms, Next.js, and AI-driven applications. 
                  BizTracker represents my vision of using cutting-edge technology to solve real business problems.
                  Every line of code is written with the goal of making business operations smarter, faster, and more efficient.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Technical Skills</h4>
                    <p className="text-sm text-gray-300">Next.js, React, Node.js, Python, AI/ML, DSA</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Vision</h4>
                    <p className="text-sm text-gray-300">Democratizing business intelligence through AI</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Goal</h4>
                    <p className="text-sm text-gray-300">Software Engineer at top tech companies</p>
                  </div>
                </div>
                <Link href="/About">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                    Learn More About My Journey
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-12 border border-white/20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Join thousands of businesses already using BizTracker to streamline operations, 
                boost productivity, and make data-driven decisions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/new/signup">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
                    Start Your Free Trial
                  </button>
                </Link>
                <Link href="/Demo">
                  <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    Explore Features
                  </button>
                </Link>
                <Link href="/ai">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Try AI Assistant
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}