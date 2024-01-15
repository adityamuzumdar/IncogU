import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import authService from '../appwrite/auth';
import {useDispatch} from "react-redux"
import { login as authLogin } from '../store/authSlice'
import {Link, useNavigate} from 'react-router-dom'
 

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const navigate = useNavigate()
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const email = e.target.email.value;
        const password=e.target.password.value;
        login(email,password);
    }

    //Handle Login API Integration here
    const login = async(email,password) => {

        try {
            
            const session = await authService.login({email,password})
            if (session) {
                console.log("i am in login")

                const userData = await authService.getCurrentUser()
                // if(userData) dispatch(authLogin(userData));
                if(userData)  navigate("/");

               
            }
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}