'use client'
import React, { useState } from 'react';
import Header from '../component/Header';
import ResumeWizard, { FormDataState } from '../component/ResumeWizard';
import LiveResumePreview from '../component/LiveResumePreview';
import { ResumeScore } from '../component/ai/ResumeScore';
import { JobMatcher } from '../component/ai/JobMatcher';
import { DownloadPDFButton } from '../component/DownloadPDFButton';

const ResumeBuilder = () => {
    const [formData, setFormData] = useState<FormDataState>({
        name: "",
        email: "",
        number: "",
        address: "",
        degName: "",
        university: "",
        educationYear: "",
        education_summary: "",
        position: "",
        company: "",
        time: "",
        jobDescription: "",
        skills: "",
    });

    return (
        <div className="relative flex min-h-screen flex-col bg-slate-50 font-sans pt-16">
            <Header />

            <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-80px)]">
                
                {/* Left Column: Wizard & AI Tools */}
                <div className="flex flex-col h-full gap-6 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex-1 min-h-[500px]">
                        <ResumeWizard formData={formData} setFormData={setFormData} />
                    </div>
                    
                    {/* AI Tools Section - Mobile Friendly */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        <ResumeScore data={formData} />
                        <JobMatcher data={formData} />
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

                {/* Mobile Preview Button (Floating) */}
                 <div className="lg:hidden fixed bottom-4 right-4 z-50">
                    <button className="bg-slate-900 text-white p-4 rounded-full shadow-xl" onClick={() => {
                        const preview = document.getElementById('mobile-preview');
                        if(preview) preview.classList.toggle('hidden');
                    }}>
                        Preview
                    </button>
                 </div>

                 {/* Mobile Preview Modal */}
                 <div id="mobile-preview" className="hidden fixed inset-0 bg-black/50 z-40 lg:hidden flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white w-full h-[80vh] rounded-xl overflow-hidden shadow-2xl flex flex-col">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-bold">Resume Preview</h3>
                            <button onClick={() => {
                                 const preview = document.getElementById('mobile-preview');
                                if(preview) preview.classList.add('hidden');
                            }} className="p-2 bg-slate-100 rounded-full">✕</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 bg-slate-200">
                             <LiveResumePreview data={formData} />
                        </div>
                    </div>
                 </div>

            </main>
        </div>
    );
};

export default ResumeBuilder;