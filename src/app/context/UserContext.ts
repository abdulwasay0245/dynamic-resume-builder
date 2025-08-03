import React from "react";
interface UserContextType{
    Forms: string |null
    setForms: (Forms: string | null)=>void
}

const defaultValue:UserContextType    = {
    
    Forms: null,
    setForms: ()=>{},
}

const UserContext = React.createContext(defaultValue)

export default UserContext
