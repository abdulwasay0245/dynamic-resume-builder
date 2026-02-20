import React, { useEffect, useState } from 'react';
import { Gauge, AlertCircle, CheckCircle } from 'lucide-react';
import { FormDataState } from '../ResumeWizard';

export const ResumeScore = ({ data }: { data: FormDataState }) => {
    const [score, setScore] = useState(0);
    const [tips, setTips] = useState<string[]>([]);

    useEffect(() => {
        let newScore = 0;
        const newTips: string[] = [];

        // Basic Info
        if (data.name) newScore += 10;
        if (data.email && data.number) newScore += 10;
        else newTips.push("Add contact details");

        // Experience - Length Check
        if (data.jobDescription?.length > 50) newScore += 20;
        else newTips.push("Expand job description (> 50 chars)");

        // Skills Check
        const skillsCount = data.skills.split(',').filter(s => s.trim()).length;
        if (skillsCount >= 5) newScore += 20;
        else newTips.push(`Add more skills (Goal: 5+, Current: ${skillsCount})`);

        // Summary
        if (data.education_summary?.length > 30) newScore += 10;

        // Position & Company
        if (data.position && data.company) newScore += 20;

        setScore(Math.min(100, newScore));
        setTips(newTips);
    }, [data]);

    const getColor = (s: number) => {
        if (s < 50) return "text-red-500";
        if (s < 80) return "text-yellow-500";
        return "text-green-500";
    };

    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-slate-50 ${getColor(score)}`}>
                        <Gauge size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm">Resume Score</h3>
                        <p className="text-xs text-slate-500">Real-time analysis</p>
                    </div>
                </div>
                <div className={`text-2xl font-black ${getColor(score)}`}>
                    {score}%
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                <div 
                    className={`h-full transition-all duration-500 ${score < 50 ? 'bg-red-500' : score < 80 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                    style={{ width: `${score}%` }}
                ></div>
            </div>

            {/* Tips Section */}
            {tips.length > 0 ? (
                <div className="space-y-2">
                    {tips.map((tip, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                            <AlertCircle size={12} className="text-amber-500 flex-shrink-0" />
                            <span>{tip}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 p-2 rounded border border-green-100">
                    <CheckCircle size={12} />
                    <span>Great job! Your resume looks strong.</span>
                </div>
            )}
        </div>
    );
};
