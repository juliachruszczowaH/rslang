import { Link, useLocation } from 'react-router-dom';
import { Menu, Button, Image } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { HEADER_LINKS } from '../../constants/linksDataConstants';
import { isAuthenticated } from '../../services/AuthService';
import { LogoutModal } from '../LogoutModal';
import { LoginModal } from '../LoginModal';
import logo from '../../assets/rs-lang-logo.jpg';
import style from './header.module.css';
const initialProps = {
  name: 'home',
};

function Header() {
  const [, setState] = useState(initialProps);
  const location = useLocation();
  const [auth, setAuth] = useState(isAuthenticated());

  const links = HEADER_LINKS.filter((item) => { return auth ? item : item.keyword !== 'statistics'; });

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>) => {
    const targetName = e.currentTarget.getAttribute('href')?.replace('/', '');
    if (targetName) {
      setState({ name: targetName });
    }
  };

  useEffect(() => {
    console.log(auth);
    setAuth(isAuthenticated());

  }, [auth]);

  return (
    <Menu className={style.header}>
      <Menu.Item header >
        <Image alt="logo" src={logo} avatar/>
      </Menu.Item>
      {links.map((item) => (
        <Menu.Item className={style.header__item} as={Link} to={`/${item.keyword}`}
          active={location.pathname.includes(item.keyword)}
          onClick={handleItemClick}
          key={item.keyword}
        >
          {item.title}
        </Menu.Item>
      ))}
      <Menu.Menu position='right'>
        {auth ? LogoutModal(<Button color='orange' circular inverted size='small'> Logout</Button>) : LoginModal(<Button color={'green'} circular inverted size='small'> Login</Button>)}
      </Menu.Menu>

    </Menu >
  );
}

export default Header;
