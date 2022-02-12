import React from 'react';
import { Button, Icon, Image, Modal } from 'semantic-ui-react';
import { AnswerObject } from '../../../models/WordModel';

const ModalWindow = (arrr: Array<AnswerObject> ) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>Long Modal</Button>}
    >
      <Modal.Header>Modal Header</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='/images/wireframe/image.png' wrapped />
        <Modal.Description>
          <p>
            This is an example of expanded content that will cause the modal's
            dimmer to scroll.
          </p>

         {arrr.map((item) =>(
           <div>
             {`Вопрос: ${item.question}`}
              {`Ответ: ${item.correct}`}
              {`Ваш ответ: ${item.userAnswer}`}
              {`Результат: ${item.result}`}
           </div>
         ))}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={() => setOpen(false)}>
          Proceed <Icon /* name='right chevron' */ />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalWindow;
