import React from 'react';
import { FormDataState } from '../ResumeWizard';

export const ProfessionalTemplate = ({ data }: { data: FormDataState }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(s => s);
    return (
        <div className="w-full h-full bg-white shadow-lg p-8 flex flex-col text-xs font-serif leading-relaxed aspect-[1/1.414]">
             <div className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{data.name}</h1>
                <div className="flex justify-center gap-3 text-slate-600">
                     {data.email && <span>{data.email}</span>}
                     {data.number && <span>| {data.number}</span>}
                     {data.address && <span>| {data.address}</span>}
                </div>
             </div>

             {data.education_summary && (
                 <div className="mb-6">
                    <h3 className="text-slate-900 font-bold border-b border-slate-300 mb-2 pb-1">PROFESSIONAL SUMMARY</h3>
                    <p className="text-slate-700">{data.education_summary}</p>
                 </div>
             )}

             <div className="mb-6">
                <h3 className="text-slate-900 font-bold border-b border-slate-300 mb-2 pb-1">EXPERIENCE</h3>
                <div className="mb-4">
                    <div className="flex justify-between font-bold text-slate-900">
                        <span>{data.company}</span>
                        <span>{data.time}</span>
                    </div>
                    <div className="italic text-slate-700 mb-1">{data.position}</div>
                    <p className="text-slate-700 whitespace-pre-wrap">{data.jobDescription}</p>
                </div>
             </div>

             <div className="mb-6">
                <h3 className="text-slate-900 font-bold border-b border-slate-300 mb-2 pb-1">EDUCATION</h3>
                <div className="flex justify-between">
                    <div>
                        <div className="font-bold text-slate-900">{data.university}</div>
                        <div className="text-slate-700">{data.degName}</div>
                    </div>
                    <div className="text-slate-700 font-medium">{data.educationYear}</div>
                </div>
             </div>

             <div>
                <h3 className="text-slate-900 font-bold border-b border-slate-300 mb-2 pb-1">SKILLS</h3>
                <p className="text-slate-700">{skillsArray.join(' • ')}</p>
             </div>
        </div>
    );
};
