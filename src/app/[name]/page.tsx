'use client'
import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'next/navigation';
import UserContext from '../context/UserContext';
import { FormDataState } from '../component/ResumeWizard';
import LiveResumePreview from '../component/LiveResumePreview';
import { DownloadPDFButton } from '../component/DownloadPDFButton';
import { Loader2 } from 'lucide-react';

export default function ResumePage() {
    const { Forms } = useContext(UserContext);
    const params = useParams();
    const nameParam = params.name;

    const [resumeData, setResumeData] = useState<FormDataState | null>(null);

    useEffect(() => {
        // 1. Try Context
        if (Forms && Object.keys(Forms).length > 0) {
            setResumeData(Forms as unknown as FormDataState);
            return;
        }

        // 2. Try Session Storage
        const storedData = sessionStorage.getItem('resumeData');
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                setResumeData(parsed);
            } catch (e) {
                console.error("Failed to parse stored resume data", e);
            }
        }
    }, [Forms, nameParam]);

    if (!resumeData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">
                <Loader2 className="animate-spin mr-2" />
                Loading Resume...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4 flex flex-col items-center">
            {/* Header / Actions */}
            <div className="w-full max-w-[210mm] flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">
                    {resumeData.name}&apos;s Resume
                </h1>
                <DownloadPDFButton targetId="resume-to-print" fileName={`${resumeData.name}-Resume.pdf`} />
            </div>

            {/* Resume Container (A4 Width) */}
            <div className="w-full max-w-[210mm] bg-white shadow-2xl rounded-sm overflow-hidden">
                <LiveResumePreview data={resumeData} />
            </div>
        </div>
    );
}
