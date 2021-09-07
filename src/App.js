import React, { Suspense }  from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';


import Questions from '../src/containers/Questions/questionAnswer';
import Landing from '../src/containers/Landing/landing';
import SignIn from '../src/containers/Auth/SignIn';
import SignUp from '../src/containers/Auth/SignUp';

import * as routez from './shared/routes';
import './App.css';



function App() {

  let routes = (
    <Suspense >
      <Switch>
        <Route exact path={routez.SIGNIN} component={SignIn}/>
        <Route exact path={routez.LANDING} component={Landing}/>
        <Route exact path={routez.QUESTIONS} component={Questions}/>
        <Route exact path={routez.SIGNUP} component={SignUp}/>
        <Redirect path="/" to={routez.SIGNIN} />
     </Switch>
    </Suspense>
  );


  return (
    <div className="App">
      
      {routes}
    </div>
  );
}

export default App; 
