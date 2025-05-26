'use client'
import React, {  useState } from 'react';
import Resume from './component/Resume';

export default function MyForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');
  const [singleSkill, setSingleSkill] = useState('')
  const [skills, setSkills] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [submitData, setSubmittedData] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
    const newSkills = singleSkill.split(',').map(skill => skill.trim())
    setSkills(newSkills);
    setSubmittedData({
      name,
      email,
      phone,
      profession,
      skills: newSkills,
    });

    e.preventDefault();
    console.log({ email, name });
    setName('')
    setEmail('')
    setSingleSkill('')
    setIsSubmitted(true)


  };

  return (
    <div className='w-full  flex flex-col items-center justify-center'>

    <form onSubmit={handleSubmit} className='flex flex-col gap-10 text-black bg-amber-400 p-20 rounded-2xl'>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='border-2 border-black ' />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
          className='border-2 border-black' />
        
        <input
        type="text"
        placeholder="Enter your Profession"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
          className='border-2 border-black' />
         <input
        type="text"
        placeholder="Enter your Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
          className='border-2 border-black' />
            <input
        type="text"
        placeholder="Enter your Phone Number"
        value={singleSkill}
        onChange={(e) => setSingleSkill(e.target.value)}
          className='border-2 border-black' />
        {skills.map((skill) => (
          <div key={Math.random()}>
            <h1>{skill }</h1>
          </div>
        ))}
        
      <button type="submit" className='bg-amber-950 text-white px-5 py-2 rounded-2xl'>Submit</button>
      </form>
      { 
       
      isSubmitted && submitData &&
        <Resume name = {submitData.name} email={submitData.email} number={submitData.phone} />
     }
      
    </div>
    
  );
  
}