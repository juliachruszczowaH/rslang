import { FC } from 'react';
import { getRandomNumber, play } from '../../../utils/utils';
import { AudioCallData, IWordData, SprintData } from '../../../models/WordModel';
import { Button, Header, Icon, Segment, Statistic } from 'semantic-ui-react';
import { API_URL } from '../../../services/AppService';


const AudioCallCard: FC<AudioCallData> = ({
  answersAudioCall,
  onAnswer,
  questionNumber,
}, word: IWordData) => {

  return (
    <div>
      <Segment raised style={{ width: '70%', margin: '20px auto' }}>
        <Statistic>
          <Statistic.Value>{questionNumber}</Statistic.Value>
          <Statistic.Label>Question</Statistic.Label>
        </Statistic>
        <div>
        <Icon  name='volume up' />
        </div>
        <div>
            {answersAudioCall.map((answer) => (
              <Button value={answer} onClick={onAnswer}>
                {`${answer}`}
              </Button>
            ))}
        </div>
      </Segment>
    </div >
  );
};

export default AudioCallCard;
