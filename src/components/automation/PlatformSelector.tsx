import React from 'react';
import { Check, ExternalLink } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  logo: string;
  description: string;
  isActive: boolean;
  features: string[];
}

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onPlatformChange: (platforms: string[]) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onPlatformChange,
}) => {
  const platforms: Platform[] = [
    {
      id: 'internshala',
      name: 'Internshala',
      logo: '🎓',
      description: 'India\'s largest internship platform',
      isActive: true,
      features: ['Internships', 'Entry-level jobs', 'Skills courses'],
    },
    {
      id: 'naukri',
      name: 'Naukri.com',
      logo: '💼',
      description: 'Leading job portal in India',
      isActive: true,
      features: ['Full-time jobs', 'Experience roles', 'Career guidance'],
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      logo: '💼',
      description: 'Professional networking platform',
      isActive: false,
      features: ['Professional network', 'Job applications', 'Easy Apply'],
    },
    {
      id: 'indeed',
      name: 'Indeed',
      logo: '🔍',
      description: 'Global job search engine',
      isActive: false,
      features: ['Job search', 'Company reviews', 'Salary insights'],
    },
  ];

  const handlePlatformToggle = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    if (!platform?.isActive) return;

    if (selectedPlatforms.includes(platformId)) {
      onPlatformChange(selectedPlatforms.filter(id => id !== platformId));
    } else {
      onPlatformChange([...selectedPlatforms, platformId]);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Select Platforms</h2>
          <p className="text-gray-600 mt-1">Choose which job platforms to automate</p>
        </div>
        <span className="text-sm text-gray-500">
          {selectedPlatforms.length} selected
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedPlatforms.includes(platform.id)
                ? 'border-blue-500 bg-blue-50'
                : platform.isActive
                ? 'border-gray-200 hover:border-gray-300'
                : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
            }`}
            onClick={() => handlePlatformToggle(platform.id)}
          >
            {/* Selection Indicator */}
            {selectedPlatforms.includes(platform.id) && (
              <div className="absolute top-3 right-3">
                <div className="bg-blue-500 text-white rounded-full p-1">
                  <Check className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* Platform Info */}
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{platform.logo}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                  {!platform.isActive && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{platform.description}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {platform.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* External Link */}
            {platform.isActive && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <a
                  href={`https://${platform.id}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Visit platform</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedPlatforms.length === 0 && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            Please select at least one platform to start automation.
          </p>
        </div>
      )}
    </div>
  );
};