import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import store from "./store";
import PrivateRoute from "./components/auth/PrivateRoute";

import Header from "./components/Header/header";
import Footer from "./components/Homepage/Footer";
import ChatPage from "./components/Chat/ChatPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Dashboard from "./components/Dashboard/Dashboard";
import MovieSearch from "./components/MovieSearch/movieSearchResult";
import MovieItemDetail from "./components/MovieSearch/movieItemDetail";

import CreateProfile from "./components/EditProfile/CreateProfile";
import EditProfile from "./components/EditProfile/EditProfile";
import Profiles from "./components/Profiles/Profiles";
import Profile from "./components/Profile/Profile";

import Home from "./components/Homepage/Home";

import NotFound from "./components/not-found/NotFound";

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
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = "/login";
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
            <div className="container w-90">
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/chat" component={ChatPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/signup" component={RegisterPage} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />




                  <Route
                      exact
                  path="/api/movies/search/:search_content"
                  render={props => (
                    <Redirect
                      {...props.match.params}
                      to={`/api/movies/search/${
                        props.match.params.search_content
                      }/1`}
                    />
                  )}
                />


                <Route
                  exact
                  path="/api/movies/search/:search_content/:page"
                  render={props => (
                    <MovieSearch
                      {...props.match.params}
                      key={
                        props.match.params.search_content +
                        props.match.params.page
                      }
                    />
                  )}
                />



                <Route
                  exact
                  path="/api/movies/mvdetails/:movie_id"
                  component={MovieItemDetail}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />

                {/* test */}
                {/* <Route exact path="/profiles" component={Profiles} /> */}
                <Route
                  exact
                  path="/profiles"
                  render={() => <Redirect to="/profiles/1" />}
                />
                <Route
                  exact
                  path="/profiles/:page"
                  render={props => (
                    <Profiles
                      {...props.match.params}
                      key={props.match.params.page}
                    />
                  )}
                />

                <Route exact path="/profile/:handle" component={Profile} />
                <Route
                  exact
                  path="/profile/user/:user_id"
                  component={Profile}
                />
                <Route exact path="/not-found" component={NotFound} />
                <Route component={NotFound} />
              </Switch>
            </div>
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
