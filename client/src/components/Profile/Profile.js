import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import Spinner from "../Common/Spinner";
import {
  getProfileByHandle,
  getProfileByUserId
} from "../../actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    if (this.props.handle) {
      this.props.getProfileByHandle(this.props.handle);
    }
    if (this.props.user_id) {
      this.props.getProfileByUserId(this.props.user_id);
    }
  }

  // check if user exists
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/Not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { isAuthenticated, user } = this.props.auth;
    let profileContent;

    // edit profile button
    const editYourProfile = (
      <div className="edit-your-profile-button">
        <Link to="/edit-profile" className="btn btn-light mb-3 float-left">
          <i className="fa fa-edit" />
          Edit Profile
        </Link>
      </div>
    );

    // display spinner before get res from back end
    // display profile page for logged in user
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else if (Object.keys(profile).length > 0) {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
              {isAuthenticated && profile.user && user.id === profile.user._id
                ? editYourProfile
                : null}
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} user={profile.user} />
          <br />
          <br />
          <br />
        </div>
      );
    } else {
      profileContent = <Spinner />;
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

// for redux
Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getProfileByUserId: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, getProfileByUserId }
)(Profile);
