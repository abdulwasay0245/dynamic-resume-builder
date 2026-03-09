import React from "react";
import { FormDataState } from "@/types/FormInput";

interface UserContextType {
    Forms: FormDataState | null;
    setForms: (Forms: FormDataState | null) => void;
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
