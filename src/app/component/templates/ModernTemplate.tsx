import React from 'react';
import { FormDataState } from '../ResumeWizard';

export const ModernTemplate = ({ data }: { data: FormDataState }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(s => s);
    return (
        <div className="w-full h-full bg-white shadow-lg flex flex-col md:flex-row text-[10px] md:text-xs leading-relaxed font-sans aspect-[1/1.414]">
             <div className="w-[35%] bg-slate-800 text-slate-100 p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                     <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-xl font-bold">
                        {data.name ? data.name[0].toUpperCase() : "U"}
                     </div>
                </div>

                 <div>
                    <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-3">Contact</h3>
                    <div className="flex flex-col gap-2 text-slate-300">
                        {data.number && <p>{data.number}</p>}
                        {data.email && <p className="break-all">{data.email}</p>}
                        {data.address && <p>{data.address}</p>}
                    </div>
                 </div>

                 <div>
                    <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-3">Education</h3>
                    <div className="flex flex-col gap-1">
                        <p className="font-bold text-white">{data.degName}</p>
                        <p>{data.university}</p>
                        <p className="text-slate-400">{data.educationYear}</p>
                    </div>
                 </div>

                 <div>
                    <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {skillsArray.map((skill, i) => (
                            <span key={i} className="bg-slate-700 px-2 py-1 rounded text-[10px]">{skill}</span>
                        ))}
                    </div>
                 </div>
             </div>

             <div className="w-[65%] p-8 flex flex-col gap-6">
                <div className="border-b pb-6 border-slate-100">
                    <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-tight mb-2">{data.name}</h1>
                    <p className="text-indigo-600 font-medium tracking-wide uppercase text-xs">{data.position}</p>
                </div>

                {data.education_summary && (
                     <div>
                        <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-2">Profile</h3>
                        <p className="text-slate-600 leading-relaxed text-justify">{data.education_summary}</p>
                     </div>
                )}

                 <div>
                    <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4">Experience</h3>
                     <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-slate-800 text-sm">{data.position}</h4>
                                 <span className="text-slate-400 text-[10px]">{data.time}</span>
                            </div>
                             <p className="font-medium text-indigo-600 text-xs mb-2">{data.company}</p>
                             <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{data.jobDescription}</p>
                        </div>
                     </div>
                 </div>
             </div>
        </div>
    );
};
