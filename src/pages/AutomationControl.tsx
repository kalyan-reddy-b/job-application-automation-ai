import React, { useState } from 'react';
import { Play, Pause, Square, Settings, Bot, Zap } from 'lucide-react';
import { PlatformSelector } from '../components/automation/PlatformSelector';
import { AutomationSettings } from '../components/automation/AutomationSettings';
import { ActiveSessions } from '../components/automation/ActiveSessions';

export const AutomationControl: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [automationSettings, setAutomationSettings] = useState({
    useAiCoverLetter: true,
    useAiResponses: true,
    maxApplicationsPerDay: 10,
    customInstructions: '',
  });

  const handleStartAutomation = () => {
    if (selectedPlatforms.length === 0) {
      alert('Please select at least one platform');
      return;
    }
    setIsRunning(true);
    // TODO: Start automation API call
  };

  const handleStopAutomation = () => {
    setIsRunning(false);
    // TODO: Stop automation API call
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Automation Control</h1>
            <p className="text-purple-100 text-lg">
              Configure and manage your job application automation
            </p>
          </div>
          <div className="hidden md:block">
            <Bot className="w-20 h-20 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Platform Selection */}
          <PlatformSelector
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={setSelectedPlatforms}
          />

          {/* Automation Settings */}
          <AutomationSettings
            settings={automationSettings}
            onSettingsChange={setAutomationSettings}
          />
        </div>

        {/* Control Buttons */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Automation Status</h3>
              <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500' : 'bg-gray-400'}`} />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${isRunning ? 'text-green-600' : 'text-gray-600'}`}>
                  {isRunning ? 'Running' : 'Stopped'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platforms:</span>
                <span className="font-medium">{selectedPlatforms.length} selected</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">AI Features:</span>
                <span className="font-medium">
                  {automationSettings.useAiCoverLetter || automationSettings.useAiResponses ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Controls</h3>
            
            <div className="space-y-3">
              {!isRunning ? (
                <button
                  onClick={handleStartAutomation}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Automation</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleStopAutomation}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Square className="w-5 h-5" />
                    <span>Stop Automation</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                    <Pause className="w-5 h-5" />
                    <span>Pause</span>
                  </button>
                </div>
              )}
              
              <button className="w-full flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                <Settings className="w-5 h-5" />
                <span>Advanced Settings</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Today's Progress</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Applications Sent:</span>
                <span className="font-medium text-blue-600">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Success Rate:</span>
                <span className="font-medium text-green-600">83%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Time Saved:</span>
                <span className="font-medium text-purple-600">2.5 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <ActiveSessions />
    </div>
  );
};