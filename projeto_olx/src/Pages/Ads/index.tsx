import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Api } from "../../Helpers/Api";
import { PageArea } from "./Ads";
import { Ad, Category, State } from "../../types/Types";
import { AdItem } from "../../Components/AdItem";
import { PageContainer } from "../../Components/Template";


export function Ads(){

   function useQueryString(){
      return new URLSearchParams(useLocation().search);
   }
   function translate(qs:string | null){
      switch(qs){
         case 'clothes':
            return 'Roupas';
            break;
         case 'baby':
            return 'Bebês';
            break;
         case 'cars':
            return 'Carros';
            break;
         case 'sports':
            return 'Esportes';
            break;
      }
   }
   const query = useQueryString();
   const [q, setQ] = useState<any>(query.get('query') != null ? query.get('query'):'');
   const [cat, setCat] = useState<any>(query.get('cat') != null ? translate(query.get('cat')) :'');
   const [state, setState] = useState<any>(query.get('states') != null ? query.get('states'):'');
   const [categories, setCategories] = useState<Category[]>([]);
   const [stateList, setStateList] = useState<State[]>([]);
   const [adList, setAdList] = useState<Ad[]>([]);


   useEffect(()=>{
      async function getStates(){
         const slist = await Api.getStates();
         setStateList(slist);
      }
      getStates();
   }, []);

   useEffect(()=>{
      async function getCategories(){
         const cat = await Api.getCategory();
         setCategories(cat);
      }
      getCategories();
   }, []);

   useEffect(()=>{
      async function getRecentAds(){
         const json = await Api.getAds({
            sort: RTCSessionDescription,
            limit: 8
         });
         setAdList(json.ads);
      }
      getRecentAds();
   }, [])

   return(
      
      <PageContainer>
         <PageArea>
            <div className="left-side">
               <form action="" method="get">

                  <input 
                     type="text" 
                     value={q} 
                     name="q" 
                     placeholder="O que você procura?" 
                     className="input-filter"
                     onChange={e=>setQ(e.target.value)}
                  />

                  <div className="filterName">Estado:</div>
                  <select name="state" className="state" value={state} onChange={e=>setState(e.target.value)}>
                     <option >Selecione um estado</option>
                     {stateList.map((i,k)=>
                        <option key={k} value={i.name}>{i.name}</option>
                     )}
                  </select>

                  <div className="filterName">Categoria:</div>
                   <select name="cat" className="cat" value={cat} onChange={e=>setCat(e.target.value)}>
                      <option value="">Selecione uma categoria</option>
                        {categories.map((i,k)=>
                           <option key={k} >
                              {i.name}
                           </option>
                        )}
                    </select> 
               </form>
            </div>
            <div className="right-side">
               ***right***
            </div>
         </PageArea>
      </PageContainer>
   )
}