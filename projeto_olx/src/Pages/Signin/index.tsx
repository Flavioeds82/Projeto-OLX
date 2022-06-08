import React, { FormEvent } from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import './style.css';
import { Api } from "../../Helpers/Api";
import { Login } from "../../Helpers/AuthHandler";

export function Signin(){

   //---------------- CONTANTS ---------------//
      // Constants used for form control //
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [remPassword, setRemPassword] = useState<boolean>(false);
   const [disabled, setDisabled]= useState<boolean>(false);
   const [userToken, setUserToken] = useState<string>('')
   const [error, setError] = useState<string>('');

   


   //---------------- FUNCTIONS ---------------//
      // Functions used for form control //
   async function handleSubmit(e: FormEvent<HTMLFormElement>){
      e.preventDefault();
      setDisabled(true);

      
      const json = await Api.login(email, password);
      if(!json.error){
         Login(userToken, remPassword );
         window.location.href = '/';
      }else{ 
         setError(json.error)
         setTimeout(()=>{
            window.location.href = '/signin';
         },1500)
         
      }

   }
   
   return(
      <div className="container-signin">
         
            {error &&
              <div className="error">{error}</div> 
            }
         
         <form action="" className="form-signin" onSubmit={handleSubmit}>
            <div className="title">
               <h1>Login</h1>
            </div>
            <label htmlFor=""className="form-area">
               <div className="form-title">Email</div>
               <div className="form-input">
                  <input 
                     type="email"  
                     disabled={disabled}
                     value={email}
                     onChange={e=>setEmail(e.target.value)} 
                     required
                  />
               </div>
            </label>
            <label htmlFor=""className="form-area">
               <div className="form-title">Senha</div>
               <div className="form-input">
               <input 
                     type="password"  
                     disabled={disabled}
                     value={password}
                     onChange={e=>setPassword(e.target.value)} 
                     required
                  />
               </div>
            </label>
            <label htmlFor="checkbox"className="form-area">
               <div className="form-title">Lembrar Senha</div>
               <div className="form-input">
                  <input 
                     type="checkbox" 
                     disabled={disabled}
                     checked={remPassword}
                     onChange={()=>setRemPassword(!remPassword)}
                     id='ch-01'
                  />
               </div>
            </label>
            <label htmlFor=""className="form-area">
               <div className="form-title"></div>
               <div className="form-input">
                  <button 
                     type="submit" 
                     disabled={disabled}> 
                     Login 
                  </button>
               </div>
            </label>
         </form>
         
      </div>
   )
}