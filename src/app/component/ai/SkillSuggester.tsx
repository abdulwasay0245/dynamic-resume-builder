import React from 'react';
import { Plus, Brain } from 'lucide-react';

interface SkillSuggesterProps {
    jobTitle: string;
    currentSkills: string;
    onAddSkill: (skill: string) => void;
}

const EXPERIENCE_SKILLS_MAP: Record<string, string[]> = {
    "software engineer": ["React", "TypeScript", "Node.js", "AWS", "Docker", "Next.js", "GraphQL"],
    "product manager": ["Agile", "JIRA", "Roadmapping", "User Research", "Data Analysis", "SQL"],
    "designer": ["Figma", "Adobe XD", "UI/UX", "Prototyping", "Wireframing", "Sketch"],
    "marketing": ["SEO", "Content Strategy", "Google Analytics", "Social Media", "Copywriting"],
    "data scientist": ["Python", "Pandas", "Machine Learning", "SQL", "Tableau", "Statistics"],
    "default": ["Communication", "Teamwork", "Problem Solving", "Leadership", "Time Management"]
};

export const SkillSuggester: React.FC<SkillSuggesterProps> = ({ jobTitle, currentSkills, onAddSkill }) => {
    const normalizedTitle = jobTitle?.toLowerCase() || "";
    
    const suggestedSkills = Object.keys(EXPERIENCE_SKILLS_MAP).find(key => normalizedTitle.includes(key)) 
        ? EXPERIENCE_SKILLS_MAP[Object.keys(EXPERIENCE_SKILLS_MAP).find(key => normalizedTitle.includes(key))!] 
        : EXPERIENCE_SKILLS_MAP["default"];

    const currentSkillsList = currentSkills.split(',').map(s => s.trim().toLowerCase());
    const filteredSuggestions = suggestedSkills.filter(s => !currentSkillsList.includes(s.toLowerCase()));

    if (filteredSuggestions.length === 0) return null;

    return (
        <div className="mt-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-2 mb-3 text-indigo-700 font-semibold text-sm">
                <Brain size={16} />
                <span>AI Suggested Skills for &quot;{jobTitle || "You"}&quot;</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {filteredSuggestions.map((skill) => (
                    <button
                        key={skill}
                        onClick={() => onAddSkill(skill)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white text-slate-700 text-xs font-medium rounded-full border border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all shadow-sm"
                    >
                        <Plus size={12} className="text-indigo-500" />
                        {skill}
                    </button>
                ))}
            </div>
        </div>
    );
};
