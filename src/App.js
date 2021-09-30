import React, { Suspense, useEffect }  from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Questions from '../src/containers/Questions/questionAnswer';
import Landing from '../src/containers/Landing/landing';
import SignIn from '../src/containers/Auth/SignIn';
import SignUp from '../src/containers/Auth/SignUp';
import UserProfile from '../src/containers/UserProfile/UserProfile';
import FeedPage from '../src/containers/Feed/PostCard';
import Notespage from '../src/containers/Notes/notes';
import LandReport from "../src/containers/LandReport/landreport";
import ForgetPassword from './containers/Auth/ForgetPassword';
import DeforestationReport from "./containers/DeforestationReport/deforestaionreport"

import * as routez from './shared/routes';
import * as actions from "./store/actions/index";
import Layout from "../src/Layout/Layout"

import './App.css';

const noAppBarPaths = [
	routez.LANDING,
];

function App(props) {

  const onTryAutoSignIn = props.onTryAutoSignIn;
  const location = useLocation();

  useEffect(() => {
    onTryAutoSignIn();
  }, [onTryAutoSignIn]);

  const hideAppBar = noAppBarPaths.includes(location.pathname);

  let routes = (
    <Suspense >
      <Switch>
        <Route exact path={routez.SIGNIN} component={SignIn}/>
        <Route exact path={routez.LANDING} component={Landing}/>
        <Route exact path={routez.QUESTIONS} component={Questions}/>
        <Route exact path={routez.SIGNUP} component={SignUp}/>
        <Route exact path={routez.USER_PROFILE} component={UserProfile}/>
        <Route exact path={routez.CHANGE_PASSWORD} component={UserProfile}/>
        <Route exact path={routez.FEED} component={FeedPage}/>
        <Route exact path={routez.NOTES} component={Notespage}/>
        <Route exact path={routez.LANDREPORT} component={LandReport}/>
        <Route exact path={routez.DEFORESTATIONREPORT} component={DeforestationReport}/>
        <Route exact path={routez.FORGET_PASSWORD} component={ForgetPassword}/>
        <Redirect path="/" to={routez.SIGNIN} />
     </Switch>
    </Suspense>   
  );


  return (
    <div className="App">     
      {hideAppBar ? '' : <Layout/>}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {routes}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    email: state.auth.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState()),
  };
};

// const withErrorhandlerWrappedComponent = withErrorHandler(App, axios);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
