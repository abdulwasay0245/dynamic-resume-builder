import React from 'react';
import { FormDataState } from '../ResumeWizard';

export const CreativeTemplate = ({ data }: { data: FormDataState }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(s => s);
    return (
        <div className="w-full bg-slate-50 shadow-lg flex flex-col text-xs font-sans min-h-[1100px]">

             <div className="bg-rose-500 text-white p-8">
                <h1 className="text-4xl font-black mb-2 tracking-tighter">{data.name}</h1>
                <p className="text-rose-100 font-medium tracking-widest uppercase">{data.position}</p>
             </div>

             <div className="flex flex-1">
                <div className="w-[60%] p-8 flex flex-col gap-6 border-r border-slate-200">
                    <div>
                        <h3 className="text-rose-500 font-bold text-sm mb-3 flex items-center gap-2">
                            <span className="w-8 h-1 bg-rose-500 block"></span> PROFILE
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-justify">{data.education_summary}</p>
                    </div>

                    <div>
                        <h3 className="text-rose-500 font-bold text-sm mb-3 flex items-center gap-2">
                             <span className="w-8 h-1 bg-rose-500 block"></span> EXPERIENCE
                        </h3>
                        <div>
                             <h4 className="font-bold text-slate-800 text-sm">{data.position}</h4>
                             <p className="text-slate-400 text-xs mb-2">{data.company} | {data.time}</p>
                             <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{data.jobDescription}</p>
                        </div>
                    </div>
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
                        <div className="flex flex-col gap-1 text-slate-600">
                             <p className="font-bold text-slate-800">{data.degName}</p>
                             <p>{data.university}</p>
                             <p className="text-sm text-slate-400">{data.educationYear}</p>
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
                </div>
             </div>
        </div>
    );
};
