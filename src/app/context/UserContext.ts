import React from "react";
import FormData from "@/types/FormInput";

interface UserContextType {
    Forms: FormData | null;
    setForms: (Forms: FormData | null) => void;
    selectedTemplate: string;
    setSelectedTemplate: (template: string) => void;
}

const defaultValue: UserContextType = {
    Forms: null,
    setForms: () => {},
    selectedTemplate: 'modern',
    setSelectedTemplate: () => {},
}

const UserContext = React.createContext(defaultValue);

export default UserContext;
