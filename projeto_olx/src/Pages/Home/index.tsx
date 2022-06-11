import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Api } from "../../Helpers/Api";
import './home.css';
import baby from '../../images/baby.svg';
import car from '../../images/carro.png';
import roupa from '../../images/roupa.svg';
import eletro from '../../images/eletronico.svg'

export function Home(){

   const [categories, setCategories] = useState<string[]>([]);

   useEffect(()=>{
      async function getCategories(){
         const cat = await Api.getCategory();
         // setCategories(cat);// -------------------  aguardando API  ---------//
      }
   })

   return(
      <div className="home-container">
         <div className="search-area">
            <div className="search-box">
               <form action="/ads" method="get" className="search-form">
                  <input type="text" name="query" placeholder=" O que você procura ?" />
                  <select name="states" id="states" >
                     <option value="RJ">Rio de Janeiro</option>
                     <option value="MG">Minas Gerais</option>
                     <option value="SP">São Paulo</option>
                     <option value="ES">Espírito Santo</option>
                  </select>
                  <button type="submit">Pesquisar</button>
               </form>
            </div>
            <div className="category-list">
               <div className="cat-area">
                  <Link className="category-item" to={`/ads?cat`}>
                     <img src={baby} alt="" />
                     <div className="text-category">Bebês</div>
                  </Link>
               </div>
               <div className="cat-area">
                  <Link className="category-item" to={`/ads?cat`}>
                     <img src={car} alt="" />
                     <div className="text-category">Carro</div>
                  </Link>
               </div>
               <div className="cat-area">
                  <Link className="category-item" to={`/ads?cat`} >
                     <img src={roupa} alt="" />
                     <div className="text-category">Roupa</div>
                  </Link>
               </div>
               <div className="cat-area">
                  <Link className="category-item" to={`/ads?cat`}>
                     <img src={eletro} alt="" />
                     <div className="text-category">Eletrônico</div>
                  
                  </Link>
               </div>
              
            </div>
         </div>
         
      </div>
   )
}