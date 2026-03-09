import { useRef, useCallback } from 'react';
import { FormDataState } from '@/types/FormInput';

const MAX_HISTORY = 30;

export function useUndoRedo(
    formData: FormDataState,
    setFormData: React.Dispatch<React.SetStateAction<FormDataState>>
) {
    const historyRef = useRef<FormDataState[]>([]);
    const futureRef = useRef<FormDataState[]>([]);
    const lastSnapshotRef = useRef<string>('');

    // Take a snapshot before changes (call this from onChange handlers)
    const snapshot = useCallback(() => {
        const current = JSON.stringify(formData);
        if (current !== lastSnapshotRef.current) {
            historyRef.current = [...historyRef.current.slice(-MAX_HISTORY), formData];
            futureRef.current = [];
            lastSnapshotRef.current = current;
        }
    }, [formData]);

    const undo = useCallback(() => {
        if (historyRef.current.length === 0) return;
        const previous = historyRef.current[historyRef.current.length - 1];
        historyRef.current = historyRef.current.slice(0, -1);
        futureRef.current = [formData, ...futureRef.current];
        setFormData(previous);
        lastSnapshotRef.current = JSON.stringify(previous);
    }, [formData, setFormData]);

    const redo = useCallback(() => {
        if (futureRef.current.length === 0) return;
        const next = futureRef.current[0];
        futureRef.current = futureRef.current.slice(1);
        historyRef.current = [...historyRef.current, formData];
        setFormData(next);
        lastSnapshotRef.current = JSON.stringify(next);
    }, [formData, setFormData]);

    return {
        undo,
        redo,
        snapshot,
        canUndo: historyRef.current.length > 0,
        canRedo: futureRef.current.length > 0,
    };
}
