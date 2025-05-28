// 'use client'
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';  // Note: next/navigation for app router

// export default function MyForm() {
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [profession, setProfession] = useState('');
//   const [singleSkill, setSingleSkill] = useState('');
//   const router = useRouter();

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const skills = singleSkill.split(',').map(skill => skill.trim());

//     const formData = {
//       name,
//       email,
//       phone,
//       profession,
//       skills,
//     };

//     // Save form data in sessionStorage for retrieval on the dynamic page
//     sessionStorage.setItem('resumeData', JSON.stringify(formData));

//     // Redirect to dynamic route
//     // router.push(`/${encodeURIComponent(name)}`);
//     window.open(`/${encodeURIComponent(name)}`, '_blank');

//     // Optionally clear the form here
//     setName('');
//     setEmail('');
//     setPhone('');
//     setProfession('');
//     setSingleSkill('');
//   };

//   return (
//     <div className='w-full flex flex-col items-center justify-center'>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-10 text-black bg-amber-400 p-20 rounded-2xl'>
//         <input
//           type="text"
//           placeholder="Your Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className='border-2 border-black'
//           required
//         />
//         <input
//           type="email"
//           placeholder="Your Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className='border-2 border-black'
//           required
//         />
//         <input
//           type="text"
//           placeholder="Enter your Profession"
//           value={profession}
//           onChange={(e) => setProfession(e.target.value)}
//           className='border-2 border-black'
//         />
//         <input
//           type="text"
//           placeholder="Enter your Phone Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className='border-2 border-black'
//         />
//         <input
//           type="text"
//           placeholder="Enter your Skills (comma separated)"
//           value={singleSkill}
//           onChange={(e) => setSingleSkill(e.target.value)}
//           className='border-2 border-black'
//         />
//         <button type="submit" className='bg-amber-950 text-white px-5 py-2 rounded-2xl'>Submit</button>
//       </form>
//     </div>
//   );
// }
































"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn("github")}>Login with GitHub</button>
      )}
    </div>
  );
}