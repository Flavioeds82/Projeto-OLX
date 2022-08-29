import './style.css';
import { Link } from 'react-router-dom';
import { isLogged, Logout } from '../../Helpers/AuthHandler';

export function Header(){
  let logged = isLogged()

  function logout(){
    Logout();
    window.location.href = '/';
  }
  
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
                              <Link to='/user' className='link-menu'>Minha Conta</Link>
                            </li>
                            <li>
                              <button className='link-menu-sair' onClick={logout}>Sair</button>
                            </li>
                            <li>
                              <Link to='/post-an-ad' className='link-menu-button'>Postar um anúncio</Link>
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
