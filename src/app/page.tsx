'use client'
import React, { useState } from 'react';

export default function MyForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, name });
    setName('')
    setEmail('')
  };

  return (
    <div className='w-full h-screen flex items-center justify-center'>

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
      <button type="submit" className='bg-amber-950 text-white px-5 py-2 rounded-2xl'>Submit</button>
    </form>
        </div>
  );
}