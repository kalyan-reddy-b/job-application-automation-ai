import React from 'react';
import { Play, Pause, Square, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Session {
  id: string;
  platforms: string[];
  status: 'running' | 'paused' | 'completed' | 'failed';
  startTime: string;
  totalApplications: number;
  successfulApplications: number;
  failedApplications: number;
}

export const ActiveSessions: React.FC = () => {
  // Mock data - replace with actual API call
  const sessions: Session[] = [
    {
      id: '1',
      platforms: ['Internshala', 'Naukri'],
      status: 'running',
      startTime: '2024-01-15T10:30:00Z',
      totalApplications: 15,
      successfulApplications: 12,
      failedApplications: 3,
    },
    {
      id: '2',
      platforms: ['LinkedIn'],
      status: 'completed',
      startTime: '2024-01-14T14:20:00Z',
      totalApplications: 8,
      successfulApplications: 6,
      failedApplications: 2,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Play className="w-4 h-4 text-green-500" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString();
  };

  const calculateSuccessRate = (successful: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((successful / total) * 100);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Automation Sessions</h2>
        <span className="text-sm text-gray-500">
          {sessions.filter(s => s.status === 'running').length} active
        </span>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions yet</h3>
          <p className="text-gray-600">
            Start your first automation session to see it here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(session.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Session #{session.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {session.platforms.join(', ')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(session.status)}`}>
                    {session.status}
                  </span>
                  
                  {session.status === 'running' && (
                    <div className="flex space-x-1">
                      <button className="p-1 text-yellow-600 hover:text-yellow-700">
                        <Pause className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-700">
                        <Square className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Started:</span>
                  <p className="font-medium">{formatTime(session.startTime)}</p>
                </div>
                
                <div>
                  <span className="text-gray-600">Total Applications:</span>
                  <p className="font-medium">{session.totalApplications}</p>
                </div>
                
                <div>
                  <span className="text-gray-600">Successful:</span>
                  <p className="font-medium text-green-600">{session.successfulApplications}</p>
                </div>
                
                <div>
                  <span className="text-gray-600">Success Rate:</span>
                  <p className="font-medium">
                    {calculateSuccessRate(session.successfulApplications, session.totalApplications)}%
                  </p>
                </div>
              </div>

              {session.status === 'running' && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{session.successfulApplications}/{session.totalApplications}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(session.successfulApplications / Math.max(session.totalApplications, 1)) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};