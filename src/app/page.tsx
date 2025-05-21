'use client'
import { useState } from 'react';

export default function MyForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, name });
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
      <button type="submit">Submit</button>
    </form>
        </div>
  );
}