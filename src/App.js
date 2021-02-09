import React from 'react';

import GlobalStyle from './components/GlobalStyle/index';

import HomeContainer from './containers/HomeContainer';
import MapSectionContainer from './containers/MapSectionContainer';
import ChartsContainer from './containers/ChartsContainer';

function App() {
  return(
    <>
      <GlobalStyle />
        <HomeContainer />
        <MapSectionContainer />
        <ChartsContainer />
    </>
  ) 
}

export default App;