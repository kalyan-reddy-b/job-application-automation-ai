import React from 'react';
import { CheckCircle, Clock, AlertCircle, Bot } from 'lucide-react';

interface Activity {
  id: number;
  type: 'application' | 'automation';
  title: string;
  time: string;
  status: 'success' | 'running' | 'failed';
}

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'automation':
        return <Bot className="w-4 h-4 text-purple-500" />;
      default:
        return <div className="w-4 h-4 bg-blue-500 rounded-full" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0 flex items-center space-x-2">
              {getTypeIcon(activity.type)}
              {getStatusIcon(activity.status)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.title}
              </p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
            
            <div className="flex-shrink-0">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                activity.status === 'success' 
                  ? 'bg-green-100 text-green-800'
                  : activity.status === 'running'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {activity.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View all activity →
        </button>
      </div>
    </div>
  );
};