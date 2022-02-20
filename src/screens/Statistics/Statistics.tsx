import React, { useEffect, useState } from 'react';
import { Card, Segment, Statistic } from 'semantic-ui-react';
import { IStatOptions, LongStatData } from '../../models/StatisticsModel';
import { getCurrentToken, getCurrentUserId, isAuthenticated } from '../../services/AuthService';
import { getUserStatistics, initialStatData } from '../../services/StatisticsService';
import './statistics.css';
const currentDate = new Date();
const month: string = currentDate.toLocaleString('default', { month: 'short' });
const day: number = currentDate.getDate();

const Statistics: React.FC = () => {
  const currentUser = getCurrentUserId();
  const token = getCurrentToken();
  const [state, setState] = useState<LongStatData>(initialStatData);
  const [updated, setUpdated] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (isAuthenticated()) {
      if (updated) {
        getUserStatistics().then(
          (response) => {
            if (response) {
              if (isMounted) setState(response);
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
  }, [updated]);

  console.log(state);

  return (
    <div className="stat-container">
      <div className="stat-content">
        <h3>Statistics</h3>
        <Segment.Group horizontal>
          <Segment>
            <Card raised>
              <Statistic>
                <Statistic.Value>{new Date(state.optional.lastLoginDate).toLocaleString()}</Statistic.Value>
                <Statistic.Label>Last login date/time</Statistic.Label>
              </Statistic>
            </Card>
          </Segment>
          <Segment>
            <Card raised>
              <Statistic>
                <Statistic.Value>{new Date(state.optional.creationDate).toLocaleString()}</Statistic.Value>
                <Statistic.Label>Account creation date/time</Statistic.Label>
              </Statistic>
            </Card>
          </Segment>
        </Segment.Group>
        <Segment>
          <Card raised>
            <Statistic>
              <Statistic.Value>{state.learnedWords}</Statistic.Value>
              <Statistic.Label>Learned words</Statistic.Label>
            </Statistic>
          </Card>
        </Segment>
        <Segment.Group horizontal>
          <Segment>
            <Card raised>
              <Statistic>
                <Statistic.Value>{state.optional[month] ? state.optional[month].toString() : 'nothing'}</Statistic.Value>
                <Statistic.Label>Sprint</Statistic.Label>
              </Statistic>
            </Card>
          </Segment>
          <Segment>
            <Card raised>
              <Statistic>
                <Statistic.Value>{state.optional ? state.optional.toString() : 'nothing'}</Statistic.Value>
                <Statistic.Label>Audio</Statistic.Label>
              </Statistic>
            </Card>
          </Segment>
        </Segment.Group>
      </div>
    </div>
  );
};

export default Statistics;
