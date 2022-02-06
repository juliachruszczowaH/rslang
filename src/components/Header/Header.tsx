import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header className='header'>
      <nav className="navbar">
        <Link to={'/home'} className="navbar-brand">
          RS Lang
        </Link>
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={'/book'} className="nav-link">
              BOOK
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/sprintgame'} className="nav-link">
              Sprint
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/audiocall'} className="nav-link">
              Audiocall
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/statistics'} className="nav-link">
              STATISTICS
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/team'} className="nav-link">
              TEAM
            </Link>
          </li>
        </div>
      </nav>
    </header>
  );
}

export default Header;
