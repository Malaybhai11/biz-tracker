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
  Package
} from "lucide-react"

export default function MainLanding() {
  const [activeItem, setActiveItem] = useState("home")
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const navigationItems = [
    { href: "/", id: "home", label: "Dashboard", icon: Home },
    { href: "/riders", id: "riders", label: "Riders", icon: Users },
    { href: "/inventory", id: "inventory", label: "Inventory", icon: Package },
    { href: "/analytics", id: "analytics", label: "Analytics", icon: BarChart2 },
  ]

  const quickActions = [
    {
      title: "View Sales Trends",
      description: "Analyze your recent performance",
      icon: TrendingUp,
      action: () => {
        alert("Navigating to sales trends analysis! 📈")
        setIsQuickActionsOpen(false)
      }
    },
    {
      title: "Check Inventory Alerts",
      description: "Review low stock items",
      icon: Package,
      action: () => {
        alert("Showing inventory alerts! 📦")
        setIsQuickActionsOpen(false)
      }
    },
    {
      title: "Rider Performance",
      description: "Monitor delivery metrics",
      icon: Activity,
      action: () => {
        alert("Opening rider performance dashboard! 🚴‍♂️")
        setIsQuickActionsOpen(false)
      }
    }
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
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
      {/*Got these from DEEP Web SEARCH*/}
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
      {/* Background with nebula and stars */}
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

      {/* Enhanced glassmorphism navbar */}
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

            {/* Enhanced Navigation Menu */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="flex gap-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.id
                  
                  return (
                    <NavigationMenuItem key={item.id}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink 
                          className={`${navigationMenuTriggerStyle()} relative transition-all duration-300 hover:scale-105 ${
                            isActive 
                              ? 'bg-white/90 text-gray-900 border border-white/20 shadow-lg backdrop-blur-sm font-semibold' 
                              : 'bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/10'
                          }`}
                          onClick={() => setActiveItem(item.id)}
                        >
                          <Icon className={`mr-2 h-4 w-4 ${isActive ? 'text-gray-700' : 'text-white/80'}`} />
                          {item.label}
                          {isActive && (
                            <div className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full shadow-lg" />
                          )}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )
                })}

                {/* Custom Quick Actions Dropdown */}
                <NavigationMenuItem>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                      className={`${navigationMenuTriggerStyle()} group bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 flex items-center gap-2`}
                    >
                      <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                      Quick Actions
                      <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isQuickActionsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Custom Dropdown Content */}
                    {isQuickActionsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
                          <h3 className="font-semibold text-lg">Smart Suggestions</h3>
                          <p className="text-purple-100 text-sm">AI-powered business insights</p>
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
                <span className="text-sm font-medium text-white hidden sm:block drop-shadow-sm">Admin</span>
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
                <Link key={item.id} href={item.href}>
                  <button 
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                      isActive 
                        ? 'text-blue-300 bg-white/10 backdrop-blur-sm' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setActiveItem(item.id)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Professional Dashboard Content */}
      <main className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Business Intelligence Dashboard
            </h1>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Streamline your operations with real-time tracking for inventory, sales, deliveries, and more
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
              <Link href="/new/signup">
              Get Started
              </Link>
            </button>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Package className="h-6 w-6 text-blue-400" />
                </div>
                <span className="text-sm text-green-400 font-medium">+12.5%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">1,247</h3>
              <p className="text-gray-300 text-sm">Total Inventory Items</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <BarChart2 className="h-6 w-6 text-green-400" />
                </div>
                <span className="text-sm text-green-400 font-medium">+8.2%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">₹24,689</h3>
              <p className="text-gray-300 text-sm">Today's Sales</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <span className="text-sm text-green-400 font-medium">+5.1%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">23</h3>
              <p className="text-gray-300 text-sm">Active Riders</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-orange-400" />
                </div>
                <span className="text-sm text-green-400 font-medium">+15.3%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">156</h3>
              <p className="text-gray-300 text-sm">Pending Orders</p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Inventory Management */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-blue-500/20 rounded-xl mr-4">
                  <Package className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Inventory Management</h3>
                  <p className="text-gray-400 text-sm">Real-time stock tracking</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Low stock alerts & auto-reorder
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Barcode scanning integration
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Supplier management system
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Expiry date tracking
                </li>
              </ul>
            </div>

            {/* Sales Analytics */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-green-500/20 rounded-xl mr-4">
                  <BarChart2 className="h-8 w-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Sales Analytics</h3>
                  <p className="text-gray-400 text-sm">Advanced reporting tools</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Real-time revenue tracking
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Customer behavior insights
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Profit margin analysis
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Forecasting & predictions
                </li>
              </ul>
            </div>

            {/* Delivery Tracking */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-purple-500/20 rounded-xl mr-4">
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Delivery Management</h3>
                  <p className="text-gray-400 text-sm">Rider & route optimization</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Live GPS tracking of riders
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Automated route optimization
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Delivery time predictions
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Performance analytics
                </li>
              </ul>
            </div>
          </div>

          {/* Restaurant Specific Features */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Restaurant Management Suite</h2>
              <p className="text-gray-300 text-lg">Specialized tools for food service businesses</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="p-4 bg-red-500/20 rounded-xl w-fit mx-auto mb-4">
                  <div className="h-8 w-8 bg-red-400 rounded-lg mx-auto"></div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Table Management</h4>
                <p className="text-gray-400 text-sm">Real-time table status, reservations, and seating optimization</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-yellow-500/20 rounded-xl w-fit mx-auto mb-4">
                  <div className="h-8 w-8 bg-yellow-400 rounded-lg mx-auto"></div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Order Processing</h4>
                <p className="text-gray-400 text-sm">Kitchen display system with order priority and timing</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-indigo-500/20 rounded-xl w-fit mx-auto mb-4">
                  <div className="h-8 w-8 bg-indigo-400 rounded-lg mx-auto"></div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Menu Management</h4>
                <p className="text-gray-400 text-sm">Dynamic pricing, availability control, and item analytics</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-teal-500/20 rounded-xl w-fit mx-auto mb-4">
                  <div className="h-8 w-8 bg-teal-400 rounded-lg mx-auto"></div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Staff Scheduling</h4>
                <p className="text-gray-400 text-sm">Automated scheduling with shift management and payroll</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Dairy Management Suite</h2>
              <p className="text-gray-300 text-lg">Specialized tools for Dairy Product service businesses</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="p-4 bg-red-500/20 rounded-xl w-fit mx-auto mb-4">
                  <div className="h-8 w-8 bg-red-400 rounded-lg mx-auto"></div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Riders Management</h4>
                <p className="text-gray-400 text-sm">Real-time table status, Orders, and Time optimization</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-yellow-500/20 rounded-xl w-fit mx-auto mb-4">
                  <div className="h-8 w-8 bg-yellow-400 rounded-lg mx-auto"></div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Order Processing</h4>
                <p className="text-gray-400 text-sm">Track and manage order updates directly from WhatsApp — no extra tools needed.</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-indigo-500/20 rounded-xl w-fit mx-auto mb-4">
                  <div className="h-8 w-8 bg-indigo-400 rounded-lg mx-auto"></div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Whatsapp Bot</h4>
                <p className="text-gray-400 text-sm">Automated Whatsapp Bot To Track Changes In Daily</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-teal-500/20 rounded-xl w-fit mx-auto mb-4">
                  <div className="h-8 w-8 bg-teal-400 rounded-lg mx-auto"></div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Advanced Staff Information</h4>
                <p className="text-gray-400 text-sm">Enjoy Riders Performances & Stats On Dashboard Only</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Built By Malay Raval.</h2>
            <p className="text-gray-300 text-lg mb-8">
              Hi, I`m Malay Raval, a 17-year-old student who Dreams to be MAANG engineer.
              Passionate about DSA, Next.js, and AI-driven apps, always building to learn and grow.
              Currently working on BizTracker to simplify business management with smart tech.
              Dreaming big, building big — on a journey to become Software Developer.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Get Started Today</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
                <Link href="/new/signup">
                  Start For Free
                </Link>
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Link href="/Demo">
                  View Demo
                </Link>
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Link href="/About">
                  Know More About Malay
                </Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}