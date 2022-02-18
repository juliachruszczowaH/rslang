import { render } from '@testing-library/react';
import React, { useEffect, useState, MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Divider,
  Pagination,
  Popup,
  Image,
  Segment,
  Loader,
  Label,
  Menu,
  Message,
  Icon,
  Progress,
  Sticky,
  Checkbox,
  Rail,
} from 'semantic-ui-react';
import { CATEGOTY_LINKS } from '../../constants/linksDataConstants';
import { IWordData } from '../../models/WordModel';
import { API_URL } from '../../services/AppService';
import { getCurrentToken, getCurrentUserId, isAuthenticated } from '../../services/AuthService';
import { createUpdateUserWordById, getHardWords, getPaginatedAllUserAggregatedWords } from '../../services/UserWordsService';
import { getWords } from '../../services/WordsService';
import { play } from '../../utils/utils';
import SprintGameField from '../Games/Sprint/SprintGameField';

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

  const color = isDictionary ? '#f4defc' : CATEGOTY_LINKS.find((i) => i.id === group)?.color;

  useEffect(() => {
    let isMounted = true;
    if (id && token) {
      if (isDictionary) {
        if (updated) {
          getHardWords(id, token).then(
            (response) => {
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
          getPaginatedAllUserAggregatedWords(id, token, group, page).then(
            (response) => {
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
          (response) => {
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
    setActivePage(clickedNavElemValue);
    setPage(clickedNavElemValue - 1);
    navigate(`/book/${group}/${clickedNavElemValue - 1}`);
  };

  const handleHardClick = (wordId: string | undefined) => {
    if (id && token && wordId) {
      createUpdateUserWordById(id, token, wordId, { difficulty: isDictionary ? 'normal' : 'hard', optional: { isKnown: false } }).then(() =>
        setUpdated(true)
      );
    }
  };

  const handleKnownClick = (wordId: string | undefined) => {
    if (id && token && wordId) {
      createUpdateUserWordById(id, token, wordId, { difficulty: 'normal', optional: { isKnown: true } }).then(() => setUpdated(true));
    }
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

      {isDictionary ? null : <Progress value="5" total="20" size="tiny" success={5 < 20} />}

      {words.words.length > 0 ? (
        <Card.Group centered style={{ overflowY: 'scroll' }}>
          {isDictionary ? null : (
            <Label attached="top right" basic size="medium" style={{ backgroundColor: color, border: 'none' }}>
              <Button color="blue" inverted onClick={() => navigate(`/sprintgame?group=${group}&page=${page}`)}>
                <Icon name="gamepad" /> Sprint
              </Button>
              <Button color="teal" inverted onClick={() => navigate(`/audiocall?group=${group}&page=${page}`)}>
                <Icon name="gamepad" /> AudioCall
              </Button>
            </Label>
          )}
          {words.words &&
            words.words.map((word: IWordData, index: number) => (
              <Card key={`${index}-card`}>
                <Card.Content>
                  <div>
                    <Image src={API_URL + word.image} size="medium" />
                    <Segment
                      raised
                      style={{
                        backgroundColor: color,
                        borderColor: word.userWord?.difficulty === 'hard' ? 'red' : word.userWord?.optional?.isKnown === true ? 'green' : 'none',
                      }}
                    >
                      <Card.Header as={'h3'} textAlign="left">
                        {word.userWord?.difficulty === 'hard' || word.userWord?.optional?.isKnown === true ? (
                          <Label
                            color={word.userWord?.difficulty === 'hard' ? 'red' : word.userWord?.optional?.isKnown === true ? 'green' : undefined}
                            ribbon="right"
                            size="mini"
                          >
                            {word.userWord?.difficulty === 'hard' ? 'hard' : word.userWord?.optional?.isKnown === true ? 'known' : undefined}
                          </Label>
                        ) : null}
                        <Popup
                          content="Click to listen"
                          trigger={
                            <Button
                              circular
                              inverted
                              color="blue"
                              icon="headphones"
                              onClick={() => play([API_URL + word.audio, API_URL + word.audioMeaning, API_URL + word.audioExample])}
                            />
                          }
                        />
                        {word.word}
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
                      <Card.Content extra style={{ maxHeight: '40px' }}>
                        <Popup
                          content="Click to mark word as Hard"
                          trigger={
                            <Button
                              circular
                              inverted
                              color="red"
                              icon={isDictionary ? 'trash alternate' : 'eye'}
                              onClick={() => handleHardClick(word._id)}
                              key={word._id}
                              loading={updated}
                              disabled={word.userWord?.difficulty === 'hard' && !isDictionary}
                            />
                          }
                        />
                        <Popup
                          content="Click to mark word as Known"
                          trigger={
                            <Button
                              circular
                              inverted
                              color="green"
                              icon="check circle outline"
                              loading={updated}
                              disabled={word.userWord?.optional?.isKnown}
                              onClick={() => handleKnownClick(word._id)}
                            />
                          }
                        />
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
