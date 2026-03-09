import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Brain, Loader2 } from 'lucide-react';

interface SkillSuggesterProps {
    jobTitle: string;
    currentSkills: string;
    onAddSkill: (skill: string) => void;
}

export const SkillSuggester: React.FC<SkillSuggesterProps> = ({ jobTitle, currentSkills, onAddSkill }) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastFetchedTitle, setLastFetchedTitle] = useState('');

    const fetchSuggestions = useCallback(async () => {
        if (!jobTitle || jobTitle.length < 3 || jobTitle === lastFetchedTitle) return;
        
        setIsLoading(true);
        try {
            const response = await fetch('/api/ai/suggest-skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobTitle, currentSkills })
            });
            const result = await response.json();
            if (result.skills && Array.isArray(result.skills)) {
                setSuggestions(result.skills);
                setLastFetchedTitle(jobTitle);
            }
        } catch (error) {
            console.error("Skill suggestion failed", error);
            // Fallback to basic suggestions
            setSuggestions(["Communication", "Teamwork", "Problem Solving", "Leadership", "Time Management"]);
        } finally {
            setIsLoading(false);
        }
    }, [jobTitle, currentSkills, lastFetchedTitle]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (jobTitle && jobTitle.length >= 3) {
                fetchSuggestions();
            }
        }, 800); // Debounce

        return () => clearTimeout(timer);
    }, [jobTitle, fetchSuggestions]);

    const currentSkillsList = currentSkills.split(',').map(s => s.trim().toLowerCase());
    const filteredSuggestions = suggestions.filter(s => !currentSkillsList.includes(s.toLowerCase()));

    if (!jobTitle || jobTitle.length < 3) return null;

    return (
        <div className="mt-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-2 mb-3 text-indigo-700 font-semibold text-sm">
                {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <Brain size={16} />
                )}
                <span>AI Suggested Skills for &quot;{jobTitle}&quot;</span>
            </div>
            {isLoading ? (
                <div className="text-xs text-slate-500 italic">Analyzing role and generating suggestions...</div>
            ) : filteredSuggestions.length > 0 ? (
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
            ) : (
                <div className="text-xs text-slate-500 italic">You already have all suggested skills!</div>
            )}
        </div>
    );
};
