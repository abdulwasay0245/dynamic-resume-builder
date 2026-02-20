import Link from 'next/link';
import React from 'react';
import { FileText } from 'lucide-react';
import AuthButton from './AuthButton';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:bg-indigo-700 transition-colors">
            <FileText size={18} />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">ResumeCraft</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/templates" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Templates</Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Examples</Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Pricing</Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
           <AuthButton />
           <Link href="/buildResume">
            <button className="h-9 px-5 bg-indigo-600 text-white text-sm font-medium rounded-full shadow-sm hover:bg-indigo-700 hover:shadow-indigo-200 transition-all">
              Create My Resume
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;