import React from 'react';

import GlobalStyle from './components/GlobalStyle/index';

import HomeContainer from './containers/HomeContainer';
import MapSectionContainer from './containers/MapSectionContainer';
// import ChartsContainer from '';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return(
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/">
            <HomeContainer />
            <MapSectionContainer />
          </Route>
        </Switch>
      </Router>
    </>
    ) 
}

export default App;