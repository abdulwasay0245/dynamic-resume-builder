import React from "react";
import FormData from "@/types/FormInput";
interface UserContextType{
    Forms: FormData |null
    setForms: (Forms: FormData | null)=>void
}

const defaultValue:UserContextType    = {
    
    Forms: null,
    setForms: ()=>{},
}

const UserContext = React.createContext(defaultValue)

export default UserContext
