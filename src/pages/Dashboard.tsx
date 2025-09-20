import React, { useState, useEffect } from 'react';
import { Bot, TrendingUp, Target, Clock, Play, Pause, BarChart3 } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { RecentActivity } from '../components/RecentActivity';
import { QuickActions } from '../components/QuickActions';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    successfulApplications: 0,
    activeAutomations: 0,
    successRate: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalApplications: 156,
        successfulApplications: 89,
        activeAutomations: 2,
        successRate: 57.1,
      });
      
      setRecentActivity([
        {
          id: 1,
          type: 'application',
          title: 'Applied to Software Developer Intern at TechCorp',
          time: '2 minutes ago',
          status: 'success',
        },
        {
          id: 2,
          type: 'automation',
          title: 'Started automation for Internshala',
          time: '15 minutes ago',
          status: 'running',
        },
        {
          id: 3,
          type: 'application',
          title: 'Applied to Frontend Developer at StartupXYZ',
          time: '1 hour ago',
          status: 'success',
        },
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-blue-100 text-lg">
              Your job automation is working hard for you. Here's what's happening.
            </p>
          </div>
          <div className="hidden md:block">
            <Bot className="w-20 h-20 text-blue-200" />
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
          title="Successful Applications"
          value={stats.successfulApplications}
          icon={TrendingUp}
          color="green"
          trend="+8%"
        />
        <StatsCard
          title="Active Automations"
          value={stats.activeAutomations}
          icon={Play}
          color="purple"
          trend="Running"
        />
        <StatsCard
          title="Success Rate"
          value={`${stats.successRate}%`}
          icon={BarChart3}
          color="orange"
          trend="+3.2%"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity activities={recentActivity} />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};