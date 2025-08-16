import { TrendingUp } from 'lucide-react';
export default function AnalyticsPage() {
  return (
    <div className="px-4 py-10 flex justify-center">
      <div className="w-full max-w-6xl space-y-12">
        {/* Welcome Header */}
        <section className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BizTracker Analytics
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive deep into your business performance with detailed analytics.
          </p>
        </section>

        {/* Analytics Content */}
        <section className="space-y-6">
          {/* Placeholder for analytics charts and data */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Analytics Overview</h2>
            {/* Add your analytics components here */}
          </div>
        </section>
      </div>
    </div>
  );
}
