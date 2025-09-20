import React from 'react';
import { BarChart3, TrendingUp, Target, Clock } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { ApplicationChart } from '../components/analytics/ApplicationChart';
import { PlatformPerformance } from '../components/analytics/PlatformPerformance';
import { RecentApplications } from '../components/analytics/RecentApplications';

export const Analytics: React.FC = () => {
  const stats = {
    totalApplications: 156,
    successRate: 67.3,
    avgResponseTime: 3.2,
    timeSaved: 24.5,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-green-100 text-lg">
              Track your job application performance and optimize your strategy
            </p>
          </div>
          <div className="hidden md:block">
            <BarChart3 className="w-20 h-20 text-green-200" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={Target}
          color="blue"
          trend="+12%"
        />
        <StatsCard
          title="Success Rate"
          value={`${stats.successRate}%`}
          icon={TrendingUp}
          color="green"
          trend="+5.2%"
        />
        <StatsCard
          title="Avg Response Time"
          value={`${stats.avgResponseTime} days`}
          icon={Clock}
          color="purple"
          trend="-0.8 days"
        />
        <StatsCard
          title="Time Saved"
          value={`${stats.timeSaved} hours`}
          icon={BarChart3}
          color="orange"
          trend="+2.1 hrs"
        />
      </div>

      {/* Charts and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ApplicationChart />
        <PlatformPerformance />
      </div>

      {/* Recent Applications */}
      <RecentApplications />
    </div>
  );
};