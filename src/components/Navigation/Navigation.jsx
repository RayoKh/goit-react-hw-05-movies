import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { getCurrentUser, USER_CHANGE_EVENT } from 'service/userService';
import {
  AccountLink,
  AccountWrapper,
  NavBar,
  NavItem,
  NavLinks,
} from './Navigation.styled';

const Navigation = () => {
  const [user, setUser] = useState(() => getCurrentUser());

  useEffect(() => {
    const handleUserChange = event => setUser(event.detail || null);

    window.addEventListener(USER_CHANGE_EVENT, handleUserChange);

    return () => window.removeEventListener(USER_CHANGE_EVENT, handleUserChange);
  }, []);

  return (
    <NavBar>
      <NavLinks>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/movies">Movies</NavItem>
        {!user && (
          <>
            <NavItem to="/register">Register</NavItem>
            <NavItem to="/login">Login</NavItem>
          </>
        )}
      </NavLinks>
      {user && (
        <AccountWrapper>
          <AccountLink to="/account">
            <FaUserCircle aria-hidden />
            Account
          </AccountLink>
        </AccountWrapper>
      )}
    </NavBar>
  );
};

export default Navigation;
