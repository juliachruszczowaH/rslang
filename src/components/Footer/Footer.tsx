import './footer.css';
import github from '../../assets/github.png';
import rss from '../../assets/rss-logo-unit.svg';
import { Label, Menu, Image } from 'semantic-ui-react';

function Footer() {
  return (
    <Menu  fluid widths={3}>
      <Menu.Item>
        <Label
          as="a"
          href="https://github.com/juliachruszczowaH"
          target="_blank"
        >
          <Image
            avatar
            spaced="right"
            src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
          />
          juliachruszczowaH
        </Label>

        <Label as="a" href="https://github.com/nnadeysha" target="_blank">
          <Image
            avatar
            spaced="right"
            src="https://react.semantic-ui.com/images/avatar/small/stevie.jpg"
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

      <Menu.Item>
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
