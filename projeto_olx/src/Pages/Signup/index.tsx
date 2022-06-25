import React, { FormEvent, useEffect } from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import './Signup.css';
import { Api } from "../../Helpers/Api";
import { Login } from "../../Helpers/AuthHandler";

export function Signup(){

   //---------------- CONTANTS ---------------//
      // Constants used for form control //
   const [email, setEmail] = useState<string>('');
   const [name, setName] = useState<string>('');
   const [stateLoc, setStateLoc] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [confirmPassword, setConfirmPassword] = useState<string>('');
   const [remPassword, setRemPassword] = useState<boolean>(false);
   const [disabled, setDisabled]= useState<boolean>(false);
   const [userToken, setUserToken] = useState<string>('')
   const [error, setError] = useState<string>('');
   const [stateList, setStateList] = useState<any[]>([]);

   //---------------- USE EFFECTS ---------------//

   useEffect(()=>{
      const getStates = async()=>{
         const slist = await Api.getStates();
         setStateList(slist)
      }
      getStates();
   }, [])
   //---------------- FUNCTIONS ---------------//
      // Functions used for form control //
   async function handleSubmit(e: FormEvent<HTMLFormElement>){
      e.preventDefault();
      setDisabled(true);
      setError('');

      try {
         if(password !== confirmPassword ){throw "Senhas não conferem"}
         const json = await Api.register(name, email, password, stateLoc);
         if(json === -1){throw "Não foi possivel realizar o cadastro. Tente novamente"};
         if(!json.token){throw "Ocorreu um erro. Tente novamente"};
         Login(json.token);
         window.location.href = '/';   
 
      } catch (error:any) {
         setError(error);
         setDisabled(false);
        
      }
   }
   
   return(
      <div className="container-signin">
         
         <form action="" className="form-signin" onSubmit={handleSubmit}>
            {error &&
              <div className="error">{error}</div> 
            }
            <div className="title">
               <h1>Cadastro</h1>
            </div>
            <label htmlFor=""className="form-area">
               <div className="left">
                  <div className="form-title">Nome</div>
               </div>
               <div className="right">
                 <div className="form-input">
                     <input 
                        placeholder="Nome Completo"
                        type="text"  
                        disabled={disabled}
                        value={name}
                        onChange={e=> setName(e.target.value)} 
                        required
                     />
                  </div> 
               </div>
            </label>
            <label htmlFor=""className="form-area">
               <div className="left">
                  <div className="form-title">E-mail</div>
               </div>
               <div className="right">
                 <div className="form-input">
                     <input 
                        
                        type="email"  
                        disabled={disabled}
                        placeholder="E-mail"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)} 
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
                           placeholder="Senha"  
                           disabled={disabled}
                           value={password}
                           onChange={e=> setPassword(e.target.value)} 
                           required
                        />
                  </div>
               </div>
               
            </label>
            <label htmlFor=""className="form-area">
               <div className="left">
                  <div className="form-title">Confirmar </div>
               </div>
               <div className="right">
                  <div className="form-input">
                     <input 
                           type="password"  
                           disabled={disabled}
                           placeholder="Confirmar senha"
                           value={confirmPassword}
                           onChange={e=> setConfirmPassword(e.target.value)} 
                           required
                        />
                  </div>
               </div>
               
            </label>
            <label htmlFor="checkbox"className="form-area">
               
                  <div className="left">
                     <div className="form-title">Estado</div>
                  </div>
                  <div className="right">
                     <div className="form-input-select">
                        <select 
                        name="states" 
                        id="states"
                        value={stateLoc}
                        onChange={(e)=> setStateLoc(e.target.value)}
                        >
                           {
                              stateList.map((i,k)=>
                                 <option key={k} value={i.name}>{i.name}</option>
                              )
                           }
                        </select>
                     </div>
                  </div>
                  
              
               
            </label>
            <label htmlFor=""className="form-area">
               {/* <div className="form-title"></div> */}
               <div className="form-input">
                  <button 
                     className="submit-button"
                     type="submit" 
                     disabled={disabled}> 
                     Fazer Cadastro 
                  </button>
               </div>
            </label>
         </form>
         
      </div>
   )
}