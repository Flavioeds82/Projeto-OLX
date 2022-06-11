import React, { FormEvent } from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import './Signup.css';
import { Api } from "../../Helpers/Api";
import { Login } from "../../Helpers/AuthHandler";

export function Signup(){

   //---------------- CONTANTS ---------------//
      // Constants used for form control //
   const [name, setName] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [confirmPassword, setconfirmPassword] = useState<string>('');
   const [state, setState] = useState<string>('');
   const [disabled, setDisabled]= useState<boolean>(false);
   const [userToken, setUserToken] = useState<string>('')
   const [error, setError] = useState<string>('');

   


   //---------------- FUNCTIONS ---------------//
      // Functions used for form control //
   async function handleSubmit(e: FormEvent<HTMLFormElement>){
      e.preventDefault();
      setDisabled(true);
      setError('');

      if(password !== confirmPassword){
         setError('As senhas não coincidem')
         return;
      }

      
      const json = await Api.register(name, email, password, state);
      if(json !== -1){
         if(!json.error){
                  Login(userToken);
                  window.location.href = '/';
               }else{ 
                  setError(json.error);
                  setDisabled(false);
               }
      }else{
         setError('Não foi possivel efetuar o Login. Tente mais tarde');
      }
      

   }
   
   return(
      <div className="container-signup">
         
            {error &&
              <div className="error">{error}</div> 
            }
         
         <form action="" className="form-signup" onSubmit={handleSubmit}>
            <div className="title">
               <h1>Cadastro</h1>
            </div>
            <label htmlFor=""className="form-area">
               <div className="form-title" id='name' placeholder={'Nome Completo'}>Nome </div>
               <div className="form-input">
                  <input 
                     type="text"
                     placeholder="Nome Completo"  
                     disabled={disabled}
                     value={name}
                     onChange={e=>setName(e.target.value)} 
                     required
                  />
               </div>
            </label>
            
            <label htmlFor=""className="form-area">
               <div className="form-title">Email</div>
               <div className="form-input">
                  <input 
                     type="email"
                     placeholder="Email"  
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
                     placeholder="Senha"  
                     disabled={disabled}
                     value={password}
                     onChange={e=>setPassword(e.target.value)} 
                     required
                  />
               </div>
            </label>

            <label htmlFor="checkbox"className="form-area">
               <div className="form-title">Repetir</div>
               <div className="form-input">
                  <input 
                     type="password"
                     placeholder="Confirmar Senha" 
                     disabled={disabled}
                     value={confirmPassword}
                     onChange={e=>setconfirmPassword(e.target.value)}
                  />
               </div>
            </label>

            <label htmlFor=""className="form-area">
               <div className="form-title">Estado</div>
               <div className="form-input">
                  <select name="Estados" id="estados">
                     <option value="RJ">RJ</option>
                     <option value="RJ">SP</option>
                     <option value="RJ">MG</option>


                  </select>
               </div>
            </label>

            <label htmlFor=""className="form-area">
               <div className="form-title"></div>
               <div className="form-input">
                  <button 
                     type="submit" 
                     disabled={disabled}> 
                     Cadastrar 
                  </button>
               </div>
            </label>
         </form>
         
      </div>
   )
}
