'use client'
import React, { useState,useContext, useEffect } from 'react';
import Loader from './Loader';
import { useRouter } from 'next/navigation';
import UserContext from '../context/UserContext';

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const [degName, setDegName] = useState("");
  const [university, setUniversity] = useState("");
  const [educationYear, setEducationYear] = useState("");

  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [time, setTime] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [skills, setSkills] = useState("");
  const router = useRouter()
  const {Forms,setForms}= useContext(UserContext)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // const newTab = window.open('','_blank')
    e.preventDefault();
    setIsLoading(true)
    
      const singleSkills = skills.split(',').map(skill => skill.trim())
      console.log(singleSkills)
      const formData = {
        name,
        email,
        number,
        address,
        degName,
        university,
        educationYear,
        position,
        company,
        time,
        jobDescription,
        singleSkills,
      }
      try {
        // const stringedData = JSON.stringify(formData)
        // const response = axios.post("http://127.0.0.1:8000/triage",stringedData)
        const response = await fetch("https://triage-agent-production.up.railway.app/triage",
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          },


        )
        const result = await response.json();
        if (result) {
          setIsLoading(false)
        }
        const mergeData= {
          ...formData,
          ...result
        }
        setForms(mergeData)
        console.log("context api",Forms);
        
        console.log(mergeData);

      
        sessionStorage.setItem('resumeData', JSON.stringify(mergeData))
        // window.open(`/${encodeURIComponent(name)}`, '_blank');
        router.push(`/${encodeURIComponent(name)}`);
    //     if (newTab) {
    //       // newTab.location.href = `/${encodeURIComponent(name)}`;
          
    // }
      }
      catch (error) {
        console.error("error", error);
        setIsLoading(false)
        
    }
      finally {
        
    }
      
    }
  console.log("loader", isLoading);
  useEffect(() => {
    
   console.log("contextapi formdata",Forms);
   
  
    
  }, [Forms])
  
  
  if (isLoading) return <Loader />
  else {
    
    return (
      <form onSubmit={handleSubmit} className={`${isLoading ? "hidden": " "}layout-content-container flex flex-col w-80`}>
      {/* Personal Info */}
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Personal Info</h2>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="mb-2 placeholder-gray-400 border p-2 rounded" />
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="mb-2 placeholder-gray-400 border p-2 rounded" />
      <input type='text' value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Phone Number" className="mb-2 placeholder-gray-400 border p-2 rounded" />
      <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street Address, City, State, Zip" className="mb-2 border placeholder-gray-400 p-2 rounded" />

      {/* Education */}
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Education</h2>
      <input type='text' value={degName} onChange={(e) => setDegName(e.target.value)} placeholder="e.g., Bachelor of Science" className=" placeholder-gray-400 mb-2 border p-2 rounded" />
      <input type='text' value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="e.g., University of Technology" className="mb-2 border p-2 placeholder-gray-400 rounded" />
      <input type='text' value={educationYear} onChange={(e) => setEducationYear(e.target.value)} placeholder="e.g., 2018" className="mb-2 placeholder-gray-400 border p-2 rounded" />

      {/* Experience */}
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Experience</h2>
      <input type='text' value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g., Software Engineer" className="mb-2 placeholder-gray-400 border p-2 rounded" />
      <input type='text' value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g., Tech Solutions Inc." className="mb-2 placeholder-gray-400 border p-2 rounded" />
      <input type='text' value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 2018 - 2022" className="mb-2 border placeholder-gray-400 p-2 rounded" />
      <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Describe your responsibilities and achievements" className="mb-2 placeholder-gray-400 border p-2 rounded" />

      {/* Skills */}
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Skills</h2>
      <input type='text' value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g., Java, Python, Communication" className="mb-2 placeholder-gray-900 border p-2 rounded" />
      <button className="bg-black"type='submit'>submit</button>
    </form>
  );
}
};

export default Form;
