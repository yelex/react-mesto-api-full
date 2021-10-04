import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import logoPath from '../images/header-logo.svg';
import '../index.css';

function Header(props) {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <header className="header">
      <img src={ logoPath } alt="Логотип" className="header__logo" onClick={()=>{history.push('/')}}/>
      {props.isLoggedIn && pathname!=='/sign-in' && pathname!=='/sign-up' ?
        <>
          <p className="header__email">{ props.email }</p>
          <Link to="#" className="header__link header__link_darkened" 
          onClick={ props.onSignOut }>Выйти</Link>
        </>
        :
        <Link to={ pathname==='/sign-in'? '/sign-up' : '/sign-in'} className="header__link">
        { pathname==='/sign-in'? 'Регистрация' : 'Войти'}
        </Link>
      }
      
    </header>
  )
}

export default Header;