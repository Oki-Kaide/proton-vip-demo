import './styles/global.scss';
import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import registerIcons from './util/services/fontawesome.service';
import Routes from './util/routes/Routes';

const queryCache = new QueryCache();
registerIcons();

export default function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Routes />
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryCacheProvider>
  );
}
