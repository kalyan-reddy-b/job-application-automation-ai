import React, { useState } from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  cgpa: string;
  percentage: string;
}

export const EducationForm: React.FC = () => {
  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      institution: '',
      degree: 'btech',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      cgpa: '',
      percentage: '',
    },
  ]);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: 'btech',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      cgpa: '',
      percentage: '',
    };
    setEducations([...educations, newEducation]);
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const degreeOptions = [
    { value: 'btech', label: 'B.Tech' },
    { value: 'mtech', label: 'M.Tech' },
    { value: 'bca', label: 'BCA' },
    { value: 'mca', label: 'MCA' },
    { value: 'bsc', label: 'B.Sc' },
    { value: 'msc', label: 'M.Sc' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
        <p className="text-gray-600 mb-6">
          Add your educational background. This helps in matching relevant job opportunities.
        </p>
      </div>

      {educations.map((education, index) => (
        <div key={education.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-gray-900">
                Education {index + 1}
              </h3>
            </div>
            {educations.length > 1 && (
              <button
                onClick={() => removeEducation(education.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution *
              </label>
              <input
                type="text"
                value={education.institution}
                onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="University/College name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Degree *
              </label>
              <select
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {degreeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field of Study *
              </label>
              <input
                type="text"
                value={education.fieldOfStudy}
                onChange={(e) => updateEducation(education.id, 'fieldOfStudy', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Computer Science Engineering"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Year *
                </label>
                <input
                  type="number"
                  value={education.startYear}
                  onChange={(e) => updateEducation(education.id, 'startYear', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2022"
                  min="2000"
                  max="2030"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Year *
                </label>
                <input
                  type="number"
                  value={education.endYear}
                  onChange={(e) => updateEducation(education.id, 'endYear', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2026"
                  min="2000"
                  max="2030"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CGPA
              </label>
              <input
                type="number"
                step="0.01"
                value={education.cgpa}
                onChange={(e) => updateEducation(education.id, 'cgpa', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="8.5"
                min="0"
                max="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Percentage
              </label>
              <input
                type="number"
                step="0.01"
                value={education.percentage}
                onChange={(e) => updateEducation(education.id, 'percentage', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="85.5"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <Plus className="w-4 h-4" />
        <span>Add Another Education</span>
      </button>
    </div>
  );
};