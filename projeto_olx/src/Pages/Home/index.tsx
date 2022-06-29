import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Api } from "../../Helpers/Api";
import './home.css';
import baby from '../../images/baby.svg';
import car from '../../images/carro.png';
import roupa from '../../images/roupa.svg';
import eletro from '../../images/eletronico.svg'
import { Ad, Category, State } from "../../types/Types";
import { AdItem } from "../../Components/AdItem";


export function Home(){

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
      <div className="home-container">
         <div className="search-area">
            <div className="search-box">
               <form action="/ads" method="get" className="search-form">
                  <input type="text" name="query" placeholder=" O que você procura ?" />
                  <select name="states" className="search-states" >
                  <option ></option>
                  {
                     stateList.map((i,k)=>
                        <option key={k} value={i.name}>{i.name}</option>
                     )
                  }
                  </select>
                  <button type="submit" className="search-button">Pesquisar</button>
               </form>
            </div>
            <div className="category-list">
               {
                  categories.map((i,k)=>
                     <Link  key={k} className="category-item" to={`/ads?cat=${i.slug}`}>
                        <img src={i.img} alt="" />
                        <div className="text-category">{i.name}</div>
                     </Link>
                  
               )}
                  
            </div>
         </div>
         <div className="ad-container">
            <h2 id="Ad-title">Anúncios Recentes</h2>
            <div className="ad-list">
               {adList.map((i,k)=>
                  <AdItem key={k} data={i} />
               )}
            </div>
            <Link to="/ads" className="ad-container-link">Ver todos</Link>
            <hr />
            <div className="ad-container-text">
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum consectetur accusantium hic vel, ipsum alias aliquid repellendus dolorem eum vitae molestiae ad reiciendis impedit labore temporibus quos, maiores aut quia minus minima perferendis debitis ratione quam autem. 
            </div>
         </div>
      </div>
   )
}