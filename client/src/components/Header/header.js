import React, { Component } from "react";
import axios from "axios"; //!
import classnames from "classnames"; //!

import "./header.css";
import icon from "../../images/icon.png";
import search from "../../images/search.png";
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import UserView from './ViewComponents/userView';
// import GuestView from './ViewComponents/guestView';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeActive: true,
      discoverActive: false,
      chatActive: false,
      searchContent: ""
    };
    this.toggleHomeClass = this.toggleHomeClass.bind(this);
    this.toggleDiscoverClass = this.toggleDiscoverClass.bind(this);
    this.onSubmit = this.onSubmit.bind(this); //！
    this.onChange = this.onChange.bind(this); //！
  }

  toggleHomeClass() {
    //const currentHomeState = this.state.homeActive;
    this.setState({
      homeActive: true,
      discoverActive: false,
      chatActive: false
    });
  }

  toggleDiscoverClass() {
    //const currentHomeState = this.state.homeActive;
    this.setState({
      homeActive: false,
      discoverActive: true,
      chatActive: false
    });
  }

  toggleChatClass() {
    //const currentHomeState = this.state.homeActive;
    this.setState({
      homeActive: false,
      discoverActive: false,
      chatActive: true
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //抄过来的还没改完
  onSubmit(e) {
    e.preventDefault();
    const newSearch = {
      searchContent: this.state.searchContent //movie title keyword
    };
    axios
      .post("/api/movies/search", newSearch)
      .then(res => console.log(res.data))
      .catch(err => this.setState(console.log("cannot search")));

    // location.pathname = "/api/movie/search";
  }

  render() {
    return (
      <div className="header-menu">
        <ul className="header-bar">
          <li>
            &nbsp;
            <img className="icon" src={icon} />
          </li>
          <li>
            <Link to="/">PEPPA FILMTOPIA</Link>
          </li>
          {/* <Switch> */}
          {/* <Route exact path ="/" component={GuestView} />
          <Route exact path ="/login" component={UserView} /> */}
          <div className="guest-view">
            <li className="user-mgmt">
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className="user-mgmt">
              <Link to="/login">Log In</Link>
            </li>
          </div>
          {/* </Switch> */}
        </ul>
        <ul className="navi-bar">
          <li>
            <Link
              to="/"
              className={this.state.homeActive ? "tab-active" : null}
              onClick={this.toggleHomeClass}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/movieinfo"
              className={this.state.discoverActive ? "tab-active" : null}
              onClick={this.toggleDiscoverClass}
            >
              Discover
            </Link>
          </li>
          <li>
            <Link
              to="/chat"
              className={this.state.chatActive ? "tab-active" : null}
              onClick={this.toggleChatClass}
            >
              Share Your Feelings
            </Link>
          </li>
          {/* <li>
            <a href="#news">News</a>
          </li>
          <li>
            <a href="#bs">Best Sellers</a>
          </li> */}
          {/* <li className="dropdown">
            <a href="javascript:void(0)" className="dropbtn">
              Favorites ❤
            </a>
            <div className="dropdown-content">
              <a href="#">Likes</a>
              <a href="#">Comments</a>
              <a href="#">Marks</a>
            </div>
          </li> */}
          <li className="search-box">
            {/* <form className="form-wrapper-2 cf" method="GET" action="api/search"> */}
            <form className="form-wrapper-2 cf" onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Search movies..."
                name="searchContent"
                required
                value={this.state.searchContent}
                onChange={this.onChange}
              />
              <button type="submit">
                <img className="search-icon" src={search} />
              </button>
            </form>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
