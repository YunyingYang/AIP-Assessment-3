import React, { Component } from 'react';
import '../header.css';
import { Link } from 'react-router-dom';

class GuestView extends Component {

  render(){
    return(
        <div className="guest-view">
          <li className="user-mgmt"><Link to="/signup">Sign Up</Link></li>
          <li className="user-mgmt"><Link to="/login">Log In</Link></li>
        </div>
    );
  }
}

export default GuestView;