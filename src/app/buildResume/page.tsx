'use client'
import React, { useState, useCallback, useEffect } from 'react';
import Header from '../component/Header';
import ResumeWizard from '../component/ResumeWizard';
import LiveResumePreview from '../component/LiveResumePreview';
import { ResumeScore } from '../component/ai/ResumeScore';
import { JobMatcher } from '../component/ai/JobMatcher';
import { CoverLetterGenerator } from '../component/ai/CoverLetterGenerator';
import { DownloadPDFButton } from '../component/DownloadPDFButton';
import { initialFormData, FormDataState } from '@/types/FormInput';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useUndoRedo } from '@/hooks/useUndoRedo';
import { Undo2, Redo2, Clock } from 'lucide-react';

const ResumeBuilder = () => {
    const [formData, setFormData] = useState<FormDataState>({ ...initialFormData });
    const [showMobilePreview, setShowMobilePreview] = useState(false);

    const { statusText } = useAutoSave(formData, setFormData);
    const { undo, redo, snapshot, canUndo, canRedo } = useUndoRedo(formData, setFormData);

    // Take snapshot on every meaningful change (debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            snapshot();
        }, 1000);
        return () => clearTimeout(timer);
    }, [formData, snapshot]);

    // Keyboard shortcuts
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
            e.preventDefault();
            if (e.shiftKey) {
                redo();
            } else {
                undo();
            }
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
            e.preventDefault();
            redo();
        }
    }, [undo, redo]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <div className="relative flex min-h-screen flex-col bg-slate-50 font-sans pt-16">
            <Header />

            {/* Top Bar: Auto-save status + Undo/Redo */}
            <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 pt-4 flex items-center justify-between">
                {statusText && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock size={12} />
                        <span>{statusText}</span>
                    </div>
                )}
                <div className="flex items-center gap-1 ml-auto">
                    <button
                        onClick={undo}
                        disabled={!canUndo}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo2 size={16} />
                    </button>
                    <button
                        onClick={redo}
                        disabled={!canRedo}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Redo (Ctrl+Shift+Z)"
                    >
                        <Redo2 size={16} />
                    </button>
                </div>
            </div>

            <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-120px)]">
                
                {/* Left Column: Wizard & AI Tools */}
                <div className="flex flex-col h-full gap-6 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex-1 min-h-[500px]">
                        <ResumeWizard formData={formData} setFormData={setFormData} />
                    </div>
                    
                    {/* AI Tools Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        <ResumeScore data={formData} />
                        <JobMatcher data={formData} />
                        <CoverLetterGenerator data={formData} />
                    </div>
                </div>

                {/* Right Column: Live Preview */}
                <div className="hidden lg:flex flex-col h-full bg-slate-200 rounded-2xl p-4 overflow-hidden shadow-inner border border-slate-300">
                    <div className="flex items-center justify-between mb-2 px-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Preview</span>
                        <div className="flex items-center gap-4">
                            <DownloadPDFButton targetId="resume-to-print" />
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            </div>
                        </div>
                    </div>
                    <div id="resume-preview-container" className="flex-1 overflow-y-auto custom-scrollbar rounded-xl shadow-2xl bg-white">
                         <LiveResumePreview data={formData} />
                    </div>
                </div>

                {/* Mobile Preview Button */}
                 <div className="lg:hidden fixed bottom-4 right-4 z-50">
                    <button 
                        className="bg-slate-900 text-white p-4 rounded-full shadow-xl" 
                        onClick={() => setShowMobilePreview(true)}
                    >
                        Preview
                    </button>
                 </div>

                 {/* Mobile Preview Modal */}
                 {showMobilePreview && (
                     <div className="fixed inset-0 bg-black/50 z-40 lg:hidden flex items-center justify-center p-4 backdrop-blur-sm">
                        <div className="bg-white w-full h-[80vh] rounded-xl overflow-hidden shadow-2xl flex flex-col">
                            <div className="p-4 border-b flex justify-between items-center">
                                <h3 className="font-bold">Resume Preview</h3>
                                <button 
                                    onClick={() => setShowMobilePreview(false)} 
                                    className="p-2 bg-slate-100 rounded-full"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-2 bg-slate-200">
                                 <LiveResumePreview data={formData} />
                            </div>
                        </div>
                     </div>
                 )}
            </main>
        </div>
    );
};

export default ResumeBuilder;