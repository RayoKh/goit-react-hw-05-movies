import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 16px;
  background: linear-gradient(#e66465, #9198e5);
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid black;
`;

export const AccessibilityButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border: 2px solid transparent;
  border-radius: 8px;
  background-color: #ffffff;
  color: #1e1e1e;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:focus-visible {
    outline: none;
    border-color: #000000;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.35);
  }
`;

export const VisuallyHiddenText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
