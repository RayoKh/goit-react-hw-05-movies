import { useState } from 'react';
import { registerUser } from 'service/userService';
import {
  AuthCard,
  AuthField,
  AuthInput,
  AuthPage,
  AuthTitle,
  SecondaryButton,
  SubmitButton,
  SupportText,
} from './Register.styled';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setStatus('');
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await registerUser(form);
      setStatus('Реєстрація успішна! Тепер ви можете увійти.');
      setForm({ name: '', email: '', password: '' });
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <AuthPage>
      <AuthCard>
        <AuthTitle>Створіть новий обліковий запис</AuthTitle>
        <form onSubmit={handleSubmit}>
          <AuthField>
            Імʼя
            <AuthInput
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </AuthField>
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
              autoComplete="new-password"
              required
            />
          </AuthField>
          <SubmitButton type="submit">Зареєструватися</SubmitButton>
          <SecondaryButton to="/login">в мене вже є аккаунт</SecondaryButton>
        </form>
        {status && <SupportText>{status}</SupportText>}
      </AuthCard>
    </AuthPage>
  );
};

export default Register;
