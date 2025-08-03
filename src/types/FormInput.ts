interface Datatype{
  name: string,
  email: string
  number: string,
  address?: string,
  skills?: [string],
  degname?: string,
  university?: string,
  educationYear?:string
  
  
}

interface FormType{
    user: Datatype
    setForm: Datatype
    
}
export default FormType