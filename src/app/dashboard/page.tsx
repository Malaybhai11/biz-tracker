"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Eye
} from "lucide-react";

export default function Home() {
  return (
    <div className="px-4 py-10 flex justify-center">
      <div className="w-full max-w-6xl space-y-12">
        
        {/* Welcome Header */}
        <section className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BizTracker Dashboard
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Welcome back! Here's what's happening with your business today.
          </p>
          <Badge variant="secondary" className="text-sm mx-auto">
            <Clock className="h-3 w-3 mr-1" />
            Last updated: {new Date().toLocaleTimeString()}
          </Badge>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <DollarSign className="h-8 w-8 text-muted-foreground" />,
              title: "Total Revenue",
              value: "₹45,231",
              change: "+20.1% from last month",
              color: "text-green-600",
              arrowColor: "text-green-500"
            },
            {
              icon: <Users className="h-8 w-8 text-muted-foreground" />,
              title: "Active Riders",
              value: "12",
              change: "+2 new this week",
              color: "text-blue-600",
              arrowColor: "text-green-500"
            },
            {
              icon: <Package className="h-8 w-8 text-muted-foreground" />,
              title: "Inventory Items",
              value: "234",
              change: "-5 low stock items",
              color: "text-purple-600",
              arrowColor: "text-red-500"
            },
            {
              icon: <ShoppingCart className="h-8 w-8 text-muted-foreground" />,
              title: "Orders Today",
              value: "28",
              change: "+12% from yesterday",
              color: "text-orange-600",
              arrowColor: "text-green-500"
            }
          ].map((stat, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow text-center">
              <CardHeader className="flex flex-col items-center space-y-2">
                {stat.icon}
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="flex items-center justify-center text-xs text-muted-foreground mt-2">
                  <ArrowUpRight className={`h-3 w-3 mr-1 ${stat.arrowColor}`} />
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Plus className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common tasks to manage your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-center">
                <Users className="h-4 w-4 mr-2" />
                Add New Rider
              </Button>
              <Button className="w-full justify-center" variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Update Inventory
              </Button>
              <Button className="w-full justify-center" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Sales Report
              </Button>
              <Button className="w-full justify-center" variant="outline">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Process New Order
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="flex justify-center">
          <Card className="w-full max-w-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-none">
            <CardContent className="pt-6 text-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Ready to grow your business?</h3>
                <p className="text-muted-foreground">
                  Explore advanced analytics and insights to take your delivery business to the next level.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Eye className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button size="lg" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Service
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
