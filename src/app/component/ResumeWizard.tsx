'use client';

import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import UserContext from '../context/UserContext';
import { ChevronRight, ChevronLeft, Send, Save, Loader2 } from 'lucide-react';
import PersonalDetails from './steps/PersonalDetails';
import EducationDetails from './steps/EducationDetails';
import ExperienceDetails from './steps/ExperienceDetails';
import SkillsDetails from './steps/SkillsDetails';
import Loader from './Loader';
// Redundant imports removed


// Define the shape of our form data
export interface FormDataState {
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

interface ResumeWizardProps {
    formData: FormDataState;
    setFormData: React.Dispatch<React.SetStateAction<FormDataState>>;
}

const ResumeWizard: React.FC<ResumeWizardProps> = ({ formData, setFormData }) => {
    const router = useRouter();
    const { setForms } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const updateFormData = (fields: Partial<FormDataState>) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    const steps = [
        { title: "Personal Info", component: <PersonalDetails data={formData} updateData={updateFormData} /> },
        { title: "Education", component: <EducationDetails data={formData} updateData={updateFormData} /> },
        { title: "Experience", component: <ExperienceDetails data={formData} updateData={updateFormData} /> },
        { title: "Skills", component: <SkillsDetails data={formData} updateData={updateFormData} /> },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const [isSaving, setIsSaving] = useState(false);

    const saveResume = async () => {
        setIsSaving(true);
        try {
            const response = await fetch('/api/resumes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name || 'Untitled Resume',
                    templateId: 'modern', // Default for now
                    content: formData
                })
            });
            const result = await response.json();
            if (result.id) {
                // Success - maybe show a toast
                console.log("Resume saved successfully!");
            }
        } catch (error) {
            console.error("Failed to save resume", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        
        // 1. Save to our database first
        await saveResume();

        const singleSkills = formData.skills.split(',').map(skill => skill.trim());
        
        const payload = {
            name: formData.name,
            email: formData.email,
            number: formData.number,
            address: formData.address,
            degName: formData.degName,
            university: formData.university,
            educationYear: formData.educationYear,
            education_summary: formData.education_summary,
            position: formData.position,
            company: formData.company,
            time: formData.time,
            jobDescription: formData.jobDescription,
            singleSkills,
        };

        try {
            // Keep the triage call for AI-enhanced summary generation
            const response = await fetch("http://127.0.0.1:8000/triage", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            
            const mergeData = {
                ...payload,
                job_summary: result.job_summary || [],
                ...result,
            };
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setForms(mergeData as any);

            sessionStorage.setItem('resumeData', JSON.stringify(mergeData));
            router.push(`/${encodeURIComponent(formData.name)}`);

        } catch (error) {
            console.error("triage error", error);
            // Fallback: Continue without triage if backend is down
            const fallbackData = { ...payload, job_summary: [] };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setForms(fallbackData as any);
            sessionStorage.setItem('resumeData', JSON.stringify(fallbackData));
            router.push(`/${encodeURIComponent(formData.name)}`);

        } finally {
            setIsLoading(false);
        }
    };


    if (isLoading) return <Loader />;

    return (
        <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[600px]">
            {/* Header / Stepper Progress */}
            <div className="bg-slate-50 p-6 border-b border-slate-100">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">{steps[currentStep].title}</h1>
                        <span className="text-sm font-medium text-slate-500">Step {currentStep + 1} of {steps.length}</span>
                    </div>

                    <button
                        onClick={saveResume}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 border border-indigo-100 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-all shadow-sm disabled:opacity-50"
                    >
                        {isSaving ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Save size={16} />
                        )}
                        {isSaving ? "Saving..." : "Save Draft"}
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-6">
                    <motion.div 
                        className="h-full bg-indigo-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                    >
                        {steps[currentStep].component}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer / Navigation */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors ${
                        currentStep === 0 
                            ? 'text-slate-300 cursor-not-allowed' 
                            : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                >
                    <ChevronLeft size={20} />
                    Back
                </button>

                {currentStep === steps.length - 1 ? (
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
                    >
                        Generate Resume
                        <Send size={18} />
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all"
                    >
                        Next
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ResumeWizard;
