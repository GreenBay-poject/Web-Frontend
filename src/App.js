import React, { Suspense }  from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SignIn from '../src/containers/Auth/SignIn';
import SignUp from '../src/containers/Auth/SignUp';
import UserProfile from '../src/containers/UserProfile/UserProfile';
import FeedPage from '../src/containers/Feed/PostCard';

import * as routez from './shared/routes';

import './App.css';

function App() {

  let routes = (
    <Suspense >
      <Switch>
        <Route exact path={routez.SIGNIN} component={SignIn}/>
        <Route exact path={routez.SIGNUP} component={SignUp}/>
        <Route exact path={routez.USER_PROFILE} component={UserProfile}/>
        <Route exact path={routez.FEED} component={FeedPage}/>
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
