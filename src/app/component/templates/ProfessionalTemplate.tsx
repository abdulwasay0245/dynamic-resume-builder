import React from 'react';
import { FormDataState } from '@/types/FormInput';

export const ProfessionalTemplate = ({ data }: { data: FormDataState }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(s => s);
    const firstEdu = data.education?.[0];

    return (
        <div className="w-full bg-white shadow-lg p-8 flex flex-col text-xs font-serif leading-relaxed min-h-[1100px]">

             <div className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
                {data.profilePhoto && (
                    <img src={data.profilePhoto} alt={data.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-slate-300" />
                )}
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{data.name}</h1>
                <div className="flex justify-center gap-3 text-slate-600">
                     {data.email && <span>{data.email}</span>}
                     {data.number && <span>| {data.number}</span>}
                     {data.address && <span>| {data.address}</span>}
                </div>
             </div>

             {firstEdu?.education_summary && (
                 <div className="mb-6">
                    <h3 className="text-slate-900 font-bold border-b border-slate-300 mb-2 pb-1">PROFESSIONAL SUMMARY</h3>
                    <p className="text-slate-700">{firstEdu.education_summary}</p>
                 </div>
             )}

             <div className="mb-6">
                <h3 className="text-slate-900 font-bold border-b border-slate-300 mb-2 pb-1">EXPERIENCE</h3>
                {data.experiences.map((exp, i) => (
                    <div key={i} className="mb-4">
                        <div className="flex justify-between font-bold text-slate-900">
                            <span>{exp.company}</span>
                            <span>{exp.time}</span>
                        </div>
                        <div className="italic text-slate-700 mb-1">{exp.position}</div>
                        <p className="text-slate-700 whitespace-pre-wrap">{exp.jobDescription}</p>
                    </div>
                ))}
             </div>

             <div className="mb-6">
                <h3 className="text-slate-900 font-bold border-b border-slate-300 mb-2 pb-1">EDUCATION</h3>
                {data.education.map((edu, i) => (
                    <div key={i} className="flex justify-between mb-3">
                        <div>
                            <div className="font-bold text-slate-900">{edu.university}</div>
                            <div className="text-slate-700">{edu.degName}</div>
                        </div>
                        <div className="text-slate-700 font-medium">{edu.educationYear}</div>
                    </div>
                ))}
             </div>

             {data.projects.length > 0 && (
                 <div className="mb-6">
                    <h3 className="text-slate-900 font-bold border-b border-slate-300 mb-2 pb-1">PROJECTS</h3>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-3">
                            <div className="font-bold text-slate-900">{proj.projectName}</div>
                            <p className="text-slate-700 whitespace-pre-wrap">{proj.projectDescription}</p>
                        </div>
                    ))}
                 </div>
             )}

             {data.certifications.length > 0 && (
                 <div className="mb-6">
                    <h3 className="text-slate-900 font-bold border-b border-slate-300 mb-2 pb-1">CERTIFICATIONS</h3>
                    {data.certifications.map((cert, i) => (
                        <div key={i} className="flex justify-between mb-2">
                            <div className="font-bold text-slate-900">{cert.certName} — <span className="font-normal text-slate-700">{cert.certIssuer}</span></div>
                            <div className="text-slate-700">{cert.certYear}</div>
                        </div>
                    ))}
                 </div>
             )}

             <div>
                <h3 className="text-slate-900 font-bold border-b border-slate-300 mb-2 pb-1">SKILLS</h3>
                <p className="text-slate-700">{skillsArray.join(' • ')}</p>
             </div>
        </div>
    );
};
