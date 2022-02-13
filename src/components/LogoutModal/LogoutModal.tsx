
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { logout } from '../../services/AuthService';
import './logoutmodal.css';

export const LogoutModal = (triggerElement: JSX.Element): JSX.Element => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleConfirm = () => {
    logout();
    setOpen(false);
    if (location.pathname === '/statistics') {
      navigate('/home');
    }
    window.location.reload();
  };


  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      open={open}
      size='small'
      trigger={triggerElement}
    >
      <Header icon>
        Are you shure?
      </Header>
      <Modal.Content>
        <p>
          You are going to log out of application.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' onClick={handleConfirm}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
