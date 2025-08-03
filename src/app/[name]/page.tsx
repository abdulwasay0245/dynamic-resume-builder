'use client';
/* eslint-disable */
import React, { useEffect,useContext, useState,useRef } from 'react';

import { useParams } from 'next/navigation';


import UserContext from '../context/UserContext';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumeDocument from '../component/DownloadableResume';



import FormData from '@/types/FormInput';

export default function ResumePage() {

  const { Forms } = useContext(UserContext) as { Forms: FormData | null };

  const resumeRef = useRef(null)



  const params = useParams();
  const nameParam = params.name;
  console.log(params)
  

  const [resumeData, setResumeData] = useState<FormData | null>(null);
  const [color, setColor] = useState("white")
  
  
  useEffect(() => {
    
    
    
    const data = sessionStorage.getItem('resumeData');
    
    console.log("contextapi dynamic route data", Forms);
    if (data) {
      try {
        const parsedData = JSON.parse(data);
    
      setResumeData(parsedData);
     
    } catch (error) {
      console.error("Failed to parse resumeData from sessionStorage", error);
    }
  } else {
    console.warn("No resumeData found in sessionStorage");
  }
 }, [nameParam, Forms]); // ✅ Re-run only if nameParam changes
  


 
if (!resumeData) {
  return <p>Loading resume data...</p>;
}
  return (
    <div ref = {resumeRef} style={{backgroundColor: color}} className={`flex flex-col md:flex-row max-w-5xl mx-auto shadow-md  font-sans text-sm`}>
    {/* Left Column */}
    <div className="w-full md:w-1/3 bg-[#eaf3f8] text-[#3a3f44] p-6 space-y-6">
      {/* Contact */}
      <div>
          <h2 className="text-lg font-bold text-[#0f4c81]"></h2>
          <h2 className="text-lg font-bold text-[#0f4c81]">CONTACT</h2>
          <p><strong>Phone</strong>
            <p>{resumeData.number || "loading..."}</p>
          </p>
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
            {resumeData.singleSkills.map((skill : string) => (
              <li key={skill}>{skill.toUpperCase() }</li>
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
          <h1 className="text-2xl font-bold text-[#0f4c81] uppercase">{nameParam }</h1>
        <p className="text-sm text-gray-600">Example by Resume Genius</p>
      </div>

      {/* Summary */}
      <div>
        <p >
          {resumeData ? (
  <h1 >{resumeData.summary}</h1>
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
            <li contentEditable>Assisted the marketing team in creating social media assets and ad banners.</li>
            <li contentEditable>Helped redesign company website for a more modern UI.</li>
            <li contentEditable>Worked on print materials for product launches and presentations.</li>
          </ul>
        </div>
      </div>
      </div>
      <PDFDownloadLink
      document={<ResumeDocument dataProp={resumeData} />}
      fileName="example.pdf"
    >
      Download PDF
    </PDFDownloadLink>
      {/* <input type="color" value={color} onChange={((e) => setColor(e.target.value))} /> */}
      {/* <button className='bg-red-700 text-amber-400'>Download PDF</button> */}
      </div>
  //  
  );
}
