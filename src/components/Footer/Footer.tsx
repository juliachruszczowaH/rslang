import './footer.css';
import github from '../../assets/github.png';
import rss from '../../assets/rss-logo-unit.svg';
import { Label, Menu, Image } from 'semantic-ui-react';

function Footer() {
  return (
    <Menu secondary style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Menu.Item>
        <Label
          as="a"
          href="https://github.com/juliachruszczowaH"
          target="_blank"
        >
          <Image
            avatar
            spaced="right"
            src="https://react.semantic-ui.com/images/avatar/small/molly.png"
          />
          juliachruszczowaH
        </Label>

        <Label as="a" href="https://github.com/nnadeysha" target="_blank">
          <Image
            avatar
            spaced="right"
            src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
          />
          nnadeysha
        </Label>
        <Label as="a" href="https://github.com/alexboagreek/" target="_blank">
          <Image
            avatar
            spaced="right"
            src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
          />
          alexboagreek
        </Label>
      </Menu.Item>
      <Menu.Item> &copy; 2022</Menu.Item>

      <Menu.Item position='right'>
        <Image
          href="https://rs.school/js/"
          target="_blank"
          size="tiny"
          src={rss}
        />
      </Menu.Item>
    </Menu>
  );
}

export default Footer;
