import React, { useEffect, useState } from 'react';
import { Card, Segment, Statistic } from 'semantic-ui-react';
import { IStatOptions } from '../../models/StatisticsModel';
import { getCurrentToken, getCurrentUserId } from '../../services/AuthService';
import { getUserStatistics } from '../../services/StatisticsService';
import './statistics.css';

const Statistics: React.FC = () => {
  const currentUser = getCurrentUserId();
  const token = getCurrentToken();
  const [stat, setStat] = useState<IStatOptions>({ lastLoginDate: 0, creationDate: 0 });

  useEffect(() => {
    if (currentUser && token)
      getUserStatistics(currentUser, token).then((response) => {
        if (response) {
          setStat(response.data.optional);
        }
      },
      (error: any) => {
        const content = (
          error.response && error.response.data) ||
          error.message ||
          error.toString();
        console.log(content);
      });
  }, [currentUser, token]);



  return (
    <div className="stat-container">
      <div className="stat-content">
        <h3>Statistics</h3>
        <Segment.Group horizontal>
          <Segment>
            <Card raised>
              <Statistic>
                <Statistic.Value>{new Date(stat.lastLoginDate).toLocaleString()}</Statistic.Value>
                <Statistic.Label>Last login date/time</Statistic.Label>
              </Statistic>
            </Card>
          </Segment>
          <Segment>
            <Card raised>
              <Statistic>
                <Statistic.Value>{new Date(stat.creationDate).toLocaleString()}</Statistic.Value>
                <Statistic.Label>Account creation date/time</Statistic.Label>
              </Statistic>
            </Card>
          </Segment>
        </Segment.Group>
      </div>
    </div>
  );
};

export default Statistics;


