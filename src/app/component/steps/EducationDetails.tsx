import React from 'react';
import { motion } from 'framer-motion';
import { AIAssistButton } from '../ai/AIAssistButton';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { FormDataState, EducationEntry, emptyEducation } from '@/types/FormInput';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableCard } from '../ui/SortableCard';

interface EducationDetailsProps {
    data: FormDataState;
    updateData: (fields: Partial<FormDataState>) => void;
}

const EducationDetails: React.FC<EducationDetailsProps> = ({ data, updateData }) => {
    const education = data.education;

    const updateEntry = (index: number, fields: Partial<EducationEntry>) => {
        const updated = education.map((entry, i) =>
            i === index ? { ...entry, ...fields } : entry
        );
        updateData({ education: updated });
    };

    const addEntry = () => {
        updateData({ education: [...education, emptyEducation()] });
    };

    const removeEntry = (index: number) => {
        if (education.length <= 1) return;
        updateData({ education: education.filter((_, i) => i !== index) });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = education.findIndex(e => e.id === active.id);
        const newIndex = education.findIndex(e => e.id === over.id);
        updateData({ education: arrayMove(education, oldIndex, newIndex) });
    };

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col gap-4"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">Education</h2>
                <button
                    onClick={addEntry}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-all"
                >
                    <Plus size={14} />
                    Add Education
                </button>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={education.map(e => e.id)} strategy={verticalListSortingStrategy}>
                    {education.map((entry, index) => (
                        <SortableCard key={entry.id} id={entry.id}>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                        <GraduationCap size={16} className="text-indigo-500" />
                                        Education {index + 1}
                                    </div>
                                    {education.length > 1 && (
                                        <button
                                            onClick={() => removeEntry(index)}
                                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-600">Degree Name</label>
                                    <input
                                        type="text"
                                        value={entry.degName}
                                        onChange={(e) => updateEntry(index, { degName: e.target.value })}
                                        className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                                        placeholder="e.g. Bachelor of Science in Computer Science"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-600">University / Institution</label>
                                    <input
                                        type="text"
                                        value={entry.university}
                                        onChange={(e) => updateEntry(index, { university: e.target.value })}
                                        className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                                        placeholder="e.g. Stanford University"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-600">Year of Graduation</label>
                                    <input
                                        type="text"
                                        value={entry.educationYear}
                                        onChange={(e) => updateEntry(index, { educationYear: e.target.value })}
                                        className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                                        placeholder="e.g. 2024"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 relative">
                                    <div className="flex items-center justify-between mb-1">
                                        <label className="text-sm font-medium text-slate-600">Education Summary</label>
                                        <AIAssistButton 
                                            label="Enhance with AI"
                                            onAssist={async () => {
                                                const response = await fetch('/api/ai/improve', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ text: entry.education_summary, type: 'education' })
                                                });
                                                const result = await response.json();
                                                if (result.improvedText) {
                                                    updateEntry(index, { education_summary: result.improvedText });
                                                }
                                            }}
                                        />
                                    </div>
                                    <textarea
                                        value={entry.education_summary}
                                        onChange={(e) => updateEntry(index, { education_summary: e.target.value })}
                                        className="p-3 border border-slate-200 rounded-lg h-24 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none bg-white"
                                        placeholder="Highlight your academic achievements..."
                                    />
                                </div>
                            </div>
                        </SortableCard>
                    ))}
                </SortableContext>
            </DndContext>
        </motion.div>
    );
};

export default EducationDetails;
