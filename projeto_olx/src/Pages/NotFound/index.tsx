import { Link } from "react-router-dom";
import './style-NotFound.css';

export function NotFound(){
   return(
      <div className="container-404">
         <Link to={'/'} className='link'>  Voltar para Home </Link>
         <div className="page-404"></div>
      </div>
   )
}