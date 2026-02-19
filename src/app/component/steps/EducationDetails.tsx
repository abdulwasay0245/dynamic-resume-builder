import React from 'react';
import { motion } from 'framer-motion';

interface EducationDetailsProps {
    data: {
        degName: string;
        university: string;
        educationYear: string;
         education_summary: string;
    };
    updateData: (fields: Partial<EducationDetailsProps['data']>) => void;
}

const EducationDetails: React.FC<EducationDetailsProps> = ({ data, updateData }) => {
    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col gap-4"
        >
            <h2 className="text-xl font-bold text-slate-800 mb-2">Education</h2>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">Degree Name</label>
                <input
                    type="text"
                    value={data.degName}
                    onChange={(e) => updateData({ degName: e.target.value })}
                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. Bachelor of Science in Computer Science"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">University / Institution</label>
                <input
                    type="text"
                    value={data.university}
                    onChange={(e) => updateData({ university: e.target.value })}
                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. Stanford University"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">Year of Graduation</label>
                <input
                    type="text"
                    value={data.educationYear}
                    onChange={(e) => updateData({ educationYear: e.target.value })}
                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. 2024"
                    required
                />
            </div>
               <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-600">Summary about yourself</label>
                            <textarea
                                value={data.education_summary}
                                onChange={(e) => updateData({ education_summary: e.target.value })}
                                className="p-3 border border-slate-200 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                placeholder="Write a summary about yourself..."
                                required
                            />
                        </div>
        </motion.div>
    );
};

export default EducationDetails;
