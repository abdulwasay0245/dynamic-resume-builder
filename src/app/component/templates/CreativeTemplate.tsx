import React from 'react';
import { FormDataState } from '@/types/FormInput';

export const CreativeTemplate = ({ data }: { data: FormDataState }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(s => s);
    const firstEdu = data.education?.[0];
    const firstExp = data.experiences?.[0];

    return (
        <div className="w-full bg-slate-50 shadow-lg flex flex-col text-xs font-sans min-h-[1100px]">

             <div className="bg-rose-500 text-white p-8 flex items-center gap-6">
                {data.profilePhoto && (
                    <img src={data.profilePhoto} alt={data.name} className="w-20 h-20 rounded-full object-cover border-4 border-white/30" />
                )}
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tighter">{data.name}</h1>
                    <p className="text-rose-100 font-medium tracking-widest uppercase">{firstExp?.position}</p>
                </div>
             </div>

             <div className="flex flex-1">
                <div className="w-[60%] p-8 flex flex-col gap-6 border-r border-slate-200">
                    {firstEdu?.education_summary && (
                        <div>
                            <h3 className="text-rose-500 font-bold text-sm mb-3 flex items-center gap-2">
                                <span className="w-8 h-1 bg-rose-500 block"></span> PROFILE
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-justify">{firstEdu.education_summary}</p>
                        </div>
                    )}

                    <div>
                        <h3 className="text-rose-500 font-bold text-sm mb-3 flex items-center gap-2">
                             <span className="w-8 h-1 bg-rose-500 block"></span> EXPERIENCE
                        </h3>
                        <div className="flex flex-col gap-4">
                            {data.experiences.map((exp, i) => (
                                <div key={i}>
                                     <h4 className="font-bold text-slate-800 text-sm">{exp.position}</h4>
                                     <p className="text-slate-400 text-xs mb-2">{exp.company} | {exp.time}</p>
                                     <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.jobDescription}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {data.projects.length > 0 && (
                        <div>
                            <h3 className="text-rose-500 font-bold text-sm mb-3 flex items-center gap-2">
                                <span className="w-8 h-1 bg-rose-500 block"></span> PROJECTS
                            </h3>
                            <div className="flex flex-col gap-3">
                                {data.projects.map((proj, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-slate-800 text-sm">{proj.projectName}</h4>
                                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{proj.projectDescription}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-[40%] p-8 bg-white flex flex-col gap-6">
                    <div>
                        <h3 className="text-slate-900 font-bold text-sm mb-4">CONTACT</h3>
                        <div className="flex flex-col gap-2 text-slate-600">
                             <p><strong>E:</strong> {data.email}</p>
                             <p><strong>P:</strong> {data.number}</p>
                             <p><strong>A:</strong> {data.address}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-slate-900 font-bold text-sm mb-4">EDUCATION</h3>
                        <div className="flex flex-col gap-3">
                            {data.education.map((edu, i) => (
                                <div key={i} className="flex flex-col gap-1 text-slate-600">
                                     <p className="font-bold text-slate-800">{edu.degName}</p>
                                     <p>{edu.university}</p>
                                     <p className="text-sm text-slate-400">{edu.educationYear}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-slate-900 font-bold text-sm mb-4">SKILLS</h3>
                        <div className="flex flex-wrap gap-2">
                            {skillsArray.map((skill, i) => (
                                <span key={i} className="border border-slate-200 px-2 py-1 rounded text-slate-600 font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {data.certifications.length > 0 && (
                        <div>
                            <h3 className="text-slate-900 font-bold text-sm mb-4">CERTIFICATIONS</h3>
                            <div className="flex flex-col gap-2 text-slate-600">
                                {data.certifications.map((cert, i) => (
                                    <div key={i}>
                                        <p className="font-bold text-slate-800">{cert.certName}</p>
                                        <p className="text-xs text-slate-400">{cert.certIssuer} • {cert.certYear}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
             </div>
        </div>
    );
};
