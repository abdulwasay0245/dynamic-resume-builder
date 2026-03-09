import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Award } from 'lucide-react';
import { FormDataState, CertificationEntry, emptyCertification } from '@/types/FormInput';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableCard } from '../ui/SortableCard';

interface CertificationsDetailsProps {
    data: FormDataState;
    updateData: (fields: Partial<FormDataState>) => void;
}

const CertificationsDetails: React.FC<CertificationsDetailsProps> = ({ data, updateData }) => {
    const certifications = data.certifications;

    const updateEntry = (index: number, fields: Partial<CertificationEntry>) => {
        const updated = certifications.map((entry, i) =>
            i === index ? { ...entry, ...fields } : entry
        );
        updateData({ certifications: updated });
    };

    const addEntry = () => {
        updateData({ certifications: [...certifications, emptyCertification()] });
    };

    const removeEntry = (index: number) => {
        updateData({ certifications: certifications.filter((_, i) => i !== index) });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = certifications.findIndex(e => e.id === active.id);
        const newIndex = certifications.findIndex(e => e.id === over.id);
        updateData({ certifications: arrayMove(certifications, oldIndex, newIndex) });
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
                <h2 className="text-xl font-bold text-slate-800">Certifications</h2>
                <button
                    onClick={addEntry}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-all"
                >
                    <Plus size={14} />
                    Add Certification
                </button>
            </div>

            {certifications.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                    <Award size={32} className="mx-auto mb-2 text-slate-300" />
                    <p className="text-sm text-slate-500 mb-3">No certifications added yet.</p>
                    <button onClick={addEntry} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                        + Add your first certification
                    </button>
                </div>
            ) : (
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={certifications.map(c => c.id)} strategy={verticalListSortingStrategy}>
                        {certifications.map((entry, index) => (
                            <SortableCard key={entry.id} id={entry.id}>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                            <Award size={16} className="text-amber-500" />
                                            Certification {index + 1}
                                        </div>
                                        <button
                                            onClick={() => removeEntry(index)}
                                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-slate-600">Certification Name</label>
                                        <input
                                            type="text"
                                            value={entry.certName}
                                            onChange={(e) => updateEntry(index, { certName: e.target.value })}
                                            className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                            placeholder="e.g. AWS Solutions Architect"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-slate-600">Issuing Organization</label>
                                        <input
                                            type="text"
                                            value={entry.certIssuer}
                                            onChange={(e) => updateEntry(index, { certIssuer: e.target.value })}
                                            className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                            placeholder="e.g. Amazon Web Services"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-slate-600">Year</label>
                                        <input
                                            type="text"
                                            value={entry.certYear}
                                            onChange={(e) => updateEntry(index, { certYear: e.target.value })}
                                            className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                            placeholder="e.g. 2024"
                                        />
                                    </div>
                                </div>
                            </SortableCard>
                        ))}
                    </SortableContext>
                </DndContext>
            )}
        </motion.div>
    );
};

export default CertificationsDetails;
