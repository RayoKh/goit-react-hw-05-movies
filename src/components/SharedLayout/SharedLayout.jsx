import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from 'components/Navigation/Navigation';
import {
  AccessibilityButton,
  Container,
  Header,
  VisuallyHiddenText,
} from './SharedLayout.styled';
import { FaUniversalAccess } from 'react-icons/fa';

const SharedLayout = () => {
  return (
    <Container>
      <Header>
        <Navigation />
        <AccessibilityButton type="button" aria-label="Налаштування доступності">
          <FaUniversalAccess aria-hidden />
          <VisuallyHiddenText>Налаштування доступності</VisuallyHiddenText>
        </AccessibilityButton>
      </Header>
      <main>
        <Suspense fallback={<div>...loading</div>}>
          <Outlet />
        </Suspense>
      </main>
    </Container>
  );
};

export default SharedLayout;
