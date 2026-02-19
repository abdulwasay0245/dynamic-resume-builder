'use client';
/* eslint-disable */
import React, { useEffect, useContext, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import UserContext from '../context/UserContext';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumeDocument from '../component/DownloadableResume';
import FormData from '@/types/FormInput';

export default function ResumePage() {
  const { Forms } = useContext(UserContext) as { Forms: FormData | null };
  const params = useParams();
  const nameParam = params.name;

  const [resumeData, setResumeData] = useState<FormData | null>(null);
  const [color, setColor] = useState("white");
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use context first
    if (Forms) {
      setResumeData({
        ...Forms,
        job_summary: Array.isArray(Forms.job_summary) ? Forms.job_summary : [Forms.job_summary],
        singleSkills: Array.isArray(Forms.singleSkills) ? Forms.singleSkills : [],
        education_summary: Forms.education_summary || "No education summary available",
      });
      return;
    }

    // Fallback: sessionStorage
    const storedData = sessionStorage.getItem('resumeData');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);

        const normalized: FormData = {
          ...parsed,
          job_summary: Array.isArray(parsed.job_summary)
            ? parsed.job_summary
            : parsed.job_summary
              ? [parsed.job_summary]
              : [],
          singleSkills: Array.isArray(parsed.singleSkills)
            ? parsed.singleSkills
            : [],
          education_summary: parsed.education_summary || "No education summary available",
        };
        setResumeData(normalized);
      } catch {
        // If storedData is plain string
        setResumeData({
          name: nameParam,
          email: "",
          number: "",
          address: "",
          degName: "",
          university: "",
          educationYear: "",
          position: "",
          company: "",
          time: "",
          jobDescription: "",
          singleSkills: [],
          job_summary: [storedData],
          education_summary: storedData,
        } as FormData);
      }
    }
  }, [Forms, nameParam]);

  if (!resumeData) return <p>Loading resume data...</p>;

  return (
    <div ref={resumeRef} style={{ backgroundColor: color }} className="flex flex-col md:flex-row max-w-5xl mx-auto shadow-md font-sans text-sm">
      {/* Left Column */}
      <div className="w-full md:w-1/3 bg-[#eaf3f8] text-[#3a3f44] p-6 space-y-6">
        {/* Contact */}
        <div>
          <h2 className="text-lg font-bold text-[#0f4c81]">CONTACT</h2>
          <p><strong>Phone:</strong> {resumeData.number || "N/A"}</p>
          <p><strong>Email:</strong> {resumeData.email || "N/A"}</p>
          <p><strong>LinkedIn:</strong> linkedin.com/in/andrea-martinez</p>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-lg font-bold text-[#0f4c81]">EDUCATION</h2>
          <p>
            <strong>{resumeData.degName || "Degree"}</strong><br />
            {resumeData.university || "University"}<br />
            Year: {resumeData.educationYear || "N/A"}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-lg font-bold text-[#0f4c81]">ADDITIONAL SKILLS</h2>
          <ul className="list-disc list-inside space-y-1">
            {(resumeData.singleSkills || []).map((skill: string) => (
              <li key={skill}>{skill.toUpperCase()}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-2/3 p-6 space-y-6 text-gray-600">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81] uppercase">{nameParam}</h1>
          <p className="text-sm text-gray-600">Generated Resume</p>
        </div>

        {/* Education Summary */}
        <div>
          <h2 className="text-lg font-bold text-[#0f4c81]">EDUCATION SUMMARY</h2>
          <p>{resumeData.education_summary}</p>
        </div>

        {/* Work Experience */}
        <div>
          <h2 className="text-lg font-bold text-[#0f4c81]">WORK EXPERIENCE</h2>
          <div className="mt-3">
            <p>
              <strong>{resumeData.position || "Position"}</strong><br />
              {resumeData.company || "Company"}<br />
              {resumeData.time || "Time Period"}
            </p>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              {(resumeData.job_summary || []).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Example second job */}
          <div className="mt-5">
            <p>
              <strong>Graphic Design Intern</strong><br />
              Sann, Sarasota, FL<br />
              May 2022 – November 2022
            </p>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li contentEditable>Assisted the marketing team in creating social media assets and ad banners.</li>
              <li contentEditable>Helped redesign company website for a more modern UI.</li>
              <li contentEditable>Worked on print materials for product launches and presentations.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* PDF Download */}
      <PDFDownloadLink
        document={<ResumeDocument dataProp={resumeData} />}
        fileName="resume.pdf"
      >
        {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
}
