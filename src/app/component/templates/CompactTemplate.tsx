import React from 'react';
import { FormDataState } from '@/types/FormInput';

export const CompactTemplate = ({ data }: { data: FormDataState }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(s => s);

    return (
        <div className="w-full bg-white shadow-lg p-6 flex flex-col text-xs font-sans min-h-[1100px]">

             <header className="border-b-4 border-slate-800 pb-4 mb-4 flex justify-between items-end">
                <div className="flex items-center gap-3">
                    {data.profilePhoto && (
                        <img src={data.profilePhoto} alt={data.name} className="w-14 h-14 rounded-lg object-cover" />
                    )}
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 leading-none">{data.name?.split(' ')[0]}</h1>
                        <h1 className="text-4xl font-light text-slate-600 leading-none">{data.name?.split(' ').slice(1).join(' ')}</h1>
                    </div>
                </div>
                <div className="text-right text-[10px] items-end flex flex-col gap-0.5 text-slate-500">
                    <p>{data.email}</p>
                    <p>{data.number}</p>
                    <p>{data.address}</p>
                </div>
             </header>

             <div className="flex gap-4 h-full">
                <div className="w-2/3 flex flex-col gap-4">
                    <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase mb-2 tracking-wider">Experience</h3>
                        <div className="flex flex-col gap-3">
                            {data.experiences.map((exp, i) => (
                                <div key={i} className="bg-slate-50 p-3 rounded border border-slate-100">
                                    <div className="flex justify-between font-bold text-slate-800 mb-1">
                                        <span>{exp.company}</span>
                                        <span className="text-slate-500 text-[10px] font-medium bg-slate-200 px-2 py-0.5 rounded-full flex items-center">{exp.time}</span>
                                    </div>
                                    <div className="text-slate-600 font-medium mb-2">{exp.position}</div>
                                    <p className="text-slate-600 leading-snug whitespace-pre-wrap">{exp.jobDescription}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    {data.education?.[0]?.education_summary && (
                        <section>
                            <h3 className="text-sm font-bold text-slate-900 uppercase mb-2 tracking-wider">Profile</h3>
                            <div className="text-slate-600 leading-snug text-justify">
                                {data.education[0].education_summary}
                            </div>
                        </section>
                    )}

                    {data.projects.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold text-slate-900 uppercase mb-2 tracking-wider">Projects</h3>
                            <div className="flex flex-col gap-2">
                                {data.projects.map((proj, i) => (
                                    <div key={i} className="bg-slate-50 p-3 rounded border border-slate-100">
                                        <div className="font-bold text-slate-800 mb-1">{proj.projectName}</div>
                                        <p className="text-slate-600 leading-snug whitespace-pre-wrap">{proj.projectDescription}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="w-1/3 flex flex-col gap-4">
                     <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase mb-2 tracking-wider">Education</h3>
                        {data.education.map((edu, i) => (
                            <div key={i} className="mb-2">
                                 <div className="font-bold text-slate-800">{edu.university}</div>
                                 <div className="text-slate-600">{edu.degName}</div>
                                 <div className="text-slate-400">{edu.educationYear}</div>
                            </div>
                        ))}
                     </section>

                     <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase mb-2 tracking-wider">Skills</h3>
                        <div className="flex flex-col gap-1">
                             {skillsArray.map((skill, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="font-medium text-slate-700">{skill}</span>
                                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                                        <div className="bg-slate-800 h-full w-[85%]"></div>
                                    </div>
                                </div>
                             ))}
                        </div>
                     </section>

                     {data.certifications.length > 0 && (
                         <section>
                            <h3 className="text-sm font-bold text-slate-900 uppercase mb-2 tracking-wider">Certifications</h3>
                            {data.certifications.map((cert, i) => (
                                <div key={i} className="mb-2">
                                    <div className="font-bold text-slate-800">{cert.certName}</div>
                                    <div className="text-slate-500">{cert.certIssuer} • {cert.certYear}</div>
                                </div>
                            ))}
                         </section>
                     )}
                </div>
             </div>
        </div>
    );
};
