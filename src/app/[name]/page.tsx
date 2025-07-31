'use client';
import React, { useEffect, useState } from 'react';
import Resume from '../component/Resume'; // adjust the path if needed
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ParamValue } from 'next/dist/server/request/params';

export default function ResumePage() {
  const params = useParams();
  const nameParam = params.name;
  console.log(params)
  

  const [resumeData, setResumeData] = useState<any>(null);

 useEffect(() => {
  


  const data = sessionStorage.getItem('resumeData');

  if (data) {
    try {
      const parsedData = JSON.parse(data);
      // console.log("From sessionStorage:", parsedData);

      // Optional: Match nameParam from URL (if needed)
      setResumeData(parsedData);
      // if (parsedData.name === nameParam) {
      // } else {
      //   console.warn("Name mismatch in URL and session data");
      //   console.log(`nameparam ${nameParam}`);
      //   console.log(`parseddata ${parsedData.name}`);

      //   // Optionally handle mismatch: show error, redirect, etc.
      //   setResumeData(null);
      // }
    } catch (error) {
      console.error("Failed to parse resumeData from sessionStorage", error);
    }
  } else {
    console.warn("No resumeData found in sessionStorage");
  }
 }, [nameParam]); // ✅ Re-run only if nameParam changes
  


 
if (!resumeData) {
  return <p>Loading resume data...</p>;
}
  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto shadow-md bg-white font-sans text-sm">
    {/* Left Column */}
    <div className="w-full md:w-1/3 bg-[#eaf3f8] text-[#3a3f44] p-6 space-y-6">
      {/* Contact */}
      <div>
          <h2 className="text-lg font-bold text-[#0f4c81]">{decodeURIComponent(nameParam) }</h2>
          <h2 className="text-lg font-bold text-[#0f4c81]">CONTACT{ nameParam}</h2>
          <p><strong>Phone</strong><br /><br />Sarasota, FL 34243</p>
          <p className="mt-3"><strong>Email</strong><br />{resumeData.email ||"loading.." }</p>
        <p className="mt-3"><strong>LinkedIn</strong><br />linkedin.com/in/andrea-martinez</p>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-lg font-bold text-[#0f4c81]">EDUCATION</h2>
        <p>
          <strong>Bachelor of Arts</strong><br />
          Visual Communication Design<br />
          Ringling College of Art and Design<br />
          Sarasota, FL<br />
          Honors: cum laude (GPA: 3.4/4.0)<br />
          June 2023
        </p>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-bold text-[#0f4c81]">ADDITIONAL SKILLS</h2>
        <ul className="list-disc list-inside space-y-1">
            {resumeData.singleSkills.map((skill) => (
              <li key={skill}>{skill }</li>
          ))}
          {/* <li>Adobe Illustrator</li>
          <li>Adobe InDesign</li>
          <li>Digital theory</li>
          <li>Video & print production</li>
          <li>Collaboration</li>
          <li>Time management</li> */}
        </ul>
      </div>
    </div>

    {/* Right Column */}
    <div className="w-full md:w-2/3 p-6 space-y-6 text-gray-600">
      <div>
        <h1 className="text-2xl font-bold text-[#0f4c81] uppercase">Resume for Beginners</h1>
        <p className="text-sm text-gray-600">Example by Resume Genius</p>
      </div>

      {/* Summary */}
      <div>
        <p >
          {resumeData ? (
  <h1 contentEditable>{resumeData.summary}</h1>
) : (
  <h1>Loading...</h1>
)}

        </p>
      </div>

      {/* Experience */}
      <div>
        <h2 className="text-lg font-bold text-[#0f4c81]">RELEVANT EXPERIENCE</h2>
        {/* Job 1 */}
        <div className="mt-3">
          <p><strong>Graphic Design Volunteer</strong><br />Cat Depot, Sarasota, FL<br />December 2022 – Present</p>
          <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
            <li>Used Adobe Creative Suite, including Photoshop and Illustrator, to enhance branding materials.</li>
            <li>Designed marketing assets that increased adoption inquiries by 30% and donations by 15%.</li>
            <li>Created engaging visuals for the organizations monthly newsletter.</li>
            <li>Worked with event teams on posters and banners for fundraising events.</li>
          </ul>
        </div>

        {/* Job 2 */}
        <div className="mt-5">
          <p><strong>Graphic Design Intern</strong><br />Sann, Sarasota, FL<br />May 2022 – November 2022</p>
          <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
            <li>Assisted the marketing team in creating social media assets and ad banners.</li>
            <li>Helped redesign company website for a more modern UI.</li>
            <li>Worked on print materials for product launches and presentations.</li>
          </ul>
        </div>
      </div>
      </div>
      <input type="color"  />
  </div>
  );
}
