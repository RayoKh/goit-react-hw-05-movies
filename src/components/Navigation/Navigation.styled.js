import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const NavItem = styled(NavLink)`
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;

  &.active {
    color: white;
    background-color: #aaa;
  }
`;

export const AccountWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const AccountLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 20px;
  text-decoration: none;
  color: #fff;
  background-color: #1e1e1e;
  font-weight: 600;

  svg {
    width: 20px;
    height: 20px;
  }

  &.active {
    background-color: #444;
  }
`;
