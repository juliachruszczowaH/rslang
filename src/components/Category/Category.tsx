import React, { useEffect, useState, MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Card, Divider, Icon, Pagination, Popup, Image, Segment, Loader } from 'semantic-ui-react';
import { CATEGOTY_LINKS } from '../../constants/linksDataConstants';
import { IWordData } from '../../models/WordModel';
import { API_URL } from '../../services/AppService';
import { getCurrentToken, getCurrentUserId, isAuthenticated } from '../../services/AuthService';
import { getHardWords, getUserAggregatedWords, setWordToHard } from '../../services/UserWordsService';
import { getWords } from '../../services/WordsService';
import { play } from '../../utils/utils';

type State = {
  words: IWordData[];
};
const initialState: State = {
  words: [],
};

export const Category: React.FunctionComponent = () => {
  const [words, setWords] = useState(initialState);
  const [updated, setUpdated] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const { groupId, pageId } = useParams();
  const [group, setGroup] = useState(groupId ? +groupId : 0);
  const [page, setPage] = useState(pageId ? +pageId : 0);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(`PAGINATION: group: ${group}; page: ${page}`);
  const id = getCurrentUserId();
  const token = getCurrentToken();
  const isDictionary = location.pathname === '/book/dictionary';

  const color = CATEGOTY_LINKS.find(i => i.id === group)?.color;

  useEffect(() => {
    let isMounted = true;
    if (id && token) {
      if (isDictionary) {
        if (updated) {
          getHardWords(id, token).then(
            response => {
              if (response) {
                console.log('response');
                console.log(response[0]);
                if (isMounted) setWords({ words: response[0].paginatedResults });
                setUpdated(false);
              }
            },
            (error: any) => {
              const content = (error.response && error.response.data) || error.message || error.toString();
              console.log(content);
            }
          );
        }
      } else {
        if (updated) {
          getUserAggregatedWords(id, token, group, page).then(
            response => {
              if (response) {
                console.log('response');
                console.log(response[0]);
                if (isMounted) setWords({ words: response[0].paginatedResults });
                setUpdated(false);
              }
            },
            (error: any) => {
              const content = (error.response && error.response.data) || error.message || error.toString();
              console.log(content);
            }
          );
        }
      }
    } else {
      if (updated) {
        getWords(group, page).then(
          response => {
            if (response) {
              console.log(response);
              if (isMounted) setWords({ words: response });
              setUpdated(false);
            }
          },
          (error: any) => {
            const content = (error.response && error.response.data) || error.message || error.toString();
            console.log(content);
          }
        );
      }
    }

    return () => {
      isMounted = false;
    };
  }, [group, page, token, id, isDictionary, updated]);

  useEffect(() => {
    if (groupId && pageId) {
      setGroup(+groupId);
      setPage(+pageId);
      setActivePage(group === +groupId ? +pageId + 1 : 0);
    } else {
      setWords(initialState);
      setGroup(0);
      setPage(0);
    }
  }, [groupId, pageId, group]);

  const onChange = () => {
    setPage(pageId ? +pageId : 0);
    setGroup(groupId ? +groupId : 0);
    setUpdated(true);
  };

  const onItemClick = (e: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const clickedNavElemValue = Number((e.target as HTMLElement).getAttribute('value'));
    console.log(clickedNavElemValue);
    setActivePage(clickedNavElemValue);
    setPage(clickedNavElemValue - 1);
    navigate(`/book/${group}/${clickedNavElemValue - 1}`);
  };

  console.log('Dictionary => ' + isDictionary);

  const handleHardClick = (wordId: string | undefined) => {
    if (isDictionary) {
      console.log(wordId);
      if (id && token) {
        console.log(wordId);
        if (wordId) setWordToHard(id, token, wordId, false);
        setUpdated(true);
      }
    } else {
      if (id && token) {
        console.log(wordId);
        if (wordId) setWordToHard(id, token, wordId);
        setUpdated(true);
      }
    }
    console.log('HARD: ');
  };

  const handleKnownClick = () => {
    console.log('KNOWN: ');
    setUpdated(true);
  };

  return (
    <div>
      {isDictionary ? null : (
        <Pagination
          firstItem={null}
          lastItem={null}
          activePage={activePage}
          onPageChange={onChange}
          onClick={onItemClick}
          pointing
          secondary
          totalPages={30}
        />
      )}
      <Divider key={Math.floor(Math.random() * (0 - 10001)) + 0} />
      {words.words.length > 0 ? (
        <Card.Group stackable centered style={{ height: '70vh', overflowY: 'scroll' }}>
          {words.words &&
            words.words.map((word: IWordData, index: number) => (
              <Card key={`${index}-card`}>
                <Card.Content>
                  <div>
                    <Image src={API_URL + word.image} size="small" />
                    <Segment raised style={{ backgroundColor: color }}>
                      <Card.Header as={'h3'} textAlign="left">
                        <Popup
                          content="Click to listen"
                          trigger={
                            <Button
                              circular
                              content={<Icon name="headphones" circular position="center" />}
                              onClick={() => play([API_URL + word.audio, API_URL + word.audioMeaning, API_URL + word.audioExample])}
                            ></Button>
                          }
                        />
                        {word.word}{' '}
                        <Card.Meta textAlign="center">
                          {' '}
                          <span className="transcription">{word.transcription}</span>
                        </Card.Meta>
                      </Card.Header>
                    </Segment>
                    <Card.Header as={'h3'}>{word.wordTranslate}</Card.Header>
                    <Divider />
                  </div>
                  <div>
                    <Card.Description textAlign="left">
                      <p>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: word.textMeaning ? word.textMeaning : '',
                          }}
                        ></span>
                        <br />
                        <span>{word.textMeaningTranslate}</span>
                      </p>

                      <p>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: word.textExample ? word.textExample : '',
                          }}
                        ></span>
                        <br />
                        <span style={{}}>{word.textExampleTranslate}</span>
                      </p>
                    </Card.Description>
                    <Divider />
                    {isAuthenticated() ? (
                      <Card.Content extra>
                        {word.userWord?.difficulty === 'hard' ? <Icon color="red" name={'eye'} /> : null}
                        <Button onClick={() => handleHardClick(word._id)} color={updated ? 'red' : 'green'} key={word._id}>
                          <Icon name={isDictionary ? 'eye slash' : 'eye'} />
                        </Button>
                        <Button onClick={handleKnownClick}>
                          <Icon name="check circle outline" />
                        </Button>
                      </Card.Content>
                    ) : null}
                  </div>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      ) : (
        <Loader active content="Loading" />
      )}
    </div>
  );
};
