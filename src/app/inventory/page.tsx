import { Package } from "lucide-react";

export default function InventoryPage() {
  return (
    <div className="px-4 py-10 flex justify-center">
      <div className="w-full max-w-6xl space-y-12">
        {/* Welcome Header */}
        <section className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BizTracker Inventory
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your inventory efficiently and keep track of all items.
          </p>
        </section>

        {/* Inventory Content */}
        <section className="space-y-6">
          {/* Placeholder for inventory management components */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Inventory Overview</h2>
            {/* Add your inventory components here */}
          </div>
        </section>
      </div>
    </div>
  );
}