import { useState } from 'react';
import { loginUser } from 'service/userService';
import {
  AuthCard,
  AuthField,
  AuthInput,
  AuthPage,
  AuthTitle,
  SecondaryButton,
  SubmitButton,
  SupportText,
} from './Login.styled';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setStatus('');
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const loggedIn = await loginUser(form);
      setStatus(`Вітаємо, ${loggedIn.name}! Ви успішно увійшли.`);
      setForm({ email: '', password: '' });
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <AuthPage>
      <AuthCard>
        <AuthTitle>Увійдіть до свого акаунту</AuthTitle>
        <form onSubmit={handleSubmit}>
          <AuthField>
            Email
            <AuthInput
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </AuthField>
          <AuthField>
            Пароль
            <AuthInput
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </AuthField>
          <SubmitButton type="submit">Увійти</SubmitButton>
          <SecondaryButton to="/register">в мене немає аккаунту</SecondaryButton>
        </form>
        {status && <SupportText>{status}</SupportText>}
      </AuthCard>
    </AuthPage>
  );
};

export default Login;
