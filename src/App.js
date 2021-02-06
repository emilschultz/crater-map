import React from 'react';

import GlobalStyle from './components/GlobalStyle/index';

import HomeContainer from './containers/HomeContainer';
import MapContainer from '';
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
          <Route path="/" component={HomeContainer} />
          <Route path="/" component={MapContainer} />
          {/* <Route path="/" component={ChartsContainer} /> */}
        </Switch>
      </Router>
    </>
    ) 
}

export default App;