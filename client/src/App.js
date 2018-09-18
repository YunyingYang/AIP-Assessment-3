import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';

import Header from "./components/Header/header";
import Footer from "./components/Footer/Footer";
import Exhibit from "./components/Exhibit/exhibit";
import MovieInfo from "./components/MovieInfo/movieinfo";
import ChatPage from "./components/Chat/ChatPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";

// Check the token
if (localStorage.jwtToken) {
  // set auth header token 
  setAuthToken(localStorage.jwtToken);
  // Decode token to retrieve user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    //redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <br />
            <br />
            <Switch>
              <Route exact path="/" component={Exhibit} />
              <Route exact path="/movieinfo" component={MovieInfo} />
              <Route exact path="/chat" component={ChatPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={RegisterPage} />
            </Switch>
            <br />
            <br />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
