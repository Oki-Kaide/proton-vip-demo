import React, { Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import ArtistPage from '../../pages/Artist';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from '../../pages/Landing';
import LoadingPage from '../../pages/Loading';

export enum ProtectedRoutes {
  Artist = '/artist',
}

export enum PublicRoutes {
  Landing = '/',
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <ProtectedRoute
            path={ProtectedRoutes.Artist}
            component={ArtistPage}
          />
          <PublicRoute path={PublicRoutes.Landing} component={LandingPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
