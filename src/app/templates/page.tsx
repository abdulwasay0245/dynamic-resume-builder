'use client';

import React, { useState } from 'react';
import Header from '../component/Header';
import { motion } from 'framer-motion';
import { ModernTemplate } from '../component/templates/ModernTemplate';
import { ProfessionalTemplate } from '../component/templates/ProfessionalTemplate';
import { CreativeTemplate } from '../component/templates/CreativeTemplate';
import { MinimalTemplate } from '../component/templates/MinimalTemplate';
import { CompactTemplate } from '../component/templates/CompactTemplate';
import { FormDataState } from '@/types/FormInput';

const dummyData: FormDataState = {
    name: "Jordan Mitchell",
    email: "jordan@example.com",
    number: "+1 555 123 4567",
    address: "San Francisco, CA",
    profilePhoto: "",
    education: [
        {
            id: "edu-1",
            degName: "B.S. Computer Science",
            university: "Stanford University",
            educationYear: "2020",
            education_summary: "Graduated with honors. Focused on distributed systems and machine learning. Published 2 research papers on large-scale data processing."
        },
        {
            id: "edu-2",
            degName: "M.S. Data Science",
            university: "MIT",
            educationYear: "2022",
            education_summary: "Thesis on real-time anomaly detection in streaming data pipelines."
        }
    ],
    experiences: [
        {
            id: "exp-1",
            position: "Senior Software Engineer",
            company: "TechCorp",
            time: "2022 - Present",
            jobDescription: "Led a team of 6 engineers building a real-time analytics platform processing 10M+ events/day. Reduced latency by 40% through system redesign."
        },
        {
            id: "exp-2",
            position: "Software Engineer",
            company: "DataFlow Inc.",
            time: "2020 - 2022",
            jobDescription: "Built microservices for data ingestion pipeline using Go and Kafka. Implemented CI/CD with 95% test coverage."
        }
    ],
    projects: [
        {
            id: "proj-1",
            projectName: "Open Source CLI Tool",
            projectUrl: "https://github.com/jordan/cli-tool",
            projectDescription: "Built a CLI tool for automated code reviews with 2,000+ GitHub stars."
        }
    ],
    certifications: [
        {
            id: "cert-1",
            certName: "AWS Solutions Architect",
            certIssuer: "Amazon Web Services",
            certYear: "2023"
        }
    ],
    skills: "React, TypeScript, Node.js, Go, Python, Kafka, PostgreSQL, Docker, AWS, Terraform"
};

const templates = [
    { name: "Modern", component: ModernTemplate },
    { name: "Professional", component: ProfessionalTemplate },
    { name: "Creative", component: CreativeTemplate },
    { name: "Minimal", component: MinimalTemplate },
    { name: "Compact", component: CompactTemplate },
];

export default function TemplatesPage() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const SelectedTemplate = templates[selectedIndex].component;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <Header />

            <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold mb-2">Choose Your Template</h1>
                    <p className="text-slate-500">Preview all templates with sample data. Pick the one that fits your style.</p>
                </motion.div>

                {/* Template Selector */}
                <div className="flex justify-center gap-3 mb-8 flex-wrap">
                    {templates.map((t, i) => (
                        <button
                            key={t.name}
                            onClick={() => setSelectedIndex(i)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                i === selectedIndex
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            {t.name}
                        </button>
                    ))}
                </div>

                {/* Preview */}
                <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-[210mm] mx-auto bg-white shadow-2xl rounded-sm overflow-hidden"
                >
                    <SelectedTemplate data={dummyData} />
                </motion.div>
            </main>
        </div>
    );
}
