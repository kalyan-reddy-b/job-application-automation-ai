import React, { useState } from 'react';
import { Download, Upload, Trash2, Database, AlertTriangle } from 'lucide-react';

export const DataManagement: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleExportData = async () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In real implementation, this would trigger a download
      console.log('Data exported');
    }, 2000);
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    console.log('Account deletion requested');
    setShowDeleteConfirm(false);
  };

  const dataStats = {
    profiles: 1,
    applications: 156,
    sessions: 12,
    credentials: 3,
    totalSize: '2.3 MB',
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Management</h2>
        <p className="text-gray-600 mb-6">
          Manage your data, export information, and control your privacy settings.
        </p>
      </div>

      {/* Data Overview */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Data Overview</h3>
        </div>
        
        <div className="ml-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{dataStats.profiles}</div>
            <div className="text-sm text-gray-600">User Profiles</div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{dataStats.applications}</div>
            <div className="text-sm text-gray-600">Job Applications</div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{dataStats.sessions}</div>
            <div className="text-sm text-gray-600">Automation Sessions</div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{dataStats.credentials}</div>
            <div className="text-sm text-gray-600">Platform Credentials</div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">{dataStats.totalSize}</div>
            <div className="text-sm text-gray-600">Total Data Size</div>
          </div>
        </div>
      </div>

      {/* Data Export */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Download className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-medium text-gray-900">Export Data</h3>
        </div>
        
        <div className="ml-7 space-y-4">
          <p className="text-gray-600">
            Download a copy of all your data including profiles, applications, and settings.
          </p>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleExportData}
              disabled={isExporting}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Exporting...' : 'Export All Data'}</span>
            </button>
            
            <div className="text-sm text-gray-600">
              Format: JSON • Size: ~{dataStats.totalSize}
            </div>
          </div>

          {isExporting && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                <span className="text-green-700">Preparing your data export...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Import */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Upload className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Import Data</h3>
        </div>
        
        <div className="ml-7 space-y-4">
          <p className="text-gray-600">
            Import your profile data from a previously exported file or other sources.
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-2">Drop your data file here or click to browse</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Choose File
            </button>
            <p className="text-xs text-gray-500 mt-2">Supported formats: JSON, CSV</p>
          </div>
        </div>
      </div>

      {/* Privacy Controls */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-medium text-gray-900">Privacy Controls</h3>
        </div>
        
        <div className="ml-7 space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Data Retention</h4>
            <p className="text-sm text-gray-600 mb-3">
              Your data is automatically cleaned up based on these settings:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Application logs: Kept for 90 days</li>
              <li>• Session data: Kept for 30 days</li>
              <li>• Profile data: Kept until account deletion</li>
              <li>• Analytics data: Kept for 1 year</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Data Sharing</h4>
            <p className="text-sm text-gray-600 mb-3">
              Control how your data is used:
            </p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Allow anonymous usage analytics</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Receive product updates and tips</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Trash2 className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-medium text-gray-900">Danger Zone</h3>
        </div>
        
        <div className="ml-7">
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
            <p className="text-sm text-red-700 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            
            
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Delete Account
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-red-700 font-medium">
                  Are you sure? This will permanently delete all your data.
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Yes, Delete Everything
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};