import './footer.css';
import github from '../../assets/github.png';
import rss from '../../assets/rss-logo-unit.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-box">
        <div className="footer-box-item">
          <a href="https://github.com/juliachruszczowaH/rslang"><img className="footer-logo" src={ github } alt="github-logo" /></a>
        </div>
        <div className="footer-box-item">
           <p className="item-styles"> RSS Q3-2021</p>
        </div>
        <div className="footer-box-item">
          <a href="https://rs.school/js/"><img className="footer-logo" src={ rss } alt="rss-logo" /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
