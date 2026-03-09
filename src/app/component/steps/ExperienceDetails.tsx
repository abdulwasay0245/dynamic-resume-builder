import React from 'react';
import { motion } from 'framer-motion';
import { AIAssistButton } from '../ai/AIAssistButton';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { FormDataState, ExperienceEntry, emptyExperience } from '@/types/FormInput';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableCard } from '../ui/SortableCard';

interface ExperienceDetailsProps {
    data: FormDataState;
    updateData: (fields: Partial<FormDataState>) => void;
}

const ExperienceDetails: React.FC<ExperienceDetailsProps> = ({ data, updateData }) => {
    const experiences = data.experiences;

    const updateEntry = (index: number, fields: Partial<ExperienceEntry>) => {
        const updated = experiences.map((entry, i) =>
            i === index ? { ...entry, ...fields } : entry
        );
        updateData({ experiences: updated });
    };

    const addEntry = () => {
        updateData({ experiences: [...experiences, emptyExperience()] });
    };

    const removeEntry = (index: number) => {
        if (experiences.length <= 1) return;
        updateData({ experiences: experiences.filter((_, i) => i !== index) });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = experiences.findIndex(e => e.id === active.id);
        const newIndex = experiences.findIndex(e => e.id === over.id);
        updateData({ experiences: arrayMove(experiences, oldIndex, newIndex) });
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
                <h2 className="text-xl font-bold text-slate-800">Experience</h2>
                <button
                    onClick={addEntry}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-all"
                >
                    <Plus size={14} />
                    Add Experience
                </button>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={experiences.map(e => e.id)} strategy={verticalListSortingStrategy}>
                    {experiences.map((entry, index) => (
                        <SortableCard key={entry.id} id={entry.id}>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                        <Briefcase size={16} className="text-indigo-500" />
                                        Experience {index + 1}
                                    </div>
                                    {experiences.length > 1 && (
                                        <button
                                            onClick={() => removeEntry(index)}
                                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-600">Job Title / Position</label>
                                    <input
                                        type="text"
                                        value={entry.position}
                                        onChange={(e) => updateEntry(index, { position: e.target.value })}
                                        className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                                        placeholder="e.g. Senior Software Engineer"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-600">Company Name</label>
                                    <input
                                        type="text"
                                        value={entry.company}
                                        onChange={(e) => updateEntry(index, { company: e.target.value })}
                                        className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                                        placeholder="e.g. Tech Solutions Inc."
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-600">Duration</label>
                                    <input
                                        type="text"
                                        value={entry.time}
                                        onChange={(e) => updateEntry(index, { time: e.target.value })}
                                        className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                                        placeholder="e.g. Jan 2020 - Present"
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
                                                    body: JSON.stringify({ text: entry.jobDescription, type: 'experience' })
                                                });
                                                const result = await response.json();
                                                if (result.improvedText) {
                                                    updateEntry(index, { jobDescription: result.improvedText });
                                                }
                                            }}
                                        />
                                    </div>
                                    <textarea
                                        value={entry.jobDescription}
                                        onChange={(e) => updateEntry(index, { jobDescription: e.target.value })}
                                        className="p-3 border border-slate-200 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none bg-white"
                                        placeholder="Describe your roles and responsibilities..."
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

export default ExperienceDetails;
