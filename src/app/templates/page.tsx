'use client';
import React, { useContext } from 'react';
import Header from '../component/Header';
import { ModernTemplate } from '../component/templates/ModernTemplate';
import { ProfessionalTemplate } from '../component/templates/ProfessionalTemplate';
import { CreativeTemplate } from '../component/templates/CreativeTemplate';
import { FormDataState } from '../component/ResumeWizard';
import UserContext from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

const dummyData: FormDataState = {
    name: "Alex Doe",
    position: "Software Engineer",
    email: "alex@example.com",
    number: "+1 234 567 890",
    address: "San Francisco, CA",
    degName: "B.S. Computer Science",
    university: "Stanford University",
    educationYear: "2020 - 2024",
    education_summary: "Passionate engineer with a focus on building scalable web applications.",
    company: "Tech Corp",
    time: "2024 - Present",
    jobDescription: "Developed key features for the main product suite.",
    skills: "React, Next.js, TypeScript, Tailwind",
};

import { MinimalTemplate } from '../component/templates/MinimalTemplate';
import { CompactTemplate } from '../component/templates/CompactTemplate';

const templates = [
    { id: 'modern', name: 'Modern', component: ModernTemplate },
    { id: 'professional', name: 'Professional', component: ProfessionalTemplate },
    { id: 'creative', name: 'Creative', component: CreativeTemplate },
    { id: 'minimal', name: 'Minimal Mono', component: MinimalTemplate },
    { id: 'compact', name: 'Compact', component: CompactTemplate },
];

const TemplatesPage = () => {
    const { selectedTemplate, setSelectedTemplate } = useContext(UserContext);
    const router = useRouter();

    const handleSelect = (id: string) => {
        setSelectedTemplate(id);
        router.push('/buildResume');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pt-20 pb-20">
            <Header />
            
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Template</h1>
                    <p className="text-slate-600">Select a design that best fits your style and profession.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template) => (
                        <div key={template.id} className="group relative flex flex-col gap-4">
                            <div 
                                onClick={() => handleSelect(template.id)}
                                className={`relative aspect-[1/1.414] rounded-xl overflow-hidden shadow-xl transition-all cursor-pointer border-4 ${selectedTemplate === template.id ? 'border-indigo-600 ring-4 ring-indigo-200' : 'border-transparent hover:scale-[1.02] hover:shadow-2xl'}`}
                            >
                                <div className="absolute inset-0 pointer-events-none scale-[0.4] origin-top-left w-[250%] h-[250%] bg-white">
                                    <template.component data={dummyData} />
                                </div>
                                
                                {/* Overlay for hover */}
                                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <button className="bg-white text-slate-900 font-bold py-2 px-6 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                                        Use Template
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center px-2">
                                <h3 className="font-bold text-slate-900 text-lg">{template.name}</h3>
                                {selectedTemplate === template.id && (
                                    <span className="flex items-center gap-1 text-indigo-600 font-medium text-sm">
                                        <CheckCircle size={16} /> Selected
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplatesPage;
