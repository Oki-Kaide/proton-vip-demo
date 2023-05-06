import Header from '../Header';
import React from 'react';
import { LayoutContainer, Error } from './index.styled';
import { useAuthContext } from '../../util/providers/AuthProvider';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: LayoutProps) => {
  const { error } = useAuthContext();

  return (
    <LayoutContainer>
      <Header />
      <main>{children}</main>
      <footer>
        {error ? <Error>{error}</Error> : null}
      </footer>
    </LayoutContainer>
  );
};

export default Layout;
