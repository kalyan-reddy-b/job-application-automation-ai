import React from 'react';
import { Brain, MessageSquare, Clock, FileText } from 'lucide-react';

interface AutomationSettingsProps {
  settings: {
    useAiCoverLetter: boolean;
    useAiResponses: boolean;
    maxApplicationsPerDay: number;
    customInstructions: string;
  };
  onSettingsChange: (settings: any) => void;
}

export const AutomationSettings: React.FC<AutomationSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const updateSetting = (key: string, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">AI & Automation Settings</h2>
      </div>

      <div className="space-y-6">
        {/* AI Features */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">AI Features</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="aiCoverLetter"
                checked={settings.useAiCoverLetter}
                onChange={(e) => updateSetting('useAiCoverLetter', e.target.checked)}
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <label htmlFor="aiCoverLetter" className="font-medium text-gray-900 cursor-pointer">
                  AI-Generated Cover Letters
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Automatically generate personalized cover letters for each application using AI
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="aiResponses"
                checked={settings.useAiResponses}
                onChange={(e) => updateSetting('useAiResponses', e.target.checked)}
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <label htmlFor="aiResponses" className="font-medium text-gray-900 cursor-pointer">
                  AI Question Responses
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Use AI to answer application questions and screening questions intelligently
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Limits */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Application Limits</h3>
          <div className="flex items-center space-x-4">
            <Clock className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Applications Per Day
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={settings.maxApplicationsPerDay}
                onChange={(e) => updateSetting('maxApplicationsPerDay', parseInt(e.target.value))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-600 mt-1">
                Recommended: 10-20 applications per day to avoid being flagged
              </p>
            </div>
          </div>
        </div>

        {/* Custom Instructions */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Custom Instructions</h3>
          <div className="flex items-start space-x-4">
            <FileText className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Instructions for AI
              </label>
              <textarea
                value={settings.customInstructions}
                onChange={(e) => updateSetting('customInstructions', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any specific instructions for the AI to follow when generating cover letters or responses..."
              />
              <p className="text-sm text-gray-600 mt-1">
                Example: "Emphasize my passion for fintech and mention my interest in blockchain technology"
              </p>
            </div>
          </div>
        </div>

        {/* Safety Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Safety Features Enabled</h4>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Human-like delays between applications</li>
                <li>• Random user agent rotation</li>
                <li>• Captcha detection and handling</li>
                <li>• Rate limiting to prevent blocking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};