'use client';

import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import { motion } from 'framer-motion';
import { FileText, Edit, Trash2, Plus, Clock, ExternalLink, Loader2, Share2, Copy, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

interface Resume {
    id: string;
    name: string;
    templateId: string;
    content: string;
    updatedAt: string;
    shareId?: string;
}

export default function Dashboard() {
    const { status } = useSession();
    const router = useRouter();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [shareModal, setShareModal] = useState<{ resumeId: string; shareUrl: string } | null>(null);
    const [isSharing, setIsSharing] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        } else if (status === 'authenticated') {
            fetchResumes();
        }
    }, [status, router]);

    const fetchResumes = async () => {
        try {
            const response = await fetch('/api/resumes');
            const data = await response.json();
            if (Array.isArray(data)) {
                setResumes(data);
            }
        } catch (error) {
            console.error("Failed to fetch resumes", error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteResume = async (id: string) => {
        if (!confirm("Are you sure you want to delete this resume?")) return;
        
        try {
            await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
            setResumes(resumes.filter(r => r.id !== id));
            toast.success("Resume deleted successfully");
        } catch (error) {
            console.error("Delete failed", error);
            toast.error("Failed to delete resume");
        }
    };

    const shareResume = async (resumeId: string) => {
        setIsSharing(true);
        try {
            const res = await fetch('/api/resumes/share', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeId })
            });
            const data = await res.json();
            if (data.shareUrl) {
                const fullUrl = `${window.location.origin}${data.shareUrl}`;
                setShareModal({ resumeId, shareUrl: fullUrl });
                toast.success("Share link created!");
            } else {
                toast.error(data.error || "Failed to create share link");
            }
        } catch (error) {
            console.error("Share failed", error);
            toast.error("Failed to share resume");
        } finally {
            setIsSharing(false);
        }
    };

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success("Link copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header />
            
            <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">My Resumes</h1>
                        <p className="text-slate-500">Manage and edit your saved resume drafts.</p>
                    </div>
                    <Link href="/buildResume">
                        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                            <Plus size={20} />
                            Create New
                        </button>
                    </Link>
                </div>

                {resumes.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl border border-slate-200 border-dashed p-12 text-center"
                    >
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No resumes found</h3>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                            You haven&apos;t created any resumes yet. Start building your professional profile now!
                        </p>
                        <Link href="/buildResume">
                            <button className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all">
                                Get Started
                            </button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume) => (
                            <motion.div 
                                key={resume.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-100 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button 
                                            onClick={() => shareResume(resume.id)}
                                            disabled={isSharing}
                                            className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all"
                                            title="Share"
                                        >
                                            <Share2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => deleteResume(resume.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                    {resume.name}
                                </h3>
                                
                                <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={14} />
                                        <span>Updated {new Date(resume.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="capitalize px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                                        {resume.templateId}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <button 
                                        onClick={() => {
                                            const data = JSON.parse(resume.content);
                                            sessionStorage.setItem('resumeData', JSON.stringify(data));
                                            router.push('/buildResume');
                                        }}
                                        className="flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-all"
                                    >
                                        <Edit size={14} />
                                        Edit
                                    </button>
                                    <Link 
                                        href={`/${encodeURIComponent(resume.name)}`}
                                        onClick={() => {
                                            const data = JSON.parse(resume.content);
                                            sessionStorage.setItem('resumeData', JSON.stringify(data));
                                        }}
                                        className="flex items-center justify-center gap-2 py-2.5 bg-white text-slate-700 border border-slate-200 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-all"
                                    >
                                        <ExternalLink size={14} />
                                        View
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            {/* Share Modal */}
            {shareModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900">Share Resume</h3>
                            <button
                                onClick={() => { setShareModal(null); setCopied(false); }}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <QRCodeSVG value={shareModal.shareUrl} size={160} level="M" />
                            </div>
                        </div>

                        <p className="text-sm text-slate-500 text-center mb-4">Scan QR code or copy the link below</p>

                        <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                            <input
                                readOnly
                                value={shareModal.shareUrl}
                                className="flex-1 bg-transparent text-sm text-slate-600 outline-none min-w-0"
                            />
                            <button
                                onClick={() => copyToClipboard(shareModal.shareUrl)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all flex-shrink-0"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
