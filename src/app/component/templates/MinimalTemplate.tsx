import React from 'react';
import { FormDataState } from '@/types/FormInput';

export const MinimalTemplate = ({ data }: { data: FormDataState }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(s => s);
    const firstEdu = data.education?.[0];

    return (
        <div className="w-full bg-white shadow-lg p-10 flex flex-col text-sm font-mono leading-relaxed min-h-[1100px]">

             <div className="mb-8 flex items-center gap-4">
                {data.profilePhoto && (
                    <img src={data.profilePhoto} alt={data.name} className="w-14 h-14 rounded-full object-cover grayscale" />
                )}
                <div>
                    <h1 className="text-2xl font-bold text-black mb-1 uppercase bg-black text-white px-2 inline-block">{data.name}</h1>
                    <p className="text-slate-600">{data.experiences?.[0]?.position}</p>
                    <div className="text-xs text-slate-500 mt-2 flex gap-4">
                         {data.email && <span>{data.email}</span>}
                         {data.number && <span>{data.number}</span>}
                         {data.address && <span>{data.address}</span>}
                    </div>
                </div>
             </div>

             {firstEdu?.education_summary && (
                 <div className="grid grid-cols-[100px_1fr] gap-6 mb-8">
                    <div className="text-slate-400 text-xs font-bold uppercase pt-1">Profile</div>
                    <div className="text-slate-800 text-xs">{firstEdu.education_summary}</div>
                 </div>
             )}

             <div className="grid grid-cols-[100px_1fr] gap-6 mb-8">
                <div className="text-slate-400 text-xs font-bold uppercase pt-1">Experience</div>
                <div className="flex flex-col gap-4">
                    {data.experiences.map((exp, i) => (
                        <div key={i} className="mb-4">
                            <h3 className="font-bold text-black border-b border-black pb-1 mb-1">{exp.company}</h3>
                            <div className="flex justify-between text-xs text-slate-500 mb-2">
                                <span>{exp.position}</span>
                                <span>{exp.time}</span>
                            </div>
                            <p className="text-xs text-slate-700 whitespace-pre-wrap">{exp.jobDescription}</p>
                        </div>
                    ))}
                </div>
             </div>

             <div className="grid grid-cols-[100px_1fr] gap-6 mb-8">
                <div className="text-slate-400 text-xs font-bold uppercase pt-1">Education</div>
                <div className="flex flex-col gap-3">
                    {data.education.map((edu, i) => (
                        <div key={i}>
                             <div className="font-bold text-black">{edu.university}</div>
                             <div className="text-xs text-slate-600">{edu.degName}</div>
                             <div className="text-xs text-slate-400">{edu.educationYear}</div>
                        </div>
                    ))}
                </div>
             </div>

             {data.projects.length > 0 && (
                 <div className="grid grid-cols-[100px_1fr] gap-6 mb-8">
                    <div className="text-slate-400 text-xs font-bold uppercase pt-1">Projects</div>
                    <div className="flex flex-col gap-3">
                        {data.projects.map((proj, i) => (
                            <div key={i}>
                                <div className="font-bold text-black">{proj.projectName}</div>
                                <div className="text-xs text-slate-700 whitespace-pre-wrap">{proj.projectDescription}</div>
                            </div>
                        ))}
                    </div>
                 </div>
             )}

             {data.certifications.length > 0 && (
                 <div className="grid grid-cols-[100px_1fr] gap-6 mb-8">
                    <div className="text-slate-400 text-xs font-bold uppercase pt-1">Certs</div>
                    <div className="flex flex-col gap-2">
                        {data.certifications.map((cert, i) => (
                            <div key={i} className="text-xs">[{cert.certName}] — {cert.certIssuer} ({cert.certYear})</div>
                        ))}
                    </div>
                 </div>
             )}

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
