import { Link, useLocation } from 'react-router-dom';
import './header.css';
import { Menu, Button } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { HEADER_LINKS } from '../../constants/linksDataConstants';
import { isAuthenticated } from '../../services/AuthService';
import { LogoutModal } from '../LogoutModal';
import { LoginModal } from '../LoginModal';

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
    <Menu secondary>
      <Menu.Item>
        <img alt="logo" src='rs-lang-logo.jpg' />
      </Menu.Item>
      {links.map((item) => (
        <Menu.Item as={Link} to={`/${item.keyword}`}
          active={location.pathname.includes(item.keyword)}
          onClick={handleItemClick}
          key={item.keyword}
        >
          {item.title}
        </Menu.Item>
      ))}
      <Menu.Menu position='right'>
        {auth ? LogoutModal(<Button color={'orange'} > Logout</Button>) : LoginModal(<Button color={'green'} > Login</Button>)}
      </Menu.Menu>

    </Menu >
  );
}

export default Header;
