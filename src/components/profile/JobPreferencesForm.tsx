import React, { useState } from 'react';
import { Target, MapPin, DollarSign, Clock } from 'lucide-react';

export const JobPreferencesForm: React.FC = () => {
  const [preferences, setPreferences] = useState({
    preferredRoles: '',
    preferredLocations: '',
    jobTypes: ['internship', 'full_time'],
    minSalary: '',
    maxSalary: '',
    remoteWork: true,
    willingToRelocate: true,
  });

  const jobTypeOptions = [
    { value: 'internship', label: 'Internship' },
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
  ];

  const popularRoles = [
    'Software Developer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Data Scientist', 'Machine Learning Engineer', 'DevOps Engineer', 'Product Manager',
    'UI/UX Designer', 'Quality Assurance', 'Business Analyst', 'Cybersecurity Analyst'
  ];

  const popularLocations = [
    'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune',
    'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida', 'Remote'
  ];

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    if (checked) {
      setPreferences({
        ...preferences,
        jobTypes: [...preferences.jobTypes, jobType]
      });
    } else {
      setPreferences({
        ...preferences,
        jobTypes: preferences.jobTypes.filter(type => type !== jobType)
      });
    }
  };

  const addRole = (role: string) => {
    const currentRoles = preferences.preferredRoles.split(',').map(r => r.trim()).filter(r => r);
    if (!currentRoles.includes(role)) {
      const newRoles = [...currentRoles, role].join(', ');
      setPreferences({ ...preferences, preferredRoles: newRoles });
    }
  };

  const addLocation = (location: string) => {
    const currentLocations = preferences.preferredLocations.split(',').map(l => l.trim()).filter(l => l);
    if (!currentLocations.includes(location)) {
      const newLocations = [...currentLocations, location].join(', ');
      setPreferences({ ...preferences, preferredLocations: newLocations });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Preferences</h2>
        <p className="text-gray-600 mb-6">
          Set your job preferences to help the automation system find the most relevant opportunities for you.
        </p>
      </div>

      <div className="space-y-6">
        {/* Preferred Roles */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Job Roles *
          </label>
          <div className="relative">
            <Target className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              value={preferences.preferredRoles}
              onChange={(e) => setPreferences({ ...preferences, preferredRoles: e.target.value })}
              rows={3}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Software Developer, Frontend Developer, Full Stack Developer (comma-separated)"
            />
          </div>
          
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">Popular roles (click to add):</p>
            <div className="flex flex-wrap gap-2">
              {popularRoles.map(role => (
                <button
                  key={role}
                  onClick={() => addRole(role)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-colors"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preferred Locations */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Locations *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              value={preferences.preferredLocations}
              onChange={(e) => setPreferences({ ...preferences, preferredLocations: e.target.value })}
              rows={3}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Bangalore, Mumbai, Delhi, Remote (comma-separated)"
            />
          </div>
          
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">Popular locations (click to add):</p>
            <div className="flex flex-wrap gap-2">
              {popularLocations.map(location => (
                <button
                  key={location}
                  onClick={() => addLocation(location)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-colors"
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Job Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Job Types *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {jobTypeOptions.map(option => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.jobTypes.includes(option.value)}
                  onChange={(e) => handleJobTypeChange(option.value, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Expected Salary Range (Annual, in ₹)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Minimum</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={preferences.minSalary}
                  onChange={(e) => setPreferences({ ...preferences, minSalary: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="300000"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Maximum</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={preferences.maxSalary}
                  onChange={(e) => setPreferences({ ...preferences, maxSalary: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="800000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Work Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Work Preferences
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.remoteWork}
                onChange={(e) => setPreferences({ ...preferences, remoteWork: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Open to remote work</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.willingToRelocate}
                onChange={(e) => setPreferences({ ...preferences, willingToRelocate: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Willing to relocate</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Important:</strong> These preferences will be used to filter and apply to relevant job opportunities. 
              Be specific but not too restrictive to maximize your chances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};