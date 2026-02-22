import React from 'react';
import { motion } from 'framer-motion';
import { AIAssistButton } from '../ai/AIAssistButton';

interface ExperienceDetailsProps {
    data: {
        position: string;
        company: string;
        time: string;
        jobDescription: string;
    };
    updateData: (fields: Partial<ExperienceDetailsProps['data']>) => void;
}

const ExperienceDetails: React.FC<ExperienceDetailsProps> = ({ data, updateData }) => {
    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col gap-4"
        >
            <h2 className="text-xl font-bold text-slate-800 mb-2">Experience</h2>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">Job Title / Position</label>
                <input
                    type="text"
                    value={data.position}
                    onChange={(e) => updateData({ position: e.target.value })}
                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. Senior Software Engineer"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">Company Name</label>
                <input
                    type="text"
                    value={data.company}
                    onChange={(e) => updateData({ company: e.target.value })}
                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. Tech Solutions Inc."
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">Duration</label>
                <input
                    type="text"
                    value={data.time}
                    onChange={(e) => updateData({ time: e.target.value })}
                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. Jan 2020 - Present"
                    required
                />
            </div>
            <div className="flex flex-col gap-2 relative">
                <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium text-slate-600">Job Description</label>
                    <AIAssistButton 
                        label="Improve with AI"
                        onAssist={async () => {
                            const response = await fetch('/api/ai/improve', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ text: data.jobDescription, type: 'experience' })
                            });
                            const result = await response.json();
                            if (result.improvedText) {
                                updateData({ jobDescription: result.improvedText });
                            }
                        }}
                    />
                </div>
                <textarea
                    value={data.jobDescription}
                    onChange={(e) => updateData({ jobDescription: e.target.value })}
                    className="p-3 border border-slate-200 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                    placeholder="Describe your roles and responsibilities..."
                    required
                />
            </div>

        </motion.div>
    );
};

export default ExperienceDetails;
