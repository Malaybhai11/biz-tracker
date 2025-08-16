"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Home, Settings, Users, ShoppingCart, BarChart2, Sparkles } from "lucide-react"

export function AppNavbar() {
  return (
    <nav className="w-full border-b bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 font-semibold text-lg">
          🤖 BizTracker
        </div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/riders" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Users className="mr-2 h-4 w-4" />
                  Riders
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/inventory" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Inventory
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/sales" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Sales & Profits
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/settings" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Quick Actions Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Quick Actions
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-4">
                <NavigationMenuLink
                  onClick={() =>
                    alert("Here's an AI suggestion: Try reviewing your sales trends today! 🚀")
                  }
                  className="cursor-pointer flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted"
                >
                  <Sparkles className="h-4 w-4" />
                  Suggest me something
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}