import { FC } from 'react';
import { AudioCallData } from '../../../models/WordModel';
import { Button, Icon, Segment, Statistic } from 'semantic-ui-react';
import { API_URL } from '../../../services/AppService';


const AudioCallCard: FC<AudioCallData> = ({
  answersAudioCall,
  onAnswer,
  questionNumber,
}) => {
  console.log(answersAudioCall[1]);


  return (
    <div>
      <Segment raised style={{ width: '70%', margin: '20px auto' }}>
        <Statistic>
          <Statistic.Value>{questionNumber}</Statistic.Value>
          <Statistic.Label>Question</Statistic.Label>
        </Statistic>
        <div>
        <Icon  name='volume up' size='huge' color='red' style={{ margin: '20px 0px', opacity: '70%' }}/>
        </div>
        <div>
            {answersAudioCall.map((answer) => (
              <Button  basic color='green' onClick={()=>{onAnswer(answer);}}>
                {`${answer}`}
              </Button>
            ))}
        </div>
      </Segment>
    </div >
  );
};

export default AudioCallCard;
