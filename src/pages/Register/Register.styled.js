import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AuthPage = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 24px 16px 40px;
`;

export const AuthCard = styled.section`
  padding: 24px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const AuthTitle = styled.h1`
  margin: 0 0 16px;
  font-size: 28px;
`;

export const AuthField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
  font-weight: 500;
`;

export const AuthInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #cfd5e0;
  border-radius: 8px;
  font-size: 16px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  background-color: #212121;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

export const SupportText = styled.p`
  margin-top: 12px;
  color: #2c2c2c;
`;

export const SecondaryButton = styled(Link)`
  display: inline-block;
  width: 100%;
  margin-top: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  background-color: #f1f3f6;
  color: #212121;
  font-size: 15px;
  font-weight: 700;
`;
