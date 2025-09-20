import React, { useState } from 'react';
import { Code, Plus, X } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export const SkillsForm: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 'intermediate' as const,
    category: 'Programming',
  });

  const skillCategories = [
    'Programming',
    'Framework',
    'Database',
    'Tool',
    'Cloud',
    'Other',
  ];

  const skillLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' },
  ];

  const popularSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML/CSS',
    'TypeScript', 'MongoDB', 'MySQL', 'Git', 'AWS', 'Docker',
    'Express.js', 'Django', 'Spring Boot', 'PostgreSQL', 'Redis',
    'GraphQL', 'REST API', 'Linux', 'Kubernetes', 'Firebase'
  ];

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        ...newSkill,
      };
      setSkills([...skills, skill]);
      setNewSkill({
        name: '',
        level: 'intermediate',
        category: 'Programming',
      });
    }
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const addPopularSkill = (skillName: string) => {
    if (!skills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: skillName,
        level: 'intermediate',
        category: 'Programming',
      };
      setSkills([...skills, skill]);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-red-100 text-red-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-blue-100 text-blue-800';
      case 'expert':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
        <p className="text-gray-600 mb-6">
          Add your technical and professional skills. This helps match you with relevant job opportunities.
        </p>
      </div>

      {/* Add New Skill */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">Add New Skill</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Name *
            </label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., JavaScript, React, Python"
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level
            </label>
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as any })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {skillLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {skillCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={addSkill}
          className="mt-4 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Popular Skills */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Popular Skills (Click to add)</h3>
        <div className="flex flex-wrap gap-2">
          {popularSkills.map(skill => (
            <button
              key={skill}
              onClick={() => addPopularSkill(skill)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-colors"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Skills List */}
      {skills.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Your Skills ({skills.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map(skill => (
              <div key={skill.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{skill.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(skill.level)}`}>
                        {skill.level}
                      </span>
                      <span className="text-xs text-gray-500">{skill.category}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added yet</h3>
          <p className="text-gray-600">
            Add your technical skills to improve job matching
          </p>
        </div>
      )}
    </div>
  );
};