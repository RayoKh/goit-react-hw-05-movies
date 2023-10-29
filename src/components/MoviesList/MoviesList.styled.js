import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const MovieList = styled.ul`
  padding: 40px 0;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Item = styled.li`
  position: relative;
  img {
    border-radius: 8px;
  }
`;

export const Link = styled(NavLink)`
  text-decoration: none;
  color: #414141;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover div {
    opacity: 1;
  }
`;
