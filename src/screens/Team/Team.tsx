import './team.css';
import logo from '../../assets/alexboagreek.jpg';
import { Card, Grid, Icon, Image } from 'semantic-ui-react';


const TeamUnits = () => {
  return (
    <Grid centered stackable columns={2}>
      <Grid.Row centered columns={4}>
        <Grid.Column >
          <Card centered>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Julia</Card.Header>
              <Card.Meta>
                <span className="date">Team-member</span>
              </Card.Meta>
              <Card.Description>Julia is the team-leader</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a href="https://github.com/juliachruszczowaH" target="_blank" rel="noreferrer">
                <Icon name="github" />
                link to github
              </a>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card centered>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Nadya</Card.Header>
              <Card.Meta>
                <span className="date">Team-member</span>
              </Card.Meta>
              <Card.Description>
                Nadya is the best game-developer
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a href="https://github.com/nnadeysha" target="_blank" rel="noreferrer">
                <Icon name="github" />
                link to github
              </a>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card centered>
            <Image src={logo} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Aleksandr</Card.Header>
              <Card.Meta>
                <span className="date">Team-member</span>
              </Card.Meta>
              <Card.Description>
                Aleksandr is working in greek shop
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a href="https://github.com/alexboagreek/" target="_blank" rel="noreferrer">
                <Icon name="github" />
                link to github
              </a>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TeamUnits;
