'use client';

import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, Copy, Check, Loader2 } from 'lucide-react';
import { FormDataState } from '@/types/FormInput';
import { toast } from 'sonner';

export const CoverLetterGenerator = ({ data }: { data: FormDataState }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [jobDesc, setJobDesc] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [coverLetter, setCoverLetter] = useState("");
    const [copied, setCopied] = useState(false);

    const generateCoverLetter = async () => {
        if (!jobDesc) return;
        setIsLoading(true);
        try {
            const response = await fetch('/api/ai/cover-letter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeData: data, jobDescription: jobDesc, companyName })
            });
            const result = await response.json();
            if (result.coverLetter) {
                setCoverLetter(result.coverLetter);
                toast.success("Cover letter generated!");
            } else {
                toast.error(result.error || "Failed to generate cover letter");
            }
        } catch (error) {
            console.error("Cover letter generation failed", error);
            toast.error("Failed to generate cover letter. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(coverLetter);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-indigo-50 hover:from-violet-100 hover:to-indigo-100 transition-colors"
            >
                <div className="flex items-center gap-2 text-violet-700 font-bold text-sm">
                    <FileText size={18} />
                    <span>AI Cover Letter Generator</span>
                </div>
                {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
            </button>

            {isOpen && (
                <div className="p-4">
                    <p className="text-xs text-slate-500 mb-3">
                        Generate a tailored cover letter based on your resume and the job you&apos;re applying for.
                    </p>

                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company name (optional)"
                        className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none mb-3"
                    />

                    <textarea
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                        placeholder="Paste the job description here..."
                        className="w-full h-28 p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none resize-none mb-3"
                    />

                    <button
                        onClick={generateCoverLetter}
                        disabled={!jobDesc || isLoading}
                        className="w-full py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <FileText size={16} />
                                Generate Cover Letter
                            </>
                        )}
                    </button>

                    {coverLetter && (
                        <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-violet-700">Your Cover Letter</span>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all"
                                >
                                    {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                                {coverLetter}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
