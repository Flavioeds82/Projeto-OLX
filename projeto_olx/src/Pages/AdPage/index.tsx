import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { Fake } from "../../Components/Fake";
import { Api } from "../../Helpers/Api";
import { Ad } from "../../types/Types";
import 'react-slideshow-image/dist/styles.css'
import './AdPage.css';
import { AdItem } from "../../Components/AdItem";


export function AdPage(){

   const {id} = useParams();

   const [loading, setLoading] = useState<boolean>(true);
   const [adInfo, setAdInfo] = useState<any>({});
   const [adOthers, setAdOthers] = useState<Ad[]>([]);
   const [date, setDate] =useState<string>('');
   const [ userId, setUserId] = useState<string>('');

   useEffect(()=>{
      const getAdInfo = async(id:string) =>{
      const json = await Api.getAd(id);
      setAdInfo(json);
      setDate(formatDate(json.dateCreate))
      setLoading(false);
      document.documentElement.scrollTop ;
      }
      
      if(id){getAdInfo(id)}
      },[id]);

   useEffect(()=>{
      async function getOthersAds(){
         const json = await Api.getAds({
            sort: RTCSessionDescription,
            limit: 8
         });
         setAdOthers(json.ads);
      }
      getOthersAds();
   }, [])
   

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
          {adInfo.category &&
            <div className="AdPage-container-breadChumb">
               Você está aqui:
                  <Link to={"/"} className="AdPage-container-breadChumb-link">Home</Link>
                  /
                  <Link to={`/ads?state=${adInfo.stateName}`} className="AdPage-container-breadChumb-link">{adInfo.stateName}</Link>
                  /
                  <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`} className="AdPage-container-breadChumb-link">{adInfo.category.name}</Link>
                  /
                  <Link to={"#"} className="AdPage-container-breadChumb-link">{adInfo.title}</Link> 
            </div>
          }
         <div className="AdPage-container-area">

 {/* ------------------- LEFT-SIDE --------------  */}

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
                        
                        <hr />
                        <div className="sub-desc">
                           <div id='views'>
                              {adInfo.views && <p> Visualizações : {adInfo.views}</p>}
                                 
                           </div>
                        </div>
                     </div>
                     
                  </div>
               </div>
            </div>

 {/* ------------------- RIGHT-SIDE --------------  */}

            <div className="AdPage-container-area-right-side">
               <div className="AdPage-container-area-right-side-box">
                  {loading && <Fake />}
                  {adInfo.priceNegotiable && "Preço Negociável"}
                  {!adInfo.priceNegotiable && adInfo.price && 
                     <div className="AdPage-container-area-right-side-box-price">
                        Preço: <span>R$ {(adInfo.price).toFixed(2)}</span>
                     </div>
                  }   
               </div>
               {adInfo.userInfo &&
                  <div className="AdPage-container-area-right-side-contact">
                     <a 
                        href={`mailto:${adInfo.userInfo.email}`} 
                        target="_blank" 
                        className="right-side-contact-button"
                     >
                        Fale com o vendedor
                     </a>
                     <div className="AdPage-container-area-right-side-contact-box">
                        {loading && <Fake/>}
                        <span>Anunciante: <strong> {adInfo.userInfo.name}</strong></span><br />
                        <span>Email: <strong>{adInfo.userInfo.email}</strong></span><br />
                        <span>Estado: <strong>{adInfo.stateName}</strong></span>
                        <div id="date">
                           {date && <p>Criado em {date}</p> }
                        </div>
                     </div>
                  </div>
               }
            </div>

         </div>
           {/* ------------------- OTHERS --------------  */}
            {adOthers &&
               <>
                  <div className="AdPage-container-area-others">
                     <h2>Outras ofertas do vendedor</h2>
                     <div className="AdPage-container-area-others-list">
                        {adOthers.map((i:any,k:number)=>
                           <AdItem key={k} data={i} />
                        )}
                     </div>
                  </div>
                  
               </>
            }
               
      </div>
   )
      
   
}