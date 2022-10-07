import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AdItem } from "../../Components/AdItem";
import { PageContainer } from "../../Components/Template";
import { Api } from "../../Helpers/Api";
import { Ad } from "../../types/Types";
import { PageArea } from "./user";
import {ModalAds} from "../../Components/Modal";


export function User(){
   const [user, setUser] = useState<any>({});
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
   const [sizeAdList, setSizeAdList] = useState<number>(0);
   const [adOthers, setAdOthers] = useState<Ad[]>([]);
   const [openModal, setOpenModal] = useState<boolean>(false);
   const [adEdit, setAdEdit] = useState<Ad>();
   
   function handleOpenModal(e:Ad){
      setOpenModal(true);
      setAdEdit(e);
   }
   function handleCloseModal(){
      setOpenModal(false);
   }


   useEffect(()=>{
      async function getOthersAds(){
         const json = await Api.getAds({
            sort: RTCSessionDescription,
            limit: sizeAdList
         });
         setAdOthers(json.ads);
      }
      getOthersAds();
   }, [])


   useEffect(()=>{
      const getStates = async()=>{
         const slist = await Api.getStates();
         setStateList(slist)
      }
      getStates();
   }, []);

   
   useEffect(()=>{
      async function getUser(){
         let token = Cookies.get('token');
         if(token){
            const userTemp = await Api.getUser(token);
            setUser(userTemp);
            if(user.ads){setSizeAdList(user.ads.lenght);}
            
         }
         
         getUser();
      }
      getUser();
   }, []);


   
   return(
      <PageContainer>
         <PageArea>
            <div className="user-area">
                        
                        <form action="" className="form-signin" >
                           {error &&
                           <div className="error">{error}</div> 
                           }
                           <div className="title">
                              <h1>Meus Dados</h1>
                           </div>

                           <label htmlFor=""className="form-area">
                              <div className="left">
                                 <div className="form-title">Nome</div>
                              </div>
                              <div className="right">
                              <div className="form-input">
                                    <input 
                                       placeholder={user.name}
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
                                       placeholder={user.email}
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
                              <div className="form-input">
                                 <button 
                                    className="submit-button"
                                    type="submit" 
                                    disabled={disabled}> 
                                    Alterar Dados 
                                 </button>
                              </div>
                           </label>
                        </form>
                       
                        {adOthers &&
                           <>
                              <div className="AdPage-container-area-others">
                                 <h2>Meus Anuncios</h2>
                                 <div className="AdPage-container-area-others-list">
                                    {adOthers.map((i:any,k:number)=>
                                       <div className="AdPage-container-area-others-list-item">
                                          <AdItem key={k} data={i} />
                                          <button id="bt-editar" onClick={()=> handleOpenModal(i)} >Editar</button>
                                       </div>
                                    )}
                                    
                                 </div>
                                 <div className="AdPage-container-area-others-list-modal">
                                       
                                 </div>
                                 
                              </div>
                              
                           </>
                        }
                        {openModal &&
                           <ModalAds data={adEdit}  />
                        }
                        

                        
                  </div>
            
         </PageArea>
      </PageContainer>
   )
}