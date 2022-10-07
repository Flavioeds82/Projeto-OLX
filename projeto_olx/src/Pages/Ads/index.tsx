import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Api } from "../../Helpers/Api";
import { PageArea } from "./Ads";
import { Ad, Category, State } from "../../types/Types";
import { AdItem } from "../../Components/AdItem";
import { PageContainer } from "../../Components/Template";
import { AnyStyledComponent } from "styled-components";
let timer:number;


export function Ads(){

   
   const query = useQueryString();
   const [q, setQ] = useState<any>(query.get('query') != null ? query.get('query'):'');
   const [cat, setCat] = useState<any>(query.get('cat') != null ? query.get('cat') :'');
   const [state, setState] = useState<any>(query.get('states') != null ? query.get('states'):'');
   const [categories, setCategories] = useState<Category[]>([]);
   const [stateList, setStateList] = useState<State[]>([]);
   const [adList, setAdList] = useState<Ad[]>([]);
   const [adsTotal, setAdsTotal] = useState<number>(0);
   const [pageCount, setPageCount] = useState<number>(0);
   const [error, setError] = useState<string>('');
   const [resOpacity, setResOpacity] =  useState<number>(1);
   const [loading, setLoading] = useState<boolean>(true);
   const [ currentPage, setCurrentPage] = useState<number>(1);
   const [ limit, setLimit] = useState<number>(6);
   const nav = useNavigate();


//----------------------------- FUNÇÕES -----------------------------//

   function useQueryString(){
      return new URLSearchParams(useLocation().search);
   }
   function pages(arr:Array<any>, total:number){
      let lt = arr.slice(((currentPage-1)*limit), (currentPage*limit));
      return lt;
   }
  
   async function getAdList(){
      setError('');
      setLoading(true);
      const json = await Api.getAds({
         sort: 'desc',
         limit:0,
         q,
         cat,
         state,
      });
      setAdList(pages(json.ads, json.total));
      setAdsTotal(json.total);
      setLoading(false);
      if(json.ads.length === 0){setError('error')}
      setResOpacity(1);
   }
//-------------------------- useEffect ------------------------//

   useEffect(()=>{
      setResOpacity(0.3);
      getAdList();
   },[currentPage]);

   useEffect(() => {
      if(adList.length>0){
         setPageCount(Math.ceil(adsTotal / adList.length))
      }else{setPageCount(0)};
   }, [adsTotal]);


   useEffect(() => {
      let replace = [];
      if (q) {replace.push(`q=${q}`); }
      if (cat) {replace.push(`cat=${cat}`);}
      if (state) {replace.push(`state=${state}`);}
      nav(`/ads?${replace.join('&')}`, { replace: true });
      if(timer){clearTimeout(timer)};
      timer = setTimeout(getAdList, 1500);
      setResOpacity(0.3);
      setCurrentPage(1);
   }, [q, cat, state]);


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

   let pagination = []
   for(let i=1; i<=pageCount; i++){
      pagination.push(i);
   }
//------------------------- RETURN -------------------------------//
   return(
      
      <PageContainer>
         <PageArea>
            <div className="left-side">
               <form action="" method="get" >

                  <input 
                     type="text" 
                     value={q} 
                     name="q" 
                     placeholder="O que você procura?" 
                     className="input-filter"
                     onChange={e=>setQ(e.target.value)}
                  />

                  <div className="filterName">Estado:</div>
                  <select name="state" className="state"  onChange={e=>setState(e.target.value)}>
                     <option value="">Selecione um estado</option>
                     {stateList.map((i,k)=>
                        <option key={k} value={i.name}>{i.name}</option>
                     )}
                  </select>

                  <div className="filterName">Categoria:</div>
                   <select name="cat" className="cat"  onChange={e=>setCat(e.target.value)}>
                      <option value="">Selecione uma categoria</option>
                        {categories.map((i,k)=>
                           <option key={k} value={i.slug}>{i.name}</option>
                        )}
                    </select> 
                   
               </form>
            </div>
            <div className="right-side">
              
              {error &&
                  <h3 className="headline-error">Desculpe, não encontramos resultados para sua busca. </h3>
              }
              {!error && loading && adList.length === 0 &&
                  <>
                     <div className="loader"></div>
                     <h3>Carregando...</h3>
                  </>  
               }
               {!loading && !error &&
                  <>
                     <h2 className="headline">Resultados</h2>
                     <div className="right-side-list" style={{opacity:resOpacity}}>
                        {adList.map((i,k)=>
                           <AdItem key={k} data={i} />
                        )}
                     </div>
                     <div className="pagination">
                        {pagination.map((i,k)=>
                           <div  key={k} onClick={()=>setCurrentPage(i)} className={i===currentPage? "pagItem active":"pagItem"}>{i}</div>
                        )}
                     </div>
                  </>
               }
                 
              
              
            </div>
         </PageArea>
      </PageContainer>
   )
}