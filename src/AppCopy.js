import React from 'react';

import GlobalStyle from './components/GlobalStyle/index';

import HomeContainer from './containers/HomeContainer';
import MapContainer from '';
// import ChartsContainer from '';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppCopy from './App';


function AppCopy() {
  return(
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/home" component={HomeContainer} />
          <Route path="/map" component={MapContainer} />
          {/* <Route path="/" component={ChartsContainer} /> */}
        </Switch>
      </Router>
    </>
    ) 
}

export default AppCopy;