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
  Grid,
  GridColumn,
} from 'semantic-ui-react';
import { CATEGOTY_LINKS } from '../../constants/linksDataConstants';
import { WORDS_PER_PAGE } from '../../constants/wordsConstants';
import { IWordData } from '../../models/WordModel';
import { API_URL } from '../../services/AppService';
import { getCurrentToken, getCurrentUserId, isAuthenticated } from '../../services/AuthService';
import {
  createUpdateUserWordById,
  Difficulty,
  getHardWords,
  getPaginatedAllUserAggregatedWords,
  Known,
  UserOptionsFields,
} from '../../services/UserWordsService';
import { getWords } from '../../services/WordsService';
import { disabledBtn, play } from '../../utils/utils';
import SprintGameField from '../Games/Sprint/SprintGameField';


import style from './category.module.css';


type State = {
  words: IWordData[];
};
const initialState: State = {
  words: [],
};

export const Category: React.FunctionComponent = () => {
  const [words, setWords] = useState(initialState);
  const [updated, setUpdated] = useState(true);
  const [learned, setLearned] = useState(0);
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
    if (updated) {
      if (id && token) {
        if (isDictionary) {
          getHardWords().then(
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
        } else {
          getPaginatedAllUserAggregatedWords(group, page).then(
            (response) => {
              if (response) {
                console.log('response');
                console.log(response[0]);
                const markedWords = response[0].paginatedResults.filter(
                  (i) => i.userWord?.difficulty === Difficulty.Hard || i.userWord?.optional?.isKnown === Known.True
                );
                console.log(markedWords);
                if (isMounted) {
                  setLearned(markedWords.length);
                  setWords({ words: response[0].paginatedResults });
                }
                setUpdated(false);
              } else {
                setUpdated(true);
              }
            },
            (error: any) => {
              const content = (error.response && error.response.data) || error.message || error.toString();
              console.log(content);
            }
          );
        }
      } else {
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

      return () => {
        isMounted = false;
      };
    }
  }, [group, page, token, id, isDictionary, learned, updated]);

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
      createUpdateUserWordById(wordId, { difficulty: isDictionary ? Difficulty.Normal : Difficulty.Hard }).then(() => setUpdated(true));
    }
  };

  const handleKnownClick = (wordId: string | undefined) => {
    if (id && token && wordId) {
      createUpdateUserWordById(wordId, { [`${UserOptionsFields.IsKnown}`]: Known.True }).then(() => {
        setUpdated(true);
      });
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

      {isDictionary ? null : !isAuthenticated() ? (
        <Divider />
      ) : (
        <Progress value={learned} total={WORDS_PER_PAGE} size="tiny" progress="value" success={learned === 20} />
      )}

      {words.words.length > 0 ? (
        <Grid columns={1}   className={style.cards__group}>
          {isDictionary ? null : (
            <Label attached="top right" basic size="medium" style={{ backgroundColor: color, border: 'none' }}>
              <Button color="blue" inverted disabled={learned === 20} onClick={() => navigate(`/sprintgame?group=${group}&page=${page}`)}>
                <Icon name="gamepad" /> Sprint
              </Button>
              <Button color="teal" inverted disabled={learned === 20} onClick={() => navigate(`/audiocall?group=${group}&page=${page}`)}>
                <Icon name="gamepad" /> AudioCall
              </Button>
            </Label>
          )}
          {words.words &&
            words.words.map((word: IWordData, index: number) => (
              <GridColumn className={style.cards__wrapper}>
              <Card className={style.cards__item} key={`${index}-card`}>

                  <div className={style.cards__content}>
                    <Image className={style.cards__image} src={API_URL + word.image} /* size="medium" */ wrapped/>
                    <Segment className={style.cards__transcription}
                      raised
                      style={{
                        backgroundColor: color,
                        borderColor:
                          word.userWord?.difficulty === 'hard' ? 'red' : word.userWord?.optional?.isKnown === Known.True ? 'green' : 'none',
                      }}
                    >
                      <Card.Header className={style.cards__title}  as={'h3'} textAlign="left">
                        {word.userWord?.difficulty === 'hard' || word.userWord?.optional?.isKnown === Known.True ? (
                          <Label
                            color={
                              word.userWord?.difficulty === 'hard' ? 'red' : word.userWord?.optional?.isKnown === Known.True ? 'green' : undefined
                            }
                            ribbon="right"
                            size="mini"
                          >
                            {word.userWord?.difficulty === 'hard' ? 'hard' : word.userWord?.optional?.isKnown === Known.True ? 'known' : undefined}
                          </Label>
                        ) : null}
                        <Popup
                          content="Click to listen"
                          trigger={
                            <Button
                            className='button--audio'
                              circular
                              inverted
                              color="blue"
                              icon="headphones"
                              onClick={() => {
                                play([API_URL + word.audio, API_URL + word.audioMeaning, API_URL + word.audioExample]);
                                disabledBtn();
                              }}
                            />
                          }
                        />
                        {word.word}
                        <Card.Meta textAlign="center">
                          {' '}
                          <span className="transcription">{word.transcription}</span>
                        </Card.Meta>
                        <Card.Header as={'h3'}>{word.wordTranslate}</Card.Header>
                      </Card.Header>
                    </Segment>

                    <Divider />
                  </div>
                  <div className={style.cards__text}>
                    <Card.Description   >

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
                              disabled={word.userWord?.optional?.isKnown === Known.True}
                              onClick={() => handleKnownClick(word._id)}
                            />
                          }
                        />
                        {word.userWord?.optional?.sprintPositive ||
                        word.userWord?.optional?.sprintNegative ||
                        word.userWord?.optional?.audioPositive ||
                        word.userWord?.optional?.audioNegative ? (
                          <div>
                            {' '}
                            <Label>
                              Sprint
                              <Label.Detail style={{ color: 'green' }}>{word.userWord?.optional?.sprintPositive}</Label.Detail>
                              <Label.Detail style={{ color: 'red' }}>{word.userWord?.optional?.sprintNegative}</Label.Detail>
                            </Label>
                            <Label>
                              AudioCall
                              <Label.Detail style={{ color: 'green' }}>{word.userWord?.optional?.audioPositive}</Label.Detail>
                              <Label.Detail style={{ color: 'red' }}>{word.userWord?.optional?.audioNegative}</Label.Detail>
                            </Label>
                          </div>
                          ) : null}
                      </Card.Content>
                    ) : null}
                  </div>

              </Card>
              </GridColumn>
            ))}
        </Grid>
      ) : (
        <Loader active content="Loading" />
      )}
    </div>
  );
};
