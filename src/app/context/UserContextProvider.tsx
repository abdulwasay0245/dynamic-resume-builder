'use client'
import React, { useState } from 'react'
import UserContext from './UserContext'


const UserContextProvider = ({children}:{children: React.ReactNode}) => {
  const [Forms, setForms] = useState<string| null>(null)
  return (
      <UserContext.Provider value={{Forms, setForms}}>
          {children}
   </UserContext.Provider>
  )
}

export default UserContextProvider