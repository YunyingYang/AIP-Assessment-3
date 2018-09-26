import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import axios from 'axios';
import { Link } from "react-router-dom";

class ProfileAbout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usermovieratings: []
    };
  }

  componentWillMount() {
    axios
      .get(`/api/usermovieratings/user/${this.props.user._id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ usermovieratings: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(' ')[0];

    // Skill List
    const prefs = profile.prefs.map((pref, index) => (
      <div key={index} className="p-3 alert alert-dismissible alert-info">
        <i className="fa fa-heart" /> {pref}
      </div>
    ));

    const ratings = this.state.usermovieratings.map((usermovierating, index) => (
      <Link to={`/api/movies/mvdetails/${usermovierating.movie._id}`}>
        <li key={index} className="p-3 alert alert-dismissible alert-warning d-flex justify-content-between">
          <span><i className="fa fa-eye" />&nbsp;{usermovierating.movie.title}</span><span>&nbsp;</span><span className="badge badge-pill badge-danger">{usermovierating.rating}</span>
        </li>
      </Link>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead text-info">
              {isEmpty(profile.bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                  <span>{profile.bio}</span>
                )}
            </p>
            <hr />
            <h3 className="text-center text-info">Tastes</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {prefs}
              </div>
            </div>
            <hr />
            <h3 className="text-center text-info">Ratings</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {isEmpty(this.state.usermovieratings) ? (
                  <p className="lead text-info">
                    <span>{firstName} has not rated a movie</span>
                  </p>
                ) : (<ul className="list-group">
                  {ratings}
                </ul>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
