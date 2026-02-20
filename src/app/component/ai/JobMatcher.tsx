import React, { useState } from 'react';
import { Target, Search, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FormDataState } from '../ResumeWizard';

export const JobMatcher = ({ data }: { data: FormDataState }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [jobDesc, setJobDesc] = useState("");
    const [matches, setMatches] = useState<{ found: string[], missing: string[] } | null>(null);

    const analyzeJob = () => {
        if (!jobDesc) return;
        
        // Simple mock analysis logic
        // Extract plausible keywords (capitalized words for simplicity in this mock)
        // In reality, this would use an NLP API
        const keywords = jobDesc.match(/\b[A-Z][a-z]+\b/g) || [];
        const uniqueKeywords = Array.from(new Set(keywords));
        
        const resumeText = JSON.stringify(data).toLowerCase();
        
        const found: string[] = [];
        const missing: string[] = [];

        uniqueKeywords.forEach(kw => {
            if (resumeText.includes(kw.toLowerCase())) {
                found.push(kw);
            } else {
                missing.push(kw);
            }
        });

        // Add some dummy "AI" keywords if none found to show UI
        if (uniqueKeywords.length === 0) {
            missing.push("Teamwork", "Agile", "Leadership");
        }

        setMatches({ found, missing });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                    <Target size={18} />
                    <span>Job Description Matcher</span>
                </div>
                {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
            </button>

            {isOpen && (
                <div className="p-4">
                    <p className="text-xs text-slate-500 mb-3">
                        Paste the job description you are applying for. We'll check if your resume matches the keywords.
                    </p>
                    <textarea
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                        placeholder="Paste job description here..."
                        className="w-full h-32 p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none mb-3"
                    />
                    <button
                        onClick={analyzeJob}
                        disabled={!jobDesc}
                        className="w-full py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <Search size={16} />
                        Analyze Match
                    </button>

                    {matches && (
                        <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                             <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                                <h4 className="text-xs font-bold text-red-700 mb-2 flex items-center gap-1">
                                    <XCircle size={14} /> Missing Keywords
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {matches.missing.map(kw => (
                                        <span key={kw} className="text-[10px] px-2 py-1 bg-white text-red-600 border border-red-200 rounded-full font-medium">
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                             </div>

                             <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                                <h4 className="text-xs font-bold text-green-700 mb-2 flex items-center gap-1">
                                    <CheckCircle size={14} /> Matched Keywords
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {matches.found.length > 0 ? matches.found.map(kw => (
                                        <span key={kw} className="text-[10px] px-2 py-1 bg-white text-green-600 border border-green-200 rounded-full font-medium">
                                            {kw}
                                        </span>
                                    )) : <span className="text-xs text-slate-400 italic">No matches yet</span>}
                                </div>
                             </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
