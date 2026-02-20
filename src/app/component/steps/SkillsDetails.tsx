import React from 'react';
import { motion } from 'framer-motion';
import { SkillSuggester } from '../ai/SkillSuggester';

interface SkillsDetailsProps {
    data: {
        skills: string;
    };
    updateData: (fields: Partial<SkillsDetailsProps['data']>) => void;
}

const SkillsDetails: React.FC<SkillsDetailsProps> = ({ data, updateData }) => {
    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col gap-4"
        >
            <h2 className="text-xl font-bold text-slate-800 mb-2">Skills</h2>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">Skills (Comma Separated)</label>
                <textarea
                    value={data.skills}
                    onChange={(e) => updateData({ skills: e.target.value })}
                    className="p-3 border border-slate-200 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                    placeholder="e.g. JavaScript, React, Node.js, Python, Team Leadership"
                    required
                />
                <p className="text-xs text-slate-500">Separate each skill with a comma.</p>
            </div>
        </motion.div>
    );
};

export default SkillsDetails;
