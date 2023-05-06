import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { PublicRoutes } from './Routes';
import { useAuthContext } from '../providers/AuthProvider';

interface ProtectedRouteProps {
  component: () => JSX.Element;
  path: string;
  exact?: boolean;
}

const ProtectedRoute = ({
  component: Component,
  path,
  exact,
}: ProtectedRouteProps) => {
  const { currentUser } = useAuthContext();
  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) =>
        currentUser && currentUser.isMember ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: PublicRoutes.Landing,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
