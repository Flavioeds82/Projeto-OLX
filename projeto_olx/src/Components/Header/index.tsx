import './style.css';
import { Link } from 'react-router-dom';
import { isLogged } from '../../Helpers/AuthHandler';

export function Header(){

  let logged = isLogged();
  return(
         <header className='header'>
            <div className="container">
                <div className="logo">
                  <Link to="/" className='link-logo'>
                    <div className="logo-img"></div>
                    <div className="logo-text1">O</div>
                    <div className="logo-text2">L</div>
                    <div className="logo-text3">X</div>
                  </Link>
                </div>
                <nav>
                  <ul>
                    {logged &&
                      <>
                            <li>
                              <Link to='/my-account' className='link-menu'>Minha Conta</Link>
                            </li>
                            <li>
                              <Link to='/logout' className='link-menu'>Sair</Link>
                            </li>
                            <li>
                              <Link to='/' className='link-menu-button'>Postar um anúncio</Link>
                            </li>
                      </>
                    
                    }
                    {!logged &&
                      <>
                            <li>
                              <Link to='/signin' className='link-menu'>Login</Link>
                            </li>
                            <li>
                              <Link to='/signup' className='link-menu'>Cadastrar</Link>
                            </li>
                            <li>
                              <Link to='/signin' className='link-menu-button'>Postar um anúncio</Link>
                            </li>
                      </>
                    
                    }

                  </ul>
                </nav>
            </div>
         </header>
   )
}
