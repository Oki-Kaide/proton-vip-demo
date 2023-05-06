import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ProtectedRoutes } from './Routes';
import { useAuthContext } from '../providers/AuthProvider';

interface PublicRouteProps {
  component: () => JSX.Element;
  path: string;
  exact?: boolean;
}

const PublicRoute = ({
  component: Component,
  path,
  exact,
}: PublicRouteProps) => {
  const { currentUser } = useAuthContext();
  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) =>
        currentUser && currentUser.isMember ? (
          <Redirect
            to={{
              pathname: ProtectedRoutes.Artist,
              state: { from: location },
            }}
          />
        ) : (
          <Component />
        )
      }
    />
  );
};

export default PublicRoute;
