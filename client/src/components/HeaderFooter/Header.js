import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import { getMovies } from "../../actions/searchActions";

import "./Header.css";
import icon from "../../images/icon.png";
import search from "../../images/search.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeActive: false,
      discoverActive: false,
      chatActive: false,
      activeIndex: -1,
      searchContent: "",
      suggests: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onClickTitle = this.onClickTitle.bind(this);
    this.onFocusOut = this.onFocusOut.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  componentDidMount() {
    this.props.history.listen(() => {
      // get new URL whenever the route change
      if (this.props.history.location.pathname === "/") { //homepage
        this.setState({
          homeActive: true,
          discoverActive: false,
          chatActive: false
        });
      } else if (this.props.history.location.pathname === "/profiles/1") { // all profiles
        this.setState({
          homeActive: false,
          discoverActive: true,
          chatActive: false
        });
      } else if (this.props.history.location.pathname === "/chat") { // chat room
        this.setState({
          homeActive: false,
          discoverActive: false,
          chatActive: true
        });
      } else {
        this.setState({
          homeActive: false,
          discoverActive: false,
          chatActive: false
        });
      }
    });
  }

  // log out and redirect to homepage
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.props.history.push("/");
  }

  // search for movies via keywords
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    const newSuggest = {
      searchContent: e.target.value //movie title keyword
    };
    axios
      .post("/api/movies/suggest", newSuggest)
      .then(res => {
        this.setState({ suggests: res.data });
      })
      .catch(err => this.setState(console.log("cannot search")));
  }

  onClickTitle(e) {
    this.setState({
      searchContent: e.target.getAttribute("value"),
      suggests: []
    });
  }

  onFocusOut(e) {
    setTimeout(
      function() {
        //Start the timer
        this.setState({ suggests: [] }); //After a while, close the auto-complete div
      }.bind(this),
      400
    );
  }

  // get keyboard input - for movie search result drop down menu
  // 38: up key; 40: down key
  onInputKeyDown(e) {
    if (e.which === 40) {
      var activeIndexPlus = this.state.activeIndex + 1;
      if (activeIndexPlus < this.state.suggests.length) {
        this.setState({ activeIndex: activeIndexPlus });
      } else {
        this.setState({ activeIndex: this.state.suggests.length - 1 });
      }
    } else if (e.which === 38) {
      var activeIndexMinus = this.state.activeIndex - 1;
      if (activeIndexMinus < -1) {
        activeIndexMinus = -1;
      }
      this.setState({ activeIndex: activeIndexMinus });
    }
  }

  onMouseOver(e) {
    let indexStr = e.target.getAttribute("name");
    let index = parseInt(indexStr, 10);
    this.setState({ activeIndex: index });
  }

  // search for movies via keywords
  onSubmit(e) {
    e.preventDefault();
    let newSearch = this.state.searchContent;
    if (
      this.state.activeIndex >= 0 &&
      this.state.activeIndex < this.state.suggests.length
    ) {
      this.setState({
        searchContent: this.state.suggests[this.state.activeIndex].title
      });
      newSearch = this.state.suggests[this.state.activeIndex].title;
    }

    this.setState({
      suggests: [],
      activeIndex: -1
    });

    this.props.history.push(`/api/movies/search/${newSearch}`);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // movie search results
    let suggests = this.state.suggests.map((suggest, index) => (
      <li
        className="dropdown-item list-item-group"
        key={index}
        name={index}
        onClick={this.onClickTitle}
        onMouseOver={this.onMouseOver}
        value={suggest.title}
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          background:
            index === this.state.activeIndex ? "rgb(231, 206, 95)" : null
        }}
      >
        {suggest.title}
      </li>
    ));

    // display welcome message for logged in users
    const authLinks = (
      <div className="auth-view">
        <li className="user-mgmt">
          <a href="" onClick={this.onLogoutClick.bind(this)}>
            Log Out
          </a>
        </li>
        <li className="user-mgmt">
          <Link to="/dashboard">Hi, {user.name}!</Link>
        </li>
        <li className="user-mgmt">
          <Link to="/dashboard">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "2px" }}
            />
          </Link>
        </li>
      </div>
    );

    // display login button for visitors
    const guestLinks = (
      <div className="guest-view">
        <li className="user-mgmt">
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className="user-mgmt">
          <Link to="/login">Log In</Link>
        </li>
      </div>
    );

    return (
      <div className="header-menu">
        <ul className="header-bar">
          <li>
            &nbsp;
            <img className="icon" src={icon} alt="filmicon" />
          </li>
          <li>
            <Link to="/">PEPPA FILMTOPIA</Link>
          </li>
          {/* check if user has logged in and display messages */}
          {isAuthenticated ? authLinks : guestLinks}
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
              to="/profiles/1"
              className={this.state.discoverActive ? "tab-active" : null}
            >
              Discover Others
            </Link>
          </li>
          <li>
            <Link
              to="/chat"
              className={this.state.chatActive ? "tab-active" : null}
            >
              Share Your Feelings
            </Link>
          </li>
          {/* movie search box */}
          <li className="search-box nav-item dropdown">
            <form
              className="form-wrapper-2 cf form-inline my-2 my-lg-0"
              onSubmit={this.onSubmit}
            >
              <input
                className="form-control mr-sm-2"
                placeholder="Search movies..."
                name="searchContent"
                autoComplete="off"
                required
                value={this.state.searchContent}
                onChange={this.onChange}
                onBlur={this.onFocusOut}
                onKeyDown={this.onInputKeyDown}
              />
              {this.state.searchContent.length > 1 &&
              this.state.suggests.length > 0 ? (
                <ul
                  className="dropdown-menu alert alert-dismissible alert-muted d-flex list-group"
                  x-placement="bottom-start"
                  style={{
                    position: "absolute",
                    willChange: "transform",
                    width: "185px",
                    top: "43px",
                    left: "3px"
                  }}
                >
                  {suggests}
                </ul>
              ) : null}
              <button type="submit" className="btn btn-warning my-2 my-sm-0">
                <img className="search-icon" src={search} alt="searchicon" />
              </button>
            </form>
          </li>
        </ul>
      </div>
    );
  }
}

// for redux
Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getMovies: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, getMovies }
)(withRouter(Header));
