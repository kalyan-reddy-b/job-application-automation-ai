import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Monitor } from 'lucide-react';

export const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    emailNotifications: {
      applicationSuccess: true,
      applicationFailure: true,
      dailySummary: true,
      weeklyReport: false,
      systemUpdates: true,
    },
    pushNotifications: {
      applicationSuccess: true,
      applicationFailure: true,
      sessionComplete: true,
      systemAlerts: true,
    },
    frequency: {
      dailySummaryTime: '18:00',
      weeklyReportDay: 'sunday',
    },
  });

  const updateEmailSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [key]: value,
      },
    }));
  };

  const updatePushSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      pushNotifications: {
        ...prev.pushNotifications,
        [key]: value,
      },
    }));
  };

  const updateFrequencySetting = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      frequency: {
        ...prev.frequency,
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Settings</h2>
        <p className="text-gray-600 mb-6">
          Configure how and when you want to receive notifications about your job applications.
        </p>
      </div>

      {/* Email Notifications */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
        </div>
        
        <div className="space-y-4 ml-7">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Application Success</h4>
              <p className="text-sm text-gray-600">Get notified when applications are submitted successfully</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications.applicationSuccess}
                onChange={(e) => updateEmailSetting('applicationSuccess', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Application Failures</h4>
              <p className="text-sm text-gray-600">Get notified when applications fail to submit</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications.applicationFailure}
                onChange={(e) => updateEmailSetting('applicationFailure', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Daily Summary</h4>
              <p className="text-sm text-gray-600">Receive a daily summary of your application activity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications.dailySummary}
                onChange={(e) => updateEmailSetting('dailySummary', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Weekly Report</h4>
              <p className="text-sm text-gray-600">Receive a detailed weekly performance report</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications.weeklyReport}
                onChange={(e) => updateEmailSetting('weeklyReport', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Smartphone className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
        </div>
        
        <div className="space-y-4 ml-7">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Application Success</h4>
              <p className="text-sm text-gray-600">Instant notifications for successful applications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.pushNotifications.applicationSuccess}
                onChange={(e) => updatePushSetting('applicationSuccess', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Session Complete</h4>
              <p className="text-sm text-gray-600">Get notified when automation sessions complete</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.pushNotifications.sessionComplete}
                onChange={(e) => updatePushSetting('sessionComplete', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notification Timing */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Monitor className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-medium text-gray-900">Notification Timing</h3>
        </div>
        
        <div className="space-y-4 ml-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Summary Time
              </label>
              <input
                type="time"
                value={settings.frequency.dailySummaryTime}
                onChange={(e) => updateFrequencySetting('dailySummaryTime', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weekly Report Day
              </label>
              <select
                value={settings.frequency.weeklyReportDay}
                onChange={(e) => updateFrequencySetting('weeklyReportDay', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-6 border-t border-gray-200">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};