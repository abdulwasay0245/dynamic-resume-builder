// app/resume/page.tsx or pages/resume.tsx
import React from 'react';

const Resume = () => {
  return (
    <main className="bg-gray-100 text-gray-800 p-8 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">John Doe</h1>
          <p className="text-lg text-gray-600">Full Stack Web Developer</p>
          <p className="text-sm text-gray-500">
            johndoe@email.com | +1 234 567 890 | johndoe.dev
          </p>
        </div>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-purple-700 mb-2">Summary</h2>
          <p className="text-gray-700">
            Experienced web developer with a passion for building responsive and scalable web applications. Proficient in React, Node.js, Tailwind CSS, and more.
          </p>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-purple-700 mb-2">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-700">
            <span>HTML & CSS</span>
            <span>JavaScript</span>
            <span>React.js</span>
            <span>Node.js</span>
            <span>Tailwind CSS</span>
            <span>MongoDB</span>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-purple-700 mb-2">Experience</h2>
          <div>
            <h3 className="text-lg font-semibold">Frontend Developer – ABC Corp</h3>
            <p className="text-sm text-gray-500">Jan 2022 – Present</p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Developed and maintained user interfaces using React and Tailwind CSS.</li>
              <li>Improved page load times by 30% through performance optimizations.</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-purple-700 mb-2">Education</h2>
          <div>
            <h3 className="text-lg font-semibold">B.S. in Computer Science</h3>
            <p className="text-sm text-gray-500">XYZ University, 2018 – 2022</p>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-purple-700 mb-2">Projects</h2>
          <div>
            <h3 className="text-lg font-semibold">Portfolio Website</h3>
            <p className="text-gray-700">
              Built a responsive portfolio site using Next.js and Tailwind CSS to showcase personal projects and blogs.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Resume;
