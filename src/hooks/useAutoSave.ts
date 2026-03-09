import { useEffect, useRef, useState } from 'react';
import { FormDataState } from '@/types/FormInput';

const STORAGE_KEY = 'resumecraft_autosave';
const SAVE_INTERVAL = 5000; // 5 seconds

export function useAutoSave(formData: FormDataState, setFormData: React.Dispatch<React.SetStateAction<FormDataState>>) {
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [secondsAgo, setSecondsAgo] = useState<number | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-save to sessionStorage every 5 seconds
    useEffect(() => {
        timerRef.current = setInterval(() => {
            try {
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
                setLastSaved(new Date());
            } catch {
                // Storage full or unavailable
            }
        }, SAVE_INTERVAL);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [formData]);

    // Update "seconds ago" display
    useEffect(() => {
        const interval = setInterval(() => {
            if (lastSaved) {
                setSecondsAgo(Math.floor((Date.now() - lastSaved.getTime()) / 1000));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [lastSaved]);

    // Restore on mount
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Only restore if there's actual data
                if (parsed.name || parsed.email) {
                    setFormData(parsed);
                    setLastSaved(new Date());
                }
            }
        } catch {
            // Ignore parse errors
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStatusText = () => {
        if (secondsAgo === null) return null;
        if (secondsAgo < 5) return 'Saved just now';
        if (secondsAgo < 60) return `Saved ${secondsAgo}s ago`;
        return `Saved ${Math.floor(secondsAgo / 60)}m ago`;
    };

    return { lastSaved, statusText: getStatusText() };
}
