import React, { useRef, useState } from 'react';
import { Camera, X, Upload } from 'lucide-react';

interface PhotoUploadProps {
    photo: string;
    onPhotoChange: (dataUrl: string) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ photo, onPhotoChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const processImage = (file: File) => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Resize to 200x200
                const canvas = document.createElement('canvas');
                canvas.width = 200;
                canvas.height = 200;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                // Center crop
                const size = Math.min(img.width, img.height);
                const sx = (img.width - size) / 2;
                const sy = (img.height - size) / 2;
                ctx.drawImage(img, sx, sy, size, size, 0, 0, 200, 200);

                onPhotoChange(canvas.toDataURL('image/jpeg', 0.85));
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) processImage(file);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processImage(file);
    };

    return (
        <div className="flex items-center gap-4">
            <div
                className={`relative w-20 h-20 rounded-full overflow-hidden border-2 transition-all cursor-pointer group ${
                    isDragging ? 'border-indigo-500 bg-indigo-50 scale-105' : photo ? 'border-indigo-200' : 'border-dashed border-slate-300 bg-slate-50'
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                {photo ? (
                    <>
                        <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera size={20} className="text-white" />
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Upload size={24} />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors text-left"
                >
                    {photo ? 'Change Photo' : 'Upload Photo'}
                </button>
                <span className="text-xs text-slate-400">JPG, PNG (max 2MB)</span>
                {photo && (
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onPhotoChange(''); }}
                        className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 mt-0.5"
                    >
                        <X size={12} /> Remove
                    </button>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
            />
        </div>
    );
};

export default PhotoUpload;
