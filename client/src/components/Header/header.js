import React, { Component } from "react";

import "./header.css";
import icon from "../../images/icon.png";
import search from "../../images/search.png";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import { getMovies } from "../../actions/searchActions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeActive: false,
      discoverActive: false,
      chatActive: false,
      searchContent: ""
    };
    // this.toggleHomeClass = this.toggleHomeClass.bind(this);
    // this.toggleDiscoverClass = this.toggleDiscoverClass.bind(this);
    // this.toggleChatClass = this.toggleChatClass.bind(this);
    this.onSubmit = this.onSubmit.bind(this); //！
    this.onChange = this.onChange.bind(this); //！
  }

  componentDidMount() {
    this.props.history.listen(() => {
      // get new URL whenever the route change
      if (this.props.history.location.pathname === "/") {
        this.setState({
          homeActive: true,
          discoverActive: false,
          chatActive: false
        });
      } else if (this.props.history.location.pathname === "/profiles") {
        this.setState({
          homeActive: false,
          discoverActive: true,
          chatActive: false
        });
      } else if (this.props.history.location.pathname === "/chat") {
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

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
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

    this.props.getMovies(newSearch, this.props.history);
    // axios
    //   .post("/api/movies/search", newSearch)
    //   .then(res => {
    //     console.log(res.data);
    //     this.props.history.push("/mvsearchresult");
    //   })
    //   .catch(err => this.setState(console.log("cannot search")));
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
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
              to="/profiles"
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
          <li className="search-box">
            {/* <form className="form-wrapper-2 cf" method="GET" action="api/search"> */}
            <form
              className="form-wrapper-2 cf form-inline my-2 my-lg-0"
              onSubmit={this.onSubmit}
            >
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search movies..."
                name="searchContent"
                required
                value={this.state.searchContent}
                onChange={this.onChange}
              />
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
