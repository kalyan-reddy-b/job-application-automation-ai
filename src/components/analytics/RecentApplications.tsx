import React from 'react';
import { ExternalLink, Calendar, Building, MapPin } from 'lucide-react';

export const RecentApplications: React.FC = () => {
  const applications = [
    {
      id: 1,
      jobTitle: 'Software Developer Intern',
      company: 'TechCorp Solutions',
      platform: 'Internshala',
      location: 'Bangalore',
      appliedDate: '2024-01-14',
      status: 'applied',
      jobUrl: 'https://internshala.com/internship/detail/software-developer-intern-at-techcorp-solutions',
    },
    {
      id: 2,
      jobTitle: 'Frontend Developer',
      company: 'StartupXYZ',
      platform: 'Naukri',
      location: 'Mumbai',
      appliedDate: '2024-01-14',
      status: 'applied',
      jobUrl: 'https://naukri.com/job-listings/frontend-developer-startupxyz',
    },
    {
      id: 3,
      jobTitle: 'Full Stack Developer Intern',
      company: 'InnovateLabs',
      platform: 'LinkedIn',
      location: 'Remote',
      appliedDate: '2024-01-13',
      status: 'applied',
      jobUrl: 'https://linkedin.com/jobs/view/full-stack-developer-intern',
    },
    {
      id: 4,
      jobTitle: 'Python Developer',
      company: 'DataTech Inc',
      platform: 'Internshala',
      location: 'Delhi',
      appliedDate: '2024-01-13',
      status: 'failed',
      jobUrl: 'https://internshala.com/internship/detail/python-developer-at-datatech',
    },
    {
      id: 5,
      jobTitle: 'React Developer Intern',
      company: 'WebSolutions',
      platform: 'Naukri',
      location: 'Pune',
      appliedDate: '2024-01-12',
      status: 'applied',
      jobUrl: 'https://naukri.com/job-listings/react-developer-intern-websolutions',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformLogo = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'internshala':
        return '🎓';
      case 'naukri':
        return '💼';
      case 'linkedin':
        return '💼';
      default:
        return '🔍';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
          <p className="text-gray-600 text-sm">Your latest job applications</p>
        </div>
        <span className="text-sm text-gray-500">
          {applications.length} applications
        </span>
      </div>

      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-gray-900">{application.jobTitle}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{application.company}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{application.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(application.appliedDate)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <span className="text-lg">{getPlatformLogo(application.platform)}</span>
                  <span>{application.platform}</span>
                </div>
                
                <a
                  href={application.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 p-1"
                  title="View job posting"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {application.status === 'failed' && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                Application failed - possibly due to form validation or network issues
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View all applications →
        </button>
      </div>
    </div>
  );
};