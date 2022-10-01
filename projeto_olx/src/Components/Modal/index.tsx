import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Ad } from '../../types/Types';
import Cookies from "js-cookie";
import { useState, useEffect, FormEvent, useRef, useCallback } from "react";
import {useNavigate} from 'react-router-dom'
import { Api } from "../../Helpers/Api";
import { Login } from "../../Helpers/AuthHandler";
import { Category } from "../../types/Types";
import React from 'react';
import "./Modal.css";
import { localeData } from 'numeral';

const customStyles = {
   content: {
     top: '50%',
     left: '50%',
     right: 'auto',
     bottom: 'auto',
     marginRight: '-50%',
     transform: 'translate(-50%, -50%)',
   },
 };

 Modal.setAppElement('#root');

export function ModalAds(data: any) {
   const [modalIsOpen, setIsOpen] = React.useState(true);
   const nav = useNavigate();
   const fileField = useRef<any>();
   const [title, setTitle] = useState<string>('');
   const [category, setCategory] = useState<string>('');
   const [categories, setCategories] = useState<Category[]>([]);
   const [price, setPrice] = useState<string>('');
   const [priceNegotiable, setPriceNegotiable] = useState<boolean>(false);
   const [desc, setDesc] = useState<string>(data.desc)
   const [disabled, setDisabled]= useState<boolean>(false);
   const [error, setError] = useState<string>('');
   const ref = useRef(null);

  

   const handleChange = useCallback((e:any)=>{
      let digit = e;
      digit = digit.replace(/\D/g, "");
      digit = digit.replace(/(\d)(\d{2})$/, "$1,$2");
      digit = digit.replace(/(?=(\d{3})+(\D))\B/g, ".");
      setPrice(digit);
   }, [price]);

   useEffect(()=>{
      openModal();
      
   }, [data]);

   useEffect(()=>{
      const getCategories = async()=>{
         const cats = await Api.getCategory();
         setCategories(cats);
      }
      getCategories();
   }, [])

  function openModal() {
      setIsOpen(true);
  }

  function closeModal() {
     setIsOpen(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>){
   e.preventDefault();
   setDisabled(true);
   setError('');
   let pn = (priceNegotiable)?"true" : "false";
   let len = fileField.current.files.length;
   
   

   try {
      if(!title.trim()){throw 'Preencha o campo Título'};
      if(!category){throw 'Escolha uma categoria'};

      const fd = new FormData();
      fd.append('title', title);
      fd.append('price', price);
      fd.append('priceneg', pn);
      fd.append('desc', desc);
      fd.append('cat', category);
      

      if(len>0){
         for(let i=0;i<len;i++){
            fd.append('img', fileField.current.files[i]);
         }
      }

      const json = await Api.addAd(fd);
      if(json.error){throw json.error}

      nav(`/ad/${json.id}`);
      

   } catch (error:any) {
      setError(error);
      setDisabled(false);
     
   }
}

  return (

   <div>
   <Modal
     isOpen={modalIsOpen}
     onRequestClose={closeModal}
     style={customStyles}
     contentLabel="Example Modal"
   >
     
    
     <div className="editAds-container">
         
            <form action="" className="editAds-container-form" onSubmit={handleSubmit}>
               {error &&
                 <div className="error">{error}</div> 
               }
               <div className="editAds-container-form-title">
                  <h1>Editar Anúncio</h1>
               </div>

               <label htmlFor=""className="editAds-container-form-area">
                  <div className="editAds-container-form-area-left">
                     <div className="editAds-container-form-area-left-title">Título</div>
                  </div>
                  <div className="editAds-container-form-area-right">
                    <div className="editAds-container-form-area-right-input">
                        <input 
                           placeholder="Digite o título do anúncio"
                           type="text"  
                           disabled={disabled}
                           value={title}
                           onChange={e=> setTitle(e.target.value)} 
                           required
                        />
                     </div> 
                  </div>
               </label>

               <label htmlFor=""className="editAds-container-form-area">
                  <div className="editAds-container-form-area-left">
                     <div className="editAds-container-form-area-left-title">Categoria</div>
                  </div>
                  <div className="editAds-container-form-area-right">
                    <div className="editAds-container-form-area-right-input">
                        <select 
                           name="category" 
                           id="category"
                           disabled={disabled}
                           onChange={e=>setCategory(e.target.value)}
                           required
                        > 
                        <option value="" id="cat" >Escolha uma categoria</option>
                        {categories && categories.map((i,k)=>
                           <option key={k} value={i._id}>{i.name}</option>
                        )}
                        </select>
                     </div> 
                  </div>
                  
               </label>
               <label htmlFor=""className="editAds-container-form-area">
                  <div className="editAds-container-form-area-left">
                     <div className="editAds-container-form-area-left-title">Preço</div>
                  </div>
                  <div className="editAds-container-form-area-right">
                     <div className="editAds-container-form-area-right-input">
                           <input
                              placeholder="Digite o preço do produto" 
                              type="text" 
                              value={price} 
                              onChange={e=>handleChange(e.currentTarget.value)}
                              disabled={disabled || priceNegotiable}
                           />
                     </div>
                  </div>
                  
               </label>

               <label htmlFor=""className="editAds-container-form-area">
                  <div className="editAds-container-form-area-left">
                     <div className="editAds-container-form-area-left-title">Preço Negociável </div>
                  </div>
                  <div className="editAds-container-form-area-right">
                     <div className="editAds-container-form-area-right-input-checkbox">
                        <input 
                              type="checkbox"  
                              disabled={disabled}
                              checked={priceNegotiable}
                              onChange={e=> setPriceNegotiable(!priceNegotiable)} 
                           />
                     </div>
                  </div>
                  
               </label>
               
               <label htmlFor="checkbox"className="editAds-container-form-area">
                  
                     <div className="editAds-container-form-area-left">
                        <div className="editAds-container-form-area-left-title">Descrição</div>
                     </div>
                     <div className="editAds-container-form-area-right">
                        <div className="editAds-container-form-area-right-input-textarea">
                           <textarea 
                              name="desc" 
                              id="desc"
                              disabled={disabled}
                              value={desc}
                              onChange={e=>setDesc(e.target.value)}
                           >
                           </textarea>
                        </div>
                     </div>
                     
                 
                  
               </label>

               <label htmlFor="checkbox" className="editAds-container-form-area">
                  
                     <div className="editAds-container-form-area-left">
                        <div className="editAds-container-form-area-left-title">Adicionar Imagens</div>
                     </div>
                     <div className="editAds-container-form-area-right">
                        <div className="editAds-container-form-area-right-input-file">
                           <input type="file" 
                              disabled={disabled}
                              ref={fileField}
                              multiple
                           />
                        </div>
                     </div>
                     
                 
                  
               </label>

               <label htmlFor=""className="editAds-container-form-area">
                  <div className="form-title"></div>
                  <div className="editAds-container-form-area-input">
                     <button 
                        className="editAds-container-form-area-input-submit-button"
                        type="submit" 
                        disabled={disabled}> 
                        Editar Anúncio
                     </button>
                     <button 
                        className="editAds-container-form-area-input-close-button" 
                        onClick={closeModal}>
                        Fechar
                     </button>
                  </div>
               </label>
            </form>
            
         </div>
     
   </Modal>
 </div>

  )
}

