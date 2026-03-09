'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LiveResumePreview from '../../component/LiveResumePreview';
import { DownloadPDFButton } from '../../component/DownloadPDFButton';
import { FormDataState } from '@/types/FormInput';
import { Loader2, Link2, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function SharedResumePage() {
    const params = useParams();
    const shareId = params.shareId as string;

    const [resumeData, setResumeData] = useState<FormDataState | null>(null);
    const [resumeName, setResumeName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showQR, setShowQR] = useState(false);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await fetch(`/api/resumes/share/${shareId}`);
                if (!res.ok) {
                    setError('This resume is not available or has been removed.');
                    return;
                }
                const data = await res.json();
                setResumeData(data.content);
                setResumeName(data.name);
            } catch {
                setError('Failed to load resume.');
            } finally {
                setIsLoading(false);
            }
        };

        if (shareId) fetchResume();
    }, [shareId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">
                <Loader2 className="animate-spin mr-2" />
                Loading shared resume...
            </div>
        );
    }

    if (error || !resumeData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center p-8">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400">
                        <Link2 size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Resume Not Found</h1>
                    <p className="text-slate-500">{error || 'This link may have expired or been removed.'}</p>
                </div>
            </div>
        );
    }

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4 flex flex-col items-center">
            {/* Header */}
            <div className="w-full max-w-[210mm] flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">{resumeName}&apos;s Resume</h1>
                    <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                        <Link2 size={14} /> Shared publicly via ResumeCraft
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowQR(!showQR)}
                        className="p-2.5 bg-white text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
                        title="Show QR Code"
                    >
                        <QrCode size={18} />
                    </button>
                    <DownloadPDFButton targetId="resume-to-print" fileName={`${resumeName}-Resume.pdf`} />
                </div>
            </div>

            {/* QR Code Panel */}
            {showQR && (
                <div className="w-full max-w-[210mm] mb-6 bg-white p-6 rounded-xl shadow-lg border border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-slate-800 mb-1">QR Code</h3>
                        <p className="text-sm text-slate-500 mb-3">Scan to view this resume on any device</p>
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                            <input
                                readOnly
                                value={currentUrl}
                                className="bg-transparent text-xs text-slate-600 outline-none flex-1 min-w-0"
                            />
                            <button
                                onClick={() => { navigator.clipboard.writeText(currentUrl); }}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 whitespace-nowrap"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <QRCodeSVG value={currentUrl} size={120} level="M" />
                    </div>
                </div>
            )}

            {/* Resume */}
            <div className="w-full max-w-[210mm] bg-white shadow-2xl rounded-sm overflow-hidden">
                <LiveResumePreview data={resumeData} />
            </div>
        </div>
    );
}
