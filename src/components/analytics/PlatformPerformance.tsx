import React from 'react';
import { Award } from 'lucide-react';

export const PlatformPerformance: React.FC = () => {
  const platforms = [
    {
      name: 'Internshala',
      logo: '🎓',
      applications: 89,
      successful: 62,
      successRate: 69.7,
      avgResponseTime: 2.3,
    },
    {
      name: 'Naukri.com',
      logo: '💼',
      applications: 45,
      successful: 28,
      successRate: 62.2,
      avgResponseTime: 4.1,
    },
    {
      name: 'LinkedIn',
      logo: '💼',
      applications: 22,
      successful: 15,
      successRate: 68.2,
      avgResponseTime: 3.8,
    },
  ];

  const getPerformanceColor = (rate: number) => {
    if (rate >= 70) return 'text-green-600 bg-green-100';
    if (rate >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Platform Performance</h2>
          <p className="text-gray-600 text-sm">Success rates by platform</p>
        </div>
        <Award className="w-6 h-6 text-purple-600" />
      </div>

      <div className="space-y-4">
        {platforms.map((platform, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{platform.logo}</span>
                <div>
                  <h3 className="font-medium text-gray-900">{platform.name}</h3>
                  <p className="text-sm text-gray-600">
                    {platform.applications} applications
                  </p>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(platform.successRate)}`}>
                {platform.successRate}%
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Successful:</span>
                <p className="font-medium text-green-600">{platform.successful}</p>
              </div>
              
              <div>
                <span className="text-gray-600">Success Rate:</span>
                <p className="font-medium">{platform.successRate}%</p>
              </div>
              
              <div>
                <span className="text-gray-600">Avg Response:</span>
                <p className="font-medium">{platform.avgResponseTime} days</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${platform.successRate}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Best performing platform: <span className="font-medium text-green-600">Internshala</span>
          </p>
        </div>
      </div>
    </div>
  );
};