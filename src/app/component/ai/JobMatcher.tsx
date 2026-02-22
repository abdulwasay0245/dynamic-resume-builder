import React, { useState } from 'react';
import { Target, Search, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FormDataState } from '../ResumeWizard';

export const JobMatcher = ({ data }: { data: FormDataState }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [jobDesc, setJobDesc] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [matches, setMatches] = useState<{ found: string[], missing: string[], score: number, summary: string } | null>(null);

    const analyzeJob = async () => {
        if (!jobDesc) return;
        setIsLoading(true);
        try {
            const response = await fetch('/api/ai/analyze-match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeData: data, jobDescription: jobDesc })
            });
            const result = await response.json();
            setMatches({
                found: result.matched || [],
                missing: result.missing || [],
                score: result.score || 0,
                summary: result.summary || ""
            });
        } catch (error) {
            console.error("Analysis failed", error);
        } finally {
            setIsLoading(false);
        }
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
                        Paste the job description you are applying for. We&apos;ll check if your resume matches the keywords.
                    </p>
                    <textarea
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                        placeholder="Paste job description here..."
                        className="w-full h-32 p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none mb-3"
                    />
                    <button
                        onClick={analyzeJob}
                        disabled={!jobDesc || isLoading}
                        className="w-full py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Search size={16} />
                                Analyze Match
                            </>
                        )}
                    </button>

                    {matches && (
                        <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                             <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 mb-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-indigo-700">Match Score</span>
                                    <span className="text-sm font-black text-indigo-700">{matches.score}%</span>
                                </div>
                                <p className="text-[11px] text-slate-600 leading-relaxed italic">
                                    &quot;{matches.summary}&quot;
                                </p>
                             </div>

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
