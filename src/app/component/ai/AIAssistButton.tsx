import React, { useState } from 'react';
import { Sparkles, Loader2, Check } from 'lucide-react';

interface AIAssistButtonProps {
    onAssist: () => Promise<void>;
    label?: string;
    loadingLabel?: string;
}

export const AIAssistButton: React.FC<AIAssistButtonProps> = ({ 
    onAssist, 
    label = "AI Improve", 
    loadingLabel = "Improving..." 
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        setIsSuccess(false);
        try {
            await onAssist();
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 2000);
        } catch (error) {
            console.error("AI Assist failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading || isSuccess}
            className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300
                ${isSuccess 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 shadow-sm hover:shadow-indigo-100'
                }
            `}
        >
            {isLoading ? (
                <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>{loadingLabel}</span>
                </>
            ) : isSuccess ? (
                <>
                    <Check size={14} />
                    <span>Improved!</span>
                </>
            ) : (
                <>
                    <Sparkles size={14} />
                    <span>{label}</span>
                </>
            )}
        </button>
    );
};
