import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableCardProps {
    id: string;
    children: React.ReactNode;
}

export const SortableCard: React.FC<SortableCardProps> = ({ id, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : 'auto' as const,
    };

    return (
        <div ref={setNodeRef} style={style} className="relative">
            <div
                {...attributes}
                {...listeners}
                className="absolute top-4 left-1.5 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 transition-colors z-10"
                title="Drag to reorder"
            >
                <GripVertical size={16} />
            </div>
            <div className="pl-6">
                {children}
            </div>
        </div>
    );
};
