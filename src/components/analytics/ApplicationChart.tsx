import React from 'react';
import { TrendingUp } from 'lucide-react';

export const ApplicationChart: React.FC = () => {
  // Mock data for the chart
  const data = [
    { date: '2024-01-08', applications: 5, successful: 3 },
    { date: '2024-01-09', applications: 8, successful: 6 },
    { date: '2024-01-10', applications: 12, successful: 8 },
    { date: '2024-01-11', applications: 6, successful: 4 },
    { date: '2024-01-12', applications: 10, successful: 7 },
    { date: '2024-01-13', applications: 15, successful: 9 },
    { date: '2024-01-14', applications: 9, successful: 6 },
  ];

  const maxApplications = Math.max(...data.map(d => d.applications));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Application Trends</h2>
          <p className="text-gray-600 text-sm">Last 7 days performance</p>
        </div>
        <TrendingUp className="w-6 h-6 text-green-600" />
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-16 text-sm text-gray-600">
              {new Date(item.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-gray-900">
                  {item.applications} applications
                </span>
                <span className="text-sm text-green-600">
                  ({item.successful} successful)
                </span>
              </div>
              
              <div className="flex space-x-1">
                {/* Total applications bar */}
                <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(item.applications / maxApplications) * 100}%` }}
                  />
                </div>
                
                {/* Success rate indicator */}
                <div className="w-12 text-right">
                  <span className="text-xs text-gray-500">
                    {Math.round((item.successful / item.applications) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total this week:</span>
          <span className="font-medium">
            {data.reduce((sum, item) => sum + item.applications, 0)} applications
          </span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-600">Success rate:</span>
          <span className="font-medium text-green-600">
            {Math.round((data.reduce((sum, item) => sum + item.successful, 0) / 
                       data.reduce((sum, item) => sum + item.applications, 0)) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};