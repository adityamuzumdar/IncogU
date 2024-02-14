import authService from '../appwrite/auth';
import { useState } from 'react';
import { signupFields1 } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

const fields=signupFields1;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const [error, setError] = useState("")
  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    setError("")
    const email = e.target.email.value;
    const password=e.target.password.value;
    const isValidEmail = (email) => {
      // Define a regular expression pattern for allowed email domains
      const allowedDomainsPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(ac\.in|edu)$/i;
      return allowedDomainsPattern.test(email.trim());
    };
    const takeuni = (email) => {
        const atIndex = email.indexOf('@');
        const dotIndex = email.indexOf('.', atIndex);

        if (atIndex !== -1 && dotIndex !== -1) {
            const extractedText = email.substring(atIndex + 1, dotIndex);
            return extractedText;
        } else {
            
            return 'Invalid email format';
        }
    };
    if(isValidEmail(email)) authService.createAccount({email,password});
    else setError("Email not valid")
  }

  //handle Signup API Integration here
  

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Email Verification" />
        </div>

         

      </form>
    )
}