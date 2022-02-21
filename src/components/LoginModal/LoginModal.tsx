import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Header, Icon, InputOnChangeData, Label, Message, Modal } from 'semantic-ui-react';
import { getCurrentToken, getCurrentUserId, login } from '../../services/AuthService';
import { getUserStatistics, setInitialUserStatistics, setUserLoginStatistics } from '../../services/StatisticsService';
import { createNewUser } from '../../services/UserService';
import './loginmodal.css';

type FormState = {
  email: string;
  password: string;
  name: string;
};

export const LoginModal = (triggerElement: JSX.Element): JSX.Element => {
  const initialState: FormState = { email: '', password: '', name: '' };
  const [state, setState] = useState(true);
  const [email, setEmail] = useState(initialState.email);
  const [pass, setPass] = useState(initialState.password);
  const [name, setName] = useState(initialState.name);
  const [open, setOpen] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
    setEmail(data.value);
  };
  const handlePassChange = (e: ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
    setPass(data.value);
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
    setName(data.value);
  };
  const handleRegisterClick = (): void => {
    setLoginError('');
    setState(false);
  };
  const handleLoginInsteadClick = (): void => {
    setLoginError('');
    setState(true);
  };

  const processError = (error: { response: { data: any; statusText: any } }) => {
    const errorData = error.response.data;
    const errorStatus = error.response.statusText;
    const errorMessage = typeof errorData === 'string' ? errorData : errorData.error.errors.map((i: { message: string }) => i.message).join('. ');
    setLoginError(`${errorStatus}:  ${errorMessage}`);
  };

  const processLogin = () => {
    login({ email: email, password: pass }).then(
      (response) => {
        if (response) {
          const currentUser = getCurrentUserId();
          const currentToken = getCurrentToken();
          setEmail(initialState.email);
          setPass(initialState.password);
          if (currentUser && currentToken) {
            getUserStatistics().then((stat) => {
              if (stat) {
                setUserLoginStatistics(stat).then(() => window.location.reload());
              } else {
                setInitialUserStatistics().then(() => window.location.reload());
              }
            });
          }
          setOpen(false);
        }
      },
      (error) => {
        processError(error);
      }
    );
  };

  const handleSubmit = () => {
    if (state) {
      processLogin();
    } else {
      console.log('Registration');
      createNewUser({ name: name, email: email, password: pass }).then(
        (response) => {
          if (response) {
            processLogin();
          }
        },
        (error) => {
          processError(error);
        }
      );
    }
  };

  useEffect(() => {
    setState(state);
  }, [state]);

  useEffect(() => {
    console.log(loginError);
  }, [loginError]);

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      open={open}
      size="small"
      trigger={triggerElement}
    >
      <div className="login-container">
        <div
          className="login-content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <Header icon>
            <Icon color="teal" name="user" />
            {state ? 'Login' : 'Register'}
          </Header>
          <Modal.Content style={{ padding: '20px' }}>
            {!!loginError ? (
              <Message error attached="top">
                <Icon name="help" />
                {loginError}
              </Message>
            ) : null}
            <Form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {state ? null : (
                <Form.Field>
                  <label>Name</label>
                  <Form.Input placeholder="Name" name="name" type="text" required value={name} onChange={handleNameChange}></Form.Input>
                </Form.Field>
              )}
              <Form.Field>
                <label>Email</label>
                <Form.Input placeholder="Email" type="email" name="email" required value={email} onChange={handleEmailChange}></Form.Input>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Form.Input placeholder="Password" name="password" type="password" required value={pass} onChange={handlePassChange}></Form.Input>
              </Form.Field>
              <Button type="submit">{state ? 'Login' : 'Register new user'}</Button>
            </Form>
            {state ? (
              <Message attached="bottom" warning>
                <Icon name="help" />
                Do not have account yet? Please,&nbsp;
                <Label
                  as="button"
                  basic
                  color="blue"
                  content="Register"
                  onClick={handleRegisterClick}
                  style={{
                    border: 'none',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                />
                &nbsp;
              </Message>
            ) : (
              <Message attached="bottom" warning>
                <Icon name="help" />
                Already signed up?&nbsp;
                <Label
                  as="button"
                  basic
                  color="blue"
                  content="Login here"
                  onClick={handleLoginInsteadClick}
                  style={{
                    border: 'none',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                />
                &nbsp;instead.
              </Message>
            )}
          </Modal.Content>
        </div>
      </div>
    </Modal>
  );
};
