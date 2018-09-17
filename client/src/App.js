import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

import Header from "./components/Header/header";
import Footer from "./components/Footer/Footer";
import Exhibit from "./components/Exhibit/exhibit";
import MovieInfo from "./components/MovieInfo/movieinfo";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";


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
