import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

// each profile card in user profiles list
class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-3">
            <img
              src={profile.user.avatar}
              alt="avatar"
              className="rounded-circle"
            />
          </div>
          <div className="col-lg-5 col-md-4 col-7 .col-xs-5 col-md-offset-2">
            <h3>{profile.user.name}</h3>
            <h4>
              {profile.status}{" "}
              {isEmpty(profile.location) ? null : (
                <span>at {profile.location}</span>
              )}
            </h4>
            <Link to={`/profile/${profile.handle}`} className="btn btn-dark">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Tastes</h4>
            <ul className="list-group">
              {profile.prefs.map((pref, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-heart pr-1 text-danger" />
                  {pref}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
