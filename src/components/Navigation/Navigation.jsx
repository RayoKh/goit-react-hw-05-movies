import { FaUserCircle } from 'react-icons/fa';
import {
  AccountLink,
  AccountWrapper,
  NavBar,
  NavItem,
  NavLinks,
} from './Navigation.styled';

const Navigation = () => {
  return (
    <NavBar>
      <NavLinks>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/movies">Movies</NavItem>
        <NavItem to="/register">Register</NavItem>
        <NavItem to="/login">Login</NavItem>
      </NavLinks>
      <AccountWrapper>
        <AccountLink to="/account">
          <FaUserCircle aria-hidden />
          Account
        </AccountLink>
      </AccountWrapper>
    </NavBar>
  );
};

export default Navigation;
