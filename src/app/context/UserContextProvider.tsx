'use client'
import React, { useState, useEffect } from 'react'
import UserContext from './UserContext'
import FormData from '@/types/FormInput'

const UserContextProvider = ({children}:{children: React.ReactNode}) => {
  const [Forms, setForms] = useState<FormData| null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');

  useEffect(() => {
    // Load from local storage on mount
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) {
        setSelectedTemplate(savedTemplate);
    }
  }, []);

  const handleSetTemplate = (template: string) => {
      setSelectedTemplate(template);
      localStorage.setItem('selectedTemplate', template);
  };

  return (
      <UserContext.Provider value={{Forms, setForms, selectedTemplate, setSelectedTemplate: handleSetTemplate}}>
          {children}
   </UserContext.Provider>
  )
}

export default UserContextProvider