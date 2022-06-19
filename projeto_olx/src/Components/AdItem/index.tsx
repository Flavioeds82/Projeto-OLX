import { Link } from "react-router-dom";
import "./AdItem.css";



export function AdItem(props:any){
   return(
      <Link to={`/ad/${props.data.id}`} className="adItem-container">
         <div className="adItem-container-item-img">
            <img src={props.data.image} alt=""/>
         </div>
         <div className="adItem-container-item-name">
           {props.data.title}
         </div>
         <div className="adItem-container-item-price">
            {`R$ ${props.data.price.toFixed(2)}`}
         </div>
      </Link>
   )
   
}