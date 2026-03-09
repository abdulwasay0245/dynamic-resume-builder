import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, FolderGit2, ExternalLink } from 'lucide-react';
import { FormDataState, ProjectEntry, emptyProject } from '@/types/FormInput';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableCard } from '../ui/SortableCard';

interface ProjectsDetailsProps {
    data: FormDataState;
    updateData: (fields: Partial<FormDataState>) => void;
}

const ProjectsDetails: React.FC<ProjectsDetailsProps> = ({ data, updateData }) => {
    const projects = data.projects;

    const updateEntry = (index: number, fields: Partial<ProjectEntry>) => {
        const updated = projects.map((entry, i) =>
            i === index ? { ...entry, ...fields } : entry
        );
        updateData({ projects: updated });
    };

    const addEntry = () => {
        updateData({ projects: [...projects, emptyProject()] });
    };

    const removeEntry = (index: number) => {
        updateData({ projects: projects.filter((_, i) => i !== index) });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = projects.findIndex(e => e.id === active.id);
        const newIndex = projects.findIndex(e => e.id === over.id);
        updateData({ projects: arrayMove(projects, oldIndex, newIndex) });
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
                <h2 className="text-xl font-bold text-slate-800">Projects</h2>
                <button
                    onClick={addEntry}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-all"
                >
                    <Plus size={14} />
                    Add Project
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                    <FolderGit2 size={32} className="mx-auto mb-2 text-slate-300" />
                    <p className="text-sm text-slate-500 mb-3">No projects added yet. Showcase your work!</p>
                    <button onClick={addEntry} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                        + Add your first project
                    </button>
                </div>
            ) : (
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
                        {projects.map((entry, index) => (
                            <SortableCard key={entry.id} id={entry.id}>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                            <FolderGit2 size={16} className="text-indigo-500" />
                                            Project {index + 1}
                                        </div>
                                        <button
                                            onClick={() => removeEntry(index)}
                                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-slate-600">Project Name</label>
                                        <input
                                            type="text"
                                            value={entry.projectName}
                                            onChange={(e) => updateEntry(index, { projectName: e.target.value })}
                                            className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                            placeholder="e.g. E-commerce Platform"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                                            <ExternalLink size={12} /> Project URL
                                        </label>
                                        <input
                                            type="url"
                                            value={entry.projectUrl}
                                            onChange={(e) => updateEntry(index, { projectUrl: e.target.value })}
                                            className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                            placeholder="e.g. https://github.com/user/project"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-slate-600">Description</label>
                                        <textarea
                                            value={entry.projectDescription}
                                            onChange={(e) => updateEntry(index, { projectDescription: e.target.value })}
                                            className="p-3 border border-slate-200 rounded-lg h-20 focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-white"
                                            placeholder="Describe the project, tech stack, and your role..."
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

export default ProjectsDetails;
