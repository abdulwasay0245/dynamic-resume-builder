import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DownloadPDFButtonProps {
    targetId: string;
    fileName?: string;
}

export const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({ targetId, fileName = "resume.pdf" }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        const element = document.getElementById(targetId);
        if (!element) return;

        setIsLoading(true);
        try {
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(fileName);
        } catch (error) {
            console.error("PDF Generation failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            Download PDF
        </button>
    );
};
