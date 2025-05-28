'use client';
import React, { useEffect, useState } from 'react';
import Resume from '../component/Resume'; // adjust the path if needed
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ResumePage() {
  const params = useParams();
  const nameParam = params.name;

  const [resumeData, setResumeData] = useState<any>(null);

  useEffect(() => {
    // Retrieve form data from sessionStorage
    const data = sessionStorage.getItem('resumeData');
    if (data) {
      const parsedData = JSON.parse(data);

      // Optional: verify that the name in URL matches the stored name
      if (parsedData.name === nameParam) {
        setResumeData(parsedData);
      } else {
        // Handle mismatch or fallback
        setResumeData(parsedData); // or null / error
      }
    }
  }, [nameParam]);

  if (!resumeData) return <p>Loading resume...</p>;

  return (
    <div>
      <h1>Resume for {resumeData.name}</h1>
      <Resume
        name={resumeData.name}
        email={resumeData.email}
        roll={resumeData.roll}
        number={resumeData.phone}
        profession={resumeData.profession}
        skills={resumeData.skills}

      />
   
    </div>
  );
}
