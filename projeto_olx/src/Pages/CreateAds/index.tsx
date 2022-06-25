import { useState, useEffect, FormEvent, useRef, useCallback } from "react";
import { Api } from "../../Helpers/Api";
import { Login } from "../../Helpers/AuthHandler";
import { Category } from "../../types/Types";
import "./CreateAds.css";



export function CreateAds(){
  
   //---------------- CONTANTS ---------------//
      // Constants used for form control //
      

      const fileField = useRef<any>();
      const [element, setElement] = useState<any>();
      const [title, setTitle] = useState<string>('');
      const [category, setCategory] = useState<string>('');
      const [categories, setCategories] = useState<Category[]>([]);
      const [price, setPrice] = useState<string>('');
      const [priceNegotiable, setPriceNegotiable] = useState<boolean>(false);
      const [desc, setDesc] = useState<string>('')
      const [disabled, setDisabled]= useState<boolean>(false);
      const [error, setError] = useState<string>('');
      const ref = useRef(null);
   
      //---------------- USE EFFECTS ---------------//

      
      const handleChange = useCallback((e:any)=>{
         let digit = e;
         digit = digit.replace(/\D/g, "");
         digit = digit.replace(/(\d)(\d{2})$/, "$1,$2");
         digit = digit.replace(/(?=(\d{3})+(\D))\B/g, ".");
         console.log(digit)
         setPrice(digit);
      }, [price]);


       useEffect(()=>{
         const getCategories = async()=>{
            const cats = await Api.getCategory();
            setCategories(cats)
         }
         getCategories();
      }, [])

      
   
      // useEffect(()=>{
      //    const getStates = async()=>{
      //       const slist = await Api.getStates();
      //       setStateList(slist)
      //    }
      //    getStates();
      // }, [])
      //---------------- FUNCTIONS ---------------//
      

       
         // Functions used for form control //
         
      async function handleSubmit(e: FormEvent<HTMLFormElement>){
         e.preventDefault();
         setDisabled(true);
         setError('pooiii');
         
   
         try {
            if(!title.trim()){throw 'Preencha o campo Título'};
            if(!category){throw 'Escolha uma categoria'};
            const fd = new FormData();
            
    
         } catch (error:any) {
            setError(error);
            setDisabled(false);
           
         }
      }
      
      return(
         <div className="createads-container">
            
            <form action="" className="createads-container-form" >
               {error &&
                 <div className="error">{error}</div> 
               }
               <div className="createads-container-form-title">
                  <h1>Criar Anúncio</h1>
               </div>

               <label htmlFor=""className="createads-container-form-area">
                  <div className="createads-container-form-area-left">
                     <div className="createads-container-form-area-left-title">Título</div>
                  </div>
                  <div className="createads-container-form-area-right">
                    <div className="createads-container-form-area-right-input">
                        <input 
                           placeholder="Título do Anúncio"
                           type="text"  
                           disabled={disabled}
                           value={title}
                           onChange={e=> setTitle(e.target.value)} 
                           required
                        />
                     </div> 
                  </div>
               </label>

               <label htmlFor=""className="createads-container-form-area">
                  <div className="createads-container-form-area-left">
                     <div className="createads-container-form-area-left-title">Categoria</div>
                  </div>
                  <div className="createads-container-form-area-right">
                    <div className="createads-container-form-area-right-input">
                        <select 
                           name="category" 
                           id="category"
                           disabled={disabled}
                           onChange={e=>setCategory(e.target.value)}
                           required
                        > 
                        <option value="" id="cat" >Escolha um acategoria</option>
                        {categories && categories.map((i,k)=>
                           <option key={k} value={i._id}>{i.name}</option>
                        )}
                        </select>
                     </div> 
                  </div>
                  
               </label>
               <label htmlFor=""className="createads-container-form-area">
                  <div className="createads-container-form-area-left">
                     <div className="createads-container-form-area-left-title">Preço</div>
                  </div>
                  <div className="createads-container-form-area-right">
                     <div className="createads-container-form-area-right-input">
                           <input 
                              type="text" 
                              value={price} 
                              onChange={e=>handleChange(e.currentTarget.value)}
                              disabled={disabled || priceNegotiable}
                           />
                     </div>
                  </div>
                  
               </label>

               <label htmlFor=""className="createads-container-form-area">
                  <div className="createads-container-form-area-left">
                     <div className="createads-container-form-area-left-title">Preço Negociável </div>
                  </div>
                  <div className="createads-container-form-area-right">
                     <div className="createads-container-form-area-right-input-checkbox">
                        <input 
                              type="checkbox"  
                              disabled={disabled}
                              checked={priceNegotiable}
                              onChange={e=> setPriceNegotiable(!priceNegotiable)} 
                           />
                     </div>
                  </div>
                  
               </label>
               
               <label htmlFor="checkbox"className="createads-container-form-area">
                  
                     <div className="createads-container-form-area-left">
                        <div className="createads-container-form-area-left-title">Descrição</div>
                     </div>
                     <div className="createads-container-form-area-right">
                        <div className="createads-container-form-area-right-input-textarea">
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

               <label htmlFor="checkbox" className="createads-container-form-area">
                  
                     <div className="createads-container-form-area-left">
                        <div className="createads-container-form-area-left-title">Adicionar Imagens</div>
                     </div>
                     <div className="createads-container-form-area-right">
                        <div className="createads-container-form-area-right-input-file">
                           <input type="file" 
                              disabled={disabled}
                              ref={fileField}
                              multiple
                           />
                        </div>
                     </div>
                     
                 
                  
               </label>

               <label htmlFor=""className="createads-container-form-area">
                  <div className="form-title"></div>
                  <div className="createads-container-form-area-input">
                     <button 
                        className="createads-container-form-area-input-submit-button"
                        type="submit" 
                        disabled={disabled}> 
                        Adicionar Anúncio
                     </button>
                  </div>
               </label>
            </form>
            
         </div>
      )
}
