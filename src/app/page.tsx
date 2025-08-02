import React from 'react';
import Header from './component/Header';
import Link from 'next/link';


const ResumeBuilder = () => {
  return (
    <div className={`relative flex min-h-screen flex-col bg-white overflow-x-hidden font-['Public_Sans','Noto_Sans',sans-serif]`}>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center gap-6 bg-cover bg-center p-4 min-h-[480px] text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCh1tl2bR2tupZzt2YdwqM1PUyPc7GsCD8PGLktKCRvsm_EtcbztzdAHVqW86pm6GEgMXIiSxcY9soAHutxfKmmgek3-Be0LuDMF--gTAuK2JkK3TRBJZeIkrPwQ_-iIGpw504fxlh32ROzZzTWT9VV-qgwuOW5yM5pNjunxYXpM-jpiLziawQdDFJwKN9rJwE1NnQoCVMAr7tXGmtrSlOZ5USKhnovOKS4tgr9kfV0Lq0XTvVd5cBoJGqyOd0EgMuh_jrAv6IntM7y')",
        }}
      >
        <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
          Build your professional resume in minutes
        </h1>
        <p className="text-white text-sm md:text-base font-normal max-w-xl">
          Create a standout resume with our easy-to-use builder and modern templates. Export as PDF and get AI-powered help.
        </p>
        <Link href={`/buildResume`}><button className="h-10 md:h-12 px-4 md:px-5 bg-[#3680f6] text-white text-sm md:text-base font-bold rounded-lg">
          Build Resume
        </button>
        </Link>
      </section>

      {/* Key Features */}
      <section className="px-4 md:px-10 py-10 flex flex-col items-center gap-10">
        <div className="text-center max-w-[720px]">
          <h2 className="text-[32px] md:text-4xl font-bold leading-tight text-[#111418]">Key Features</h2>
          <p className="text-base text-[#111418]">
            Our resume builder offers a range of features to help you create a professional and effective resume.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4 w-full max-w-[960px]">
          {features.map(({ icon, title, description }, i) => (
            <div key={i} className="flex flex-col gap-3 border border-[#dbdfe6] rounded-lg p-4">
              <div className="text-[#111418]">{icon}</div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-[#111418]">{title}</h3>
                <p className="text-sm text-[#60708a]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center px-4 py-10 md:px-10 md:py-20">
        <div className="flex flex-col gap-4 items-center max-w-[720px] mx-auto">
          <h2 className="text-[32px] md:text-4xl font-bold leading-tight text-[#111418]">
            Ready to create your perfect resume?
          </h2>
          <p className="text-base text-[#111418]">
            Start building your resume today and take the next step in your career.
          </p>
          <button className="h-10 md:h-12 px-4 md:px-5 bg-[#3680f6] text-white text-sm md:text-base font-bold rounded-lg">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex justify-center px-5 py-10 text-center">
        <div className="flex flex-col gap-6 max-w-[960px] w-full">
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-[#60708a] text-base">Privacy Policy</a>
            <a href="#" className="text-[#60708a] text-base">Contact</a>
            <a href="#" className="text-[#60708a] text-base">GitHub</a>
          </div>
          <p className="text-[#60708a] text-base">© 2024 CraftMyCV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ResumeBuilder;

// Feature Card Icons
const features = [
  {
    title: 'Easy-to-use',
    description: 'Intuitive interface for quick resume creation.',
    icon: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M169.64,134.33l44.77-19.46A16..." />
      </svg>
    ),
  },
  {
    title: 'Modern Templates',
    description: 'Choose from a variety of professionally designed templates.',
    icon: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M216,40H40A16,16..." />
      </svg>
    ),
  },
  {
    title: 'Export as PDF',
    description: 'Download your resume in PDF format for easy sharing.',
    icon: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M224,152a8,8..." />
      </svg>
    ),
  },
  {
    title: 'AI Help',
    description: 'Get suggestions and improve your resume with AI assistance.',
    icon: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M48,64a8,8..." />
      </svg>
    ),
  },
];
