import './style.css';
import { Link } from 'react-router-dom';

export function Header(){
   return(
         <header className='header'>
            <div className="container">
                <div className="logo">
                  <Link to="/" className='link'>
                    <div className="logo-img"></div>
                    <div className="logo-text1">O</div>
                    <div className="logo-text2">L</div>
                    <div className="logo-text3">X</div>
                  </Link>
                </div>
            </div>
         </header>
   )
}
