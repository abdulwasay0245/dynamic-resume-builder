'use client'
import React, { useState } from 'react'
import UserContext from './UserContext'
import FormData from '@/types/FormInput'

const UserContextProvider = ({children}:{children: React.ReactNode}) => {
  const [Forms, setForms] = useState<FormData| null>(null)
  return (
      <UserContext.Provider value={{Forms, setForms}}>
          {children}
   </UserContext.Provider>
  )
}

export default UserContextProvider