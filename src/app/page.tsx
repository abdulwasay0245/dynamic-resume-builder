'use client';

import React from 'react';
import Link from 'next/link';
import Header from './component/Header';
import { motion } from 'framer-motion';
import { FileText, Zap, Download, LayoutTemplate, Star, CheckCircle } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white opacity-70"></div>
                
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6 ring-1 ring-inset ring-indigo-200">
                            <Star size={14} fill="currentColor" />
                            Rated #1 AI Resume Builder
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
                            Build a professional resume <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">in minutes, not hours.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Create a standout resume with our easy-to-use builder. 
                            Professional templates, real-time preview, and ATS-friendly formats.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/buildResume">
                                <button className="h-12 px-8 bg-indigo-600 text-white text-base font-semibold rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2">
                                    <FileText size={20} />
                                    Build My Resume
                                </button>
                            </Link>
                            <button className="h-12 px-8 bg-white text-slate-700 text-base font-semibold rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
                                View Examples
                            </button>
                        </div>
                    </motion.div>

                    {/* Hero Image / Preview Mockup */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-20 relative w-full max-w-5xl"
                    >
                        <div className="relative rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-200 aspect-[16/9] flex items-center justify-center bg-slate-50">
                                {/* Placeholder for a screenshot - using text for now */}
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl mx-auto flex items-center justify-center mb-4">
                                        <LayoutTemplate className="text-indigo-600" size={32} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900">Live Resume Preview</h3>
                                    <p className="text-slate-500">Real-time editing experience</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                            Everything you need to get hired
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Our platform provides all the tools you need to create a resume that gets past Applicant Tracking Systems (ATS) and lands you the interview.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Create your resume in 3 simple steps
                            </h2>
                            <p className="text-slate-400 text-lg mb-12">
                                Stop struggling with Word documents and formatting. Our builder handles the design so you can focus on the content.
                            </p>
                            
                            <div className="space-y-8">
                                {[
                                    { title: "Enter your details", desc: "Fill in your personal info, education, and experience." },
                                    { title: "Choose a template", desc: "Select from our range of professional, ATS-friendly designs." },
                                    { title: "Download PDF", desc: "Get your polished resume instantly and start applying." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white mt-1">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                                            <p className="text-slate-400">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl blur-3xl opacity-20"></div>
                            <div className="relative bg-slate-800 rounded-2xl p-8 border border-slate-700 aspect-square flex items-center justify-center">
                                {/* Abstract Visual */}
                                <div className="grid grid-cols-2 gap-4 w-full h-full opacity-50">
                                    <div className="bg-slate-700 rounded-lg h-full w-full animate-pulse"></div>
                                    <div className="space-y-4">
                                        <div className="bg-slate-700 rounded-lg h-1/3 w-full"></div>
                                        <div className="bg-slate-700 rounded-lg h-2/3 w-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
                        <span className="text-xl font-bold text-slate-900">ResumeCraft</span>
                    </div>
                    <div className="flex gap-8 text-sm text-slate-500 font-medium">
                        <Link href="#" className="hover:text-indigo-600 transition-colors">Templates</Link>
                        <Link href="#" className="hover:text-indigo-600 transition-colors">Pricing</Link>
                        <Link href="#" className="hover:text-indigo-600 transition-colors">About Us</Link>
                    </div>
                    <p className="text-sm text-slate-400">
                        © 2024 ResumeCraft. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

const features = [
    {
        title: 'Easy-to-use Builder',
        description: 'Our intuitive wizard guides you through the process step-by-step. No design skills needed.',
        icon: <Zap size={24} />
    },
    {
        title: 'Real-time Preview',
        description: 'See changes instantly as you type. No more guessing how your resume will look.',
        icon: <LayoutTemplate size={24} />
    },
    {
        title: 'ATS-Friendly',
        description: 'Templates designed to be easily parsed by Applicant Tracking Systems used by recruiters.',
        icon: <CheckCircle size={24} />
    },
    {
        title: 'Instant Download',
        description: 'Download your resume in high-quality PDF format, ready to send to employers.',
        icon: <Download size={24} />
    },
    {
        title: 'Secure & Private',
        description: 'Your data is saved locally in your browser session. We prioritize your privacy.',
        icon: <CheckCircle size={24} />
    },
    {
        title: 'Expert Tips',
        description: 'Built-in guidance to help you write compelling descriptions and skills.',
        icon: <Star size={24} />
    },
];
