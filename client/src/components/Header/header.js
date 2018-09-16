import React, { Component } from 'react';
import './header.css';
import icon from '../../images/icon.png';
import search from '../../images/search.png';
import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import UserView from './ViewComponents/userView';
// import GuestView from './ViewComponents/guestView';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.toggleClass= this.toggleClass.bind(this);
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    return (
      <div className="header-menu">
        <ul className="header-bar">
          <li>&nbsp;<img className="icon" src={icon}/></li>
          <li><Link to="/">PEPPA FILMTOPIA</Link></li>
          {/* <Switch> */}
          {/* <Route exact path ="/" component={GuestView} />
          <Route exact path ="/login" component={UserView} /> */}
          <div className="guest-view">
          <li className="user-mgmt"><Link to="/signup">Sign Up</Link></li>
          <li className="user-mgmt"><Link to="/login">Log In</Link></li>
          </div>
          {/* </Switch> */}
        </ul>
        <ul className="navi-bar">
          <li><Link to="/" className={this.state.active ? 'tab-active': null}
                 onClick={this.toggleClass}>Home</Link></li>
          <li><Link to="/movieinfo">Discover</Link></li>
          <li><a href="#news">News</a></li>
          <li><a href="#bs">Best Sellers</a></li>
          <li className="dropdown">
            <a href="javascript:void(0)" className="dropbtn">Favorites ❤</a>
            <div className="dropdown-content">
              <a href="#">Likes</a>
              <a href="#">Comments</a>
              <a href="#">Marks</a>
            </div>
          </li>
          <li className="search-box">      
            <form className="form-wrapper-2 cf" method="GET" action="api/search">
              <input type="text" placeholder="Search movies..." name="name" required></input>
              <button type="submit"><img className="search-icon" src={search}/></button>
            </form>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;