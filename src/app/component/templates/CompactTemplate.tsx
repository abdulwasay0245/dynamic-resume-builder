import React from 'react';
import { FormDataState } from '../ResumeWizard';

export const CompactTemplate = ({ data }: { data: FormDataState }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(s => s);
    return (
        <div className="w-full h-full bg-white shadow-lg p-6 flex flex-col text-xs font-sans aspect-[1/1.414]">
             <header className="border-b-4 border-slate-800 pb-4 mb-4 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 leading-none">{data.name?.split(' ')[0]}</h1>
                    <h1 className="text-4xl font-light text-slate-600 leading-none">{data.name?.split(' ').slice(1).join(' ')}</h1>
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
                        <div className="bg-slate-50 p-3 rounded border border-slate-100">
                            <div className="flex justify-between font-bold text-slate-800 mb-1">
                                <span>{data.company}</span>
                                <span className="text-slate-500 text-[10px] font-medium bg-slate-200 px-2 py-0.5 rounded-full flex items-center">{data.time}</span>
                            </div>
                            <div className="text-slate-600 font-medium mb-2">{data.position}</div>
                            <p className="text-slate-600 leading-snug whitespace-pre-wrap">{data.jobDescription}</p>
                        </div>
                    </section>
                    
                    <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase mb-2 tracking-wider">Profile</h3>
                        <div className="text-slate-600 leading-snug text-justify">
                            {data.education_summary}
                        </div>
                    </section>
                </div>

                <div className="w-1/3 flex flex-col gap-4">
                     <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase mb-2 tracking-wider">Education</h3>
                        <div className="mb-2">
                             <div className="font-bold text-slate-800">{data.university}</div>
                             <div className="text-slate-600">{data.degName}</div>
                             <div className="text-slate-400">{data.educationYear}</div>
                        </div>
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
                </div>
             </div>
        </div>
    );
};
