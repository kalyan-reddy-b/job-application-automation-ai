import React from 'react';
import { Play, User, BarChart3, Settings, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Start Automation',
      description: 'Begin applying to jobs automatically',
      icon: Play,
      color: 'bg-green-500 hover:bg-green-600',
      link: '/automation',
    },
    {
      title: 'Update Profile',
      description: 'Keep your information current',
      icon: User,
      color: 'bg-blue-500 hover:bg-blue-600',
      link: '/profile',
    },
    {
      title: 'View Analytics',
      description: 'Check your application stats',
      icon: BarChart3,
      color: 'bg-purple-500 hover:bg-purple-600',
      link: '/analytics',
    },
    {
      title: 'Add Platform',
      description: 'Connect more job platforms',
      icon: Plus,
      color: 'bg-orange-500 hover:bg-orange-600',
      link: '/settings',
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <Link
              key={index}
              to={action.link}
              className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group"
            >
              <div className={`p-2 rounded-lg ${action.color} text-white mr-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
              
              <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};