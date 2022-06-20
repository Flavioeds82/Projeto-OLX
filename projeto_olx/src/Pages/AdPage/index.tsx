import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { Fake } from "../../Components/Fake";
import { Api } from "../../Helpers/Api";
import { Ad } from "../../Types/Types";
import 'react-slideshow-image/dist/styles.css'
import './AdPage.css';


export function AdPage(){

   const {id} = useParams();

   const [loading, setLoading] = useState<boolean>(true);
   const [adInfo, setAdInfo] = useState<any>({});
   const [date, setDate] =useState<string>('');

   useEffect(()=>{
      const getAdInfo = async(id:string) =>{
      const json = await Api.getAd(id);
      console.log(json)
      setAdInfo(json);
      setDate(formatDate(json.dateCreate))
      setLoading(false);
      }
      if(id){getAdInfo(id)}
      
   },[]);

   function formatDate(date:Date){
      let newDate = new Date(date);
      let monthsList =[
         'Janeiro',
         'Fevereiro',
         'Março',
         'Abril',
         'Maio',
         'Junho',
         'Julho',
         'Agosto',
         'Setembro',
         'Outubro',
         'Novembro',
         'Dezembro'
      ];
      let day = newDate.getDay();
      let month = newDate.getMonth();
      let year = newDate.getFullYear();

      return `${day} de ${monthsList[month]} de ${year} `
   }

   return(
      <div className="AdPage-container">
         <div className="AdPage-container-area">
            <div className="AdPage-container-area-left-side">
               <div className="AdPage-container-area-left-side-box">
                  <div className="AdPage-container-area-left-side-box-image">
                     {loading && <Fake/>}
                     {adInfo.images &&
                        <Slide>
                           {adInfo.images.map((img:string, k:number)=>
                              <div key={k} className="AdPage-container-area-left-side-box-image-slide">
                                 <img src={img} alt="" />
                              </div>
                           )}
                        </Slide>
                     }
                  </div>
                  <div className="AdPage-container-area-left-side-box-info">
                     <div className="AdPage-container-area-left-side-box-info-name">
                        {loading && <Fake/>}
                        {adInfo.title && <h2>{adInfo.title}</h2>  }
                     </div>
                     <div className="AdPage-container-area-left-side-box-info-desc">
                        {loading && <Fake/>}
                        {adInfo.description}
                        <div id="date">
                           {date && <p>Criado em {date}</p> }
                        </div>
                        <hr />
                        <div className="sub-desc">
                           <div id='views'>
                              {adInfo.views && <p> Visualizações : {adInfo.views} usuários</p>}
                           </div>
                        </div>
                     </div>
                     
                  </div>
               </div>
            </div>
            <div className="AdPage-container-area-right-side">
               <div className="AdPage-container-area-right-side-box">
                  {loading && <Fake />}
                     
                  
               </div>
               <div className="AdPage-container-area-right-side-box">
                  {loading && <Fake/>}
                     
                  
               </div>
               
            </div>
         </div>
              
      </div>
   )
      
   
}