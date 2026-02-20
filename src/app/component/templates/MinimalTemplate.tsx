import React from 'react';
import { FormDataState } from '../ResumeWizard';

export const MinimalTemplate = ({ data }: { data: FormDataState }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(s => s);
    return (
        <div className="w-full h-full bg-white shadow-lg p-10 flex flex-col text-sm font-mono leading-relaxed aspect-[1/1.414]">
             <div className="mb-8">
                <h1 className="text-2xl font-bold text-black mb-1 uppercase bg-black text-white px-2 inline-block">{data.name}</h1>
                <p className="text-slate-600">{data.position}</p>
                <div className="text-xs text-slate-500 mt-2 flex gap-4">
                     {data.email && <span>{data.email}</span>}
                     {data.number && <span>{data.number}</span>}
                     {data.address && <span>{data.address}</span>}
                </div>
             </div>

             <div className="grid grid-cols-[100px_1fr] gap-6 mb-8">
                <div className="text-slate-400 text-xs font-bold uppercase pt-1">Profile</div>
                <div className="text-slate-800 text-xs">{data.education_summary}</div>
             </div>

             <div className="grid grid-cols-[100px_1fr] gap-6 mb-8">
                <div className="text-slate-400 text-xs font-bold uppercase pt-1">Experience</div>
                <div>
                    <div className="mb-4">
                        <h3 className="font-bold text-black border-b border-black pb-1 mb-1">{data.company}</h3>
                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                            <span>{data.position}</span>
                            <span>{data.time}</span>
                        </div>
                        <p className="text-xs text-slate-700 whitespace-pre-wrap">{data.jobDescription}</p>
                    </div>
                </div>
             </div>

             <div className="grid grid-cols-[100px_1fr] gap-6 mb-8">
                <div className="text-slate-400 text-xs font-bold uppercase pt-1">Education</div>
                <div>
                     <div className="font-bold text-black">{data.university}</div>
                     <div className="text-xs text-slate-600">{data.degName}</div>
                     <div className="text-xs text-slate-400">{data.educationYear}</div>
                </div>
             </div>

             <div className="grid grid-cols-[100px_1fr] gap-6">
                <div className="text-slate-400 text-xs font-bold uppercase pt-1">Skills</div>
                <div className="text-xs text-slate-800 flex flex-wrap gap-x-4 gap-y-2">
                    {skillsArray.map((skill, i) => (
                        <span key={i}>[{skill}]</span>
                    ))}
                </div>
             </div>
        </div>
    );
};
