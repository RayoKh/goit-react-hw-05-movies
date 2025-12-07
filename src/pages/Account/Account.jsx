import { useEffect, useMemo, useState } from 'react';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from 'service/userService';
import {
  AccountPageWrapper,
  Button,
  Card,
  Divider,
  Field,
  Input,
  Message,
  Title,
} from './Account.styled';

const Account = () => {
  const [user, setUser] = useState(() => getCurrentUser());
  const [status, setStatus] = useState('');

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [updateForm, setUpdateForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  useEffect(() => {
    setUpdateForm(prev => ({
      ...prev,
      name: user?.name || '',
      email: user?.email || '',
    }));
  }, [user]);

  const resetStatus = () => setStatus('');

  const handleRegisterChange = ({ target: { name, value } }) => {
    resetStatus();
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = ({ target: { name, value } }) => {
    resetStatus();
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateChange = ({ target: { name, value } }) => {
    resetStatus();
    setUpdateForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async event => {
    event.preventDefault();
    try {
      const createdUser = await registerUser(registerForm);
      setUser(createdUser);
      setStatus('Реєстрація успішна! Ви автоматично увійшли в систему.');
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const loggedUser = await loginUser(loginForm);
      setUser(loggedUser);
      setStatus('Вхід виконано успішно.');
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleUpdate = async event => {
    event.preventDefault();
    try {
      const updates = { ...updateForm };
      if (!updates.password) {
        delete updates.password;
      }
      const updatedUser = await updateUser(updates);
      setUser(updatedUser);
      setStatus('Дані профілю оновлено.');
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setStatus('Ви вийшли з облікового запису.');
  };

  const lastUpdated = useMemo(
    () => (user?.updatedAt ? new Date(user.updatedAt).toLocaleString() : null),
    [user]
  );

  return (
    <div>
      <h1>Керування обліковим записом</h1>
      <AccountPageWrapper>
        <Card>
          <Title>Реєстрація</Title>
          <form onSubmit={handleRegister}>
            <Field>
              Імʼя
              <Input
                type="text"
                name="name"
                value={registerForm.name}
                onChange={handleRegisterChange}
              />
            </Field>
            <Field>
              Email
              <Input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
              />
            </Field>
            <Field>
              Пароль
              <Input
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
              />
            </Field>
            <Button type="submit">Зареєструватися</Button>
          </form>
        </Card>

        <Card>
          <Title>Вхід</Title>
          <form onSubmit={handleLogin}>
            <Field>
              Email
              <Input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
              />
            </Field>
            <Field>
              Пароль
              <Input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
              />
            </Field>
            <Button type="submit">Увійти</Button>
          </form>
        </Card>

        <Card>
          <Title>Оновлення профілю</Title>
          <form onSubmit={handleUpdate}>
            <Field>
              Імʼя
              <Input
                type="text"
                name="name"
                value={updateForm.name}
                onChange={handleUpdateChange}
                disabled={!user}
              />
            </Field>
            <Field>
              Email
              <Input
                type="email"
                name="email"
                value={updateForm.email}
                onChange={handleUpdateChange}
                disabled={!user}
              />
            </Field>
            <Field>
              Новий пароль (необовʼязково)
              <Input
                type="password"
                name="password"
                value={updateForm.password}
                onChange={handleUpdateChange}
                disabled={!user}
              />
            </Field>
            <Button type="submit" disabled={!user}>
              Оновити дані
            </Button>
          </form>
          <Divider />
          <Button type="button" onClick={handleLogout} disabled={!user}>
            Вийти
          </Button>
          {user && (
            <Message>
              Зараз ви увійшли як <strong>{user.email}</strong>
              {lastUpdated ? ` (оновлено ${lastUpdated})` : null}
            </Message>
          )}
        </Card>
      </AccountPageWrapper>

      {status && <Message>{status}</Message>}
    </div>
  );
};

export default Account;
