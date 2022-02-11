import { Link, useLocation } from 'react-router-dom';
import './header.css';
import { Menu, Dropdown } from 'semantic-ui-react';
import React, { useState } from 'react';
import { HEADER_LINKS, HEADER_LOGIN_LINKS } from '../../constants/linksDataConstants';

const initialProps = {
  name: 'home',
};

function Header() {
  const [state, setState] = useState(initialProps);
  const location = useLocation();

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>) => {
    const targetName = e.currentTarget.getAttribute('href')?.replace('/', '');
    if (targetName) {
      setState({ name: targetName });
    }
  };

  return (
    <Menu stackable secondary>
      <Menu.Item>
        <img alt="logo" src='rs-lang-logo.jpg' />
      </Menu.Item>
      {HEADER_LINKS.map((item) => (
        <Menu.Item as={Link} to={`/${item.keyword}`}
          active={location.pathname.includes(item.keyword)}
          onClick={handleItemClick}
          key={item.keyword}
        >
          {item.title}
        </Menu.Item>
      ))}
      <Menu.Menu position='right'>
        <Dropdown item text='Login'>
          <Dropdown.Menu>
            {HEADER_LOGIN_LINKS.map((item) => (
              <Dropdown.Item as={Link} to={`/${item.keyword}`}
                selected={location.pathname.includes(item.keyword)}
                onClick={handleItemClick}
                key={item.keyword}
              >
                {item.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
