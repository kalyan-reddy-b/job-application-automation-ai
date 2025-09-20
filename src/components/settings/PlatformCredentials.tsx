import React, { useState } from 'react';
import { Eye, EyeOff, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface Credential {
  id: string;
  platform: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  lastTested: string;
  status: 'verified' | 'failed' | 'pending';
}

export const PlatformCredentials: React.FC = () => {
  const [credentials, setCredentials] = useState<Credential[]>([
    {
      id: '1',
      platform: 'Internshala',
      username: '',
      email: 'user@example.com',
      password: '••••••••',
      isActive: true,
      lastTested: '2024-01-14',
      status: 'verified',
    },
    {
      id: '2',
      platform: 'Naukri',
      username: 'john_doe',
      email: 'user@example.com',
      password: '••••••••',
      isActive: false,
      lastTested: '2024-01-10',
      status: 'failed',
    },
  ]);

  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
  const [isAdding, setIsAdding] = useState(false);

  const platforms = [
    { id: 'internshala', name: 'Internshala', logo: '🎓' },
    { id: 'naukri', name: 'Naukri.com', logo: '💼' },
    { id: 'linkedin', name: 'LinkedIn', logo: '💼' },
    { id: 'indeed', name: 'Indeed', logo: '🔍' },
  ];

  const togglePasswordVisibility = (id: string) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Credentials</h2>
        <p className="text-gray-600 mb-6">
          Add your login credentials for job platforms to enable automation. 
          Your credentials are encrypted and stored securely.
        </p>
      </div>

      {/* Add New Credential */}
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Add Platform Credentials</span>
        </button>
      ) : (
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-4">Add New Platform</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select platform</option>
                {platforms.map(platform => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email/Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Save Credentials
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Existing Credentials */}
      <div className="space-y-4">
        {credentials.map((credential) => (
          <div key={credential.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {platforms.find(p => p.name === credential.platform)?.logo || '🔗'}
                </span>
                <div>
                  <h3 className="font-medium text-gray-900">{credential.platform}</h3>
                  <p className="text-sm text-gray-600">{credential.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(credential.status)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(credential.status)}`}>
                    {credential.status}
                  </span>
                </div>
                
                <button className="text-red-600 hover:text-red-700 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email/Username
                </label>
                <input
                  type="text"
                  value={credential.email}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword[credential.id] ? 'text' : 'password'}
                    value={credential.password}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                  <button
                    onClick={() => togglePasswordVisibility(credential.id)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword[credential.id] ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                Last tested: {new Date(credential.lastTested).toLocaleDateString()}
              </div>
              
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                  Test Connection
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="font-medium text-blue-900">Security Information</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your credentials are encrypted using industry-standard encryption and are only used for automation purposes. 
              We recommend using application-specific passwords where available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};