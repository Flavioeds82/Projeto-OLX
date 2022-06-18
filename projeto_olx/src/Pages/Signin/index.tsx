import React, { FormEvent } from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import './Signin.css';
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
      setError('');

      
      const json = await Api.login(email, password);
      if(json !== -1){
         if(!json.error){
                  Login(userToken, remPassword );
                  window.location.href = '/';
               }else{ 
                  setError(json.error)
                  setDisabled(false);
               }
      }else{
         setDisabled(false);
         setError('Não foi possivel efetuar o Login. Tente mais tarde')
      }
      

   }
   
   return(
      <div className="container-signin">
         
         <form action="" className="form-signin" onSubmit={handleSubmit}>
            {error &&
              <div className="error">{error}</div> 
            }
            <div className="title">
               <h1>Login</h1>
            </div>
            <label htmlFor=""className="form-area">
               <div className="left">
                  <div className="form-title">Email</div>
               </div>
               <div className="right">
                 <div className="form-input">
                     <input 
                        
                        type="email"  
                        disabled={disabled}
                        value={email}
                        onChange={e=>setEmail(e.target.value)} 
                        required
                     />
                  </div> 
               </div>
               
            </label>
            <label htmlFor=""className="form-area">
               <div className="left">
                  <div className="form-title">Senha</div>
               </div>
               <div className="right">
                  <div className="form-input">
                     <input 
                           type="password"  
                           disabled={disabled}
                           value={password}
                           onChange={e=>setPassword(e.target.value)} 
                           required
                        />
                  </div>
               </div>
               
            </label>
            <label htmlFor="checkbox"className="form-area">
               
               
                  <div className="form-input">
                     <div className="form-title">Lembrar Senha</div>
                     <input 
                        type="checkbox" 
                        disabled={disabled}
                        checked={remPassword}
                        onChange={()=>setRemPassword(!remPassword)}
                        className="check-button"
                     />
                  </div>
              
               
            </label>
            <label htmlFor=""className="form-area">
               {/* <div className="form-title"></div> */}
               <div className="form-input">
                  <button 
                     className="submit-button"
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