'use client';

import React, { useState } from 'react';
import { Download, Loader2, Printer } from 'lucide-react';
import { toCanvas } from 'html-to-image';
import { jsPDF } from 'jspdf';

interface DownloadPDFButtonProps {
    targetId: string;
    fileName?: string;
}

export const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({ targetId, fileName = "resume.pdf" }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        const element = document.getElementById(targetId);
        if (!element) {
            alert("Resume preview not found. Please wait for the page to fully load.");
            return;
        }

        setIsLoading(true);
        try {
            // Wait for all fonts and images to settle in the DOM
            await new Promise(resolve => setTimeout(resolve, 800));

            // Use html-to-image (toCanvas) which is more accurate for modern CSS
            const canvas = await toCanvas(element, {
                quality: 1,
                pixelRatio: 2, // 2x resolution is usually enough for A4 without crashing memory
                backgroundColor: '#ffffff',
                style: {
                    transform: 'none',
                    boxShadow: 'none'
                }
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                putOnlyUsedFonts: true
            });

            // Calculate dimensions to fit A4 (210mm x 297mm)
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
            
            // Generate as a Blob for a more "forced" download in modern browsers
            const pdfBlob = pdf.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error("PDF Download failed:", error);
            alert("Direct download failed. Please use the 'Browser Print' button next to it.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrintFallback = () => {
        window.print();
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleDownload}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                {isLoading ? (
                    <Loader2 size={18} className="animate-spin text-indigo-400" />
                ) : (
                    <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                )}
                {isLoading ? "Generating..." : "Download PDF"}
            </button>

            {/* Fallback Print Button */}
            <button
                onClick={handlePrintFallback}
                className="p-2 bg-white text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
                title="Print as PDF (100% Guaranteed)"
            >
                <Printer size={18} />
            </button>
        </div>
    );
};
