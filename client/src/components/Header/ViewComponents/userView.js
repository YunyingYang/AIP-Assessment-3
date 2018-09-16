import React, { Component } from 'react';
import '../header.css';


class UserView extends Component {

  render(){
    return(
        <div className="user-view">
        {/* <li className="user-mgmt"></li> */}
        <li className="user-mgmt"><a>Hello!</a></li>
        </div>
    );
  }
}

export default UserView;