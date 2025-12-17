import styled from 'styled-components';

export const AccountPageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

export const Card = styled.section`
  padding: 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 12px;
`;

export const GroupTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 16px;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const Button = styled.button`
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  background-color: #222;
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    background-color: #9e9e9e;
    cursor: not-allowed;
  }
`;

export const Message = styled.p`
  margin-top: 8px;
  color: #3f3f3f;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #dcdcdc;
  margin: 16px 0;
`;

export const AdaptationGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  accent-color: #222;
  cursor: pointer;
`;

export const OptionTitle = styled.h4`
  margin: 8px 0 4px;
  font-size: 15px;
`;

export const OptionDescription = styled.p`
  margin: 0 0 6px;
  font-size: 14px;
  color: #4a4a4a;
  line-height: 1.4;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  cursor: pointer;
`;

export const Radio = styled.input.attrs({ type: 'radio' })`
  width: 18px;
  height: 18px;
  accent-color: #222;
  cursor: pointer;
`;
