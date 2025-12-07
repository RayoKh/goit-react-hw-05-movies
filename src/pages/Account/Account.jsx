import { useEffect, useMemo, useState } from 'react';
import {
  getCurrentUser,
  logoutUser,
  updateUser,
  USER_CHANGE_EVENT,
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

  useEffect(() => {
    const handleUserChange = event => setUser(event.detail || null);

    window.addEventListener(USER_CHANGE_EVENT, handleUserChange);

    return () => window.removeEventListener(USER_CHANGE_EVENT, handleUserChange);
  }, []);

  const resetStatus = () => setStatus('');

  const handleUpdateChange = ({ target: { name, value } }) => {
    resetStatus();
    setUpdateForm(prev => ({ ...prev, [name]: value }));
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
