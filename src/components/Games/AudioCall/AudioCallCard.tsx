import { FC } from 'react';
import { AudioCallData } from '../../../models/WordModel';
import { Button, Icon, Segment, Statistic } from 'semantic-ui-react';
import { disabledBtn } from '../../../utils/utils';



const AudioCallCard: FC<AudioCallData> = ({
  answersAudioCall,
  onAnswer,
  questionNumber,
}) => {


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
              <Button className='button__game--audio' basic color='green' onClick={()=>{onAnswer(answer); disabledBtn();}} key={answer}>
                {`${answer}`}
              </Button>
            ))}
        </div>
      </Segment>
    </div >
  );
};

export default AudioCallCard;
