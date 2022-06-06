import { Link } from "react-router-dom";
import './style.css';

export function NotFound(){
   return(
      <div className="container-404">
         <Link to={'/'} className='link'>Home</Link>
         <div className="page-404"></div>
      </div>
   )
}