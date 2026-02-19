import React from 'react';

interface FormDataState {
    name: string;
    email: string;
    number: string;
    address: string;
    degName: string;
    university: string;
    educationYear: string;
    education_summary: string;
    position: string;
    company: string;
    time: string;
    jobDescription: string;
    skills: string; 
}

interface LiveResumePreviewProps {
    data: FormDataState;
}

const LiveResumePreview: React.FC<LiveResumePreviewProps> = ({ data }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(s => s);

    return (
        <div className="w-full h-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row text-[10px] md:text-xs leading-relaxed font-sans" style={{ aspectRatio: '1/1.414' }}>
            {/* Left Column */}
            <div className="w-[35%] bg-[#eaf3f8] text-[#3a3f44] p-4 flex flex-col gap-4">
                {/* Contact */}
                <div>
                    <h3 className="text-[#0f4c81] font-bold text-sm mb-2 border-b border-[#0f4c81]/20 pb-1">CONTACT</h3>
                    <div className="flex flex-col gap-1">
                        {data.number && <p><span className="font-semibold">Phone:</span> {data.number}</p>}
                        {data.email && <p><span className="font-semibold">Email:</span> {data.email}</p>}
                        {data.address && <p><span className="font-semibold">Address:</span> {data.address}</p>}
                    </div>
                </div>

                {/* Education */}
                <div>
                    <h3 className="text-[#0f4c81] font-bold text-sm mb-2 border-b border-[#0f4c81]/20 pb-1">EDUCATION</h3>
                    <div className="flex flex-col gap-1">
                        {data.degName && <p className="font-semibold text-slate-900">{data.degName}</p>}
                        {data.university && <p>{data.university}</p>}
                        {data.educationYear && <p className="text-slate-500">{data.educationYear}</p>}
                    </div>
                </div>

                {/* Skills */}
                <div>
                    <h3 className="text-[#0f4c81] font-bold text-sm mb-2 border-b border-[#0f4c81]/20 pb-1">SKILLS</h3>
                    <ul className="flex flex-col gap-1 pl-3 list-disc">
                        {skillsArray.length > 0 ? (
                            skillsArray.map((skill, index) => (
                                <li key={index} className="capitalize">{skill}</li>
                            ))
                        ) : (
                            <li className="text-slate-400 italic">Your skills will appear here</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-[65%] p-4 flex flex-col gap-4">
                {/* Header */}
                <div className="border-b-2 border-[#0f4c81] pb-2">
                    <h1 className="text-2xl font-bold text-[#0f4c81] uppercase tracking-wide">{data.name || "Your Name"}</h1>
                    <p className="text-[#3a3f44] text-xs mt-1">Professional Resume</p>
                </div>

                {/* Profile / Summary */}
                {data.education_summary && (
                    <div>
                        <h3 className="text-[#0f4c81] font-bold text-sm mb-2">PROFESSIONAL SUMMARY</h3>
                        <p className="text-[#333] whitespace-pre-wrap">{data.education_summary}</p>
                    </div>
                )}

                {/* Experience */}
                <div>
                     <h3 className="text-[#0f4c81] font-bold text-sm mb-2">WORK EXPERIENCE</h3>
                     <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-baseline">
                            <h4 className="font-bold text-[#333] text-sm">{data.position || "Job Title"}</h4>
                             <span className="text-[#666] italic">{data.time || "Date Period"}</span>
                        </div>
                         <p className="font-semibold text-[#0f4c81]">{data.company || "Company Name"}</p>
                         <div className="text-[#333] whitespace-pre-wrap mt-1 pl-2 border-l-2 border-slate-200">
                             {data.jobDescription || "Job description responsibilities and achievements..."}
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default LiveResumePreview;
