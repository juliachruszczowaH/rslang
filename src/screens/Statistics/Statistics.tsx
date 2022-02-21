import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { Card, Header, Segment, Statistic } from 'semantic-ui-react';
import { ChartBar } from '../../components/Chart';
import { IStatOptions, LongStatData, IMonthStatData } from '../../models/StatisticsModel';
import { getCurrentToken, getCurrentUserId, isAuthenticated } from '../../services/AuthService';
import { getUserStatistics, initialStatData } from '../../services/StatisticsService';
import { formatDate } from '../../utils/utils';
import './statistics.css';
const currentDate = new Date();
const month: string = currentDate.toLocaleString('en-US', { month: 'short' });
const day: number = currentDate.getDate() - 1;

const Statistics: React.FC = () => {
  const currentUser = getCurrentUserId();
  const token = getCurrentToken();
  const [state, setState] = useState<LongStatData>(initialStatData);
  const [updated, setUpdated] = useState(true);
  const [optionals, setOptionals] = useState<IStatOptions>(initialStatData.optional);
  const [currentDayData, setCurrentDayData] = useState<IMonthStatData>(initialStatData.optional[month] as IMonthStatData);
  const [isLearned, setIsLearned] = useState(0);

  useEffect(() => {
    let isMounted = true;
    if (isAuthenticated()) {
      if (updated) {
        getUserStatistics().then(
          (response) => {
            if (response) {
              setOptionals(response.optional);
              const monthStat = response.optional[month] as IMonthStatData;
              setCurrentDayData(monthStat);
              setIsLearned(response.learnedWords);

              if (isMounted) {
                setState(response);
              }
              setUpdated(false);
            }
          },
          (error: any) => {
            const content = (error.response && error.response.data) || error.message || error.toString();
          }
        );
      }
    }
    return () => {
      isMounted = false;
    };
  }, [updated, optionals, currentDayData, isLearned]);

  

  return (
    <div className="stat-container">
      <div className="stat-content">
        <h3>Statistics</h3>
        <Segment>
          <Statistic.Group size="small">
            <Statistic>
              <Statistic.Value>{formatDate(new Date(state.optional.lastLoginDate))}</Statistic.Value>
              <Statistic.Label>Last login date/time</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{formatDate(new Date(optionals.creationDate))}</Statistic.Value>
              <Statistic.Label>Account creation date/time</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Segment>
        {currentDayData ? (
          <>
            <Segment>
              <Header>Current statistics</Header>
              <Card.Group centered>
                <Card raised>
                  <Statistic>
                    <Statistic.Value>{currentDayData.newAudio[day] + currentDayData.newSprint[day]}</Statistic.Value>
                    <Statistic.Label>New words</Statistic.Label>
                  </Statistic>
                </Card>
                <Card raised>
                  <Statistic>
                    <Statistic.Value>{currentDayData.knownTotal[day]}</Statistic.Value>
                    <Statistic.Label>Learned words</Statistic.Label>
                  </Statistic>
                </Card>
                <Card raised>
                  <Statistic>
                    <Statistic.Value>
                      {currentDayData.sprintTotal[day] || currentDayData.audioTotal[day]
                        ? Math.round(
                          ((currentDayData.posSprint[day] + currentDayData.posAudio[day]) /
                              (currentDayData.sprintTotal[day] + currentDayData.audioTotal[day])) *
                              100
                        )
                        : 0}
                    </Statistic.Value>
                    <Statistic.Label>POSITIVE ANSWERS (%)</Statistic.Label>
                  </Statistic>
                </Card>
              </Card.Group>
            </Segment>
            <Segment.Group horizontal>
              <Segment>
                <Header>SPRINT</Header>
                <Statistic.Group>
                  <Statistic>
                    <Statistic.Value>{currentDayData.newSprint[day]}</Statistic.Value>
                    <Statistic.Label>New words in Sprint</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>
                      {currentDayData.sprintTotal[day] ? Math.round((currentDayData.posSprint[day] / currentDayData.sprintTotal[day]) * 100) : 0}
                    </Statistic.Value>
                    <Statistic.Label>Positive answers (%)</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>{currentDayData.seriaSprint[day]}</Statistic.Value>
                    <Statistic.Label>Longest chain</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </Segment>
              <Segment>
                <Header>AUDIOCALL</Header>
                <Statistic.Group>
                  <Statistic>
                    <Statistic.Value>{currentDayData.newAudio[day]}</Statistic.Value>
                    <Statistic.Label>New words in Audiocall</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>
                      {currentDayData.audioTotal[day] ? (currentDayData.posAudio[day] / currentDayData.audioTotal[day]) * 100 : 0}
                    </Statistic.Value>
                    <Statistic.Label>Positive answers (%)</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>{currentDayData.seriaAudio[day]}</Statistic.Value>
                    <Statistic.Label>Longest chain</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </Segment>
            </Segment.Group>
          </>
        ) : null}
        {currentDayData ? (
          <Segment>
            {ChartBar(optionals)}
            {ChartBar(optionals, true)}
          </Segment>
        ) : null}
      </div>
    </div>
  );
};

export default Statistics;
