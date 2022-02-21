import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Grid,
  Label,
  Image,
  Card,
  Transition,
  Embed,
  Container,
  Header,
  Rail,
  Sticky,
} from 'semantic-ui-react';
import book from '../../assets/book.png';
import dictionary from '../../assets/dictionary.png';
import game from '../../assets/game.png';
import stat from '../../assets/statistics.png';
import { isAuthenticated } from '../../services/AuthService';
import { LoginModal } from '../../components/LoginModal';
import style from './home.module.css';
const Home: React.FC = () => {
  const [auth, setAuth] = useState(isAuthenticated());
  const [visibility, setVisibility] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/home' || location.pathname === '/') {
      setVisibility(true);
    }
  }, [visibility, location.pathname]);

  useEffect(() => {
    setAuth(isAuthenticated());
  }, [auth]);

  return (
    <div>
      <Grid centered stackable relaxed>
        <Grid.Row>
          <Grid.Column width={6}>
            <Container className={style.home__text} fluid textAlign="center">
              <Header className={style.home__title} as="h1">RS Lang</Header>
              <p style={{ fontSize: '18px' }}>
                Learning English has never been so easy Memorizing English words
                can be fun and challenging. Play games, listen to pronunciation,
                improve your knowledge. With our app, learning is a joy.
              </p>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Transition
              visible={visibility}
              animation="fly down"
              duration="1000"
            >
              <Card className={style.home__card} style={{ padding: '15px' }} centered>
                <Image src={book} centered size="tiny" />
                <Card.Content>
                  <Label
                    as="a"
                    color="red"
                    ribbon
                    onClick={() => navigate('/book')}
                  >
                    Book
                  </Label>
                  <Card.Description>
                    The electronic textbook consists of six sections. Each
                    section has 30 pages of 20 words. The translation of the
                    word, the thematic image, as well as the pronunciation of
                    both the word separately and as part of the phrase are
                    presented.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Transition>
          </Grid.Column>
          <Grid.Column width={6}>
            <Transition
              visible={visibility}
              animation="fly left"
              duration="1000"
            >
              <Card className={style.home__card} centered style={{ padding: '15px' }}>
                <Image src={dictionary} centered size="tiny" />

                <Card.Content>
                  {!auth ? (
                    LoginModal(
                      <Label as="a" color="green" ribbon>
                        Dictionary
                      </Label>,
                    )
                  ) : (
                    <Label
                      as="a"
                      color="green"
                      ribbon
                      onClick={() => navigate('/book/dictionary')}
                    >
                      Dictionary
                    </Label>
                  )}
                  <Card.Description>
                    The dictionary contains lists of studied words, words that
                    do not need to be learned, as well as those that cause
                    difficulties. The dictionary reflects statistics for each
                    section and student progress.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Transition>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={6}>
            <Transition
              visible={visibility}
              animation="fly right"
              duration="1000"
            >
              <Card className={style.home__card} centered style={{ padding: '15px' }}>
                <Image src={game} centered size="tiny" />
                <Card.Content>
                  <Label
                    as="a"
                    color="blue"
                    ribbon
                    onClick={() => navigate('/sprintgame')}
                  >
                    Sprint
                  </Label>
                  <Card.Description>
                    <Label
                      as="a"
                      color="teal"
                      ribbon
                      onClick={() => navigate('/audiocall')}
                    >
                      Audiocall
                    </Label>
                    Learning English has never been so easy Memorizing English
                    words can be fun and challenging. Play games, listen to
                    pronunciation, improve your knowledge. With our app,
                    learning is a joy.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Transition>
          </Grid.Column>
          <Grid.Column width={6}>
            <Transition visible={visibility} animation="fly up" duration="1000">
              <Card className={style.home__card} centered style={{ padding: '15px' }}>
                <Image src={stat} centered size="tiny" />
                <Card.Content>
                  {!auth ? (
                    LoginModal(
                      <Label as="a" color="orange" ribbon>
                        Statistic
                      </Label>,
                    )
                  ) : (
                    <Label
                      as="a"
                      color="orange"
                      ribbon
                      onClick={() => navigate('/statistics')}
                    >
                      Statistic
                    </Label>
                  )}
                  <Card.Description>
                    All the progress of training can be viewed in statistics,
                    where data for the current day, as well as for the entire
                    training period, are presented. The information is presented
                    both in the form of a table and graphs, which is very
                    convenient..
                  </Card.Description>
                </Card.Content>
              </Card>
            </Transition>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <Transition visible={visibility} animation="fade" duration="2500">
              <Embed placeholder="/images/image-16by9.png" source="youtube" />
            </Transition>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
