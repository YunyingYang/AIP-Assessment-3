import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

import TextFieldGroup from "../Common/TextFieldGroup";
import TextAreaFieldGroup from "../Common/TextAreaFieldGroup";
import SelectListGroup from "../Common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      location: "",
      status: "",
      bio: "",
      prefs: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // If user does not have a profile
      if (Object.keys(profile).length === 0) {
        this.props.history.push("/create-profile");
      } else {
        // If profile field doesnt exist, make empty string
        profile.location = !isEmpty(profile.location) ? profile.location : "";
        profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

        // Set component fields state
        this.setState({
          handle: profile.handle,
          location: profile.location,
          status: profile.status,
          bio: profile.bio,
          prefs: profile.prefs
        });
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      location: this.state.location,
      status: this.state.status,
      bio: this.state.bio,
      prefs: this.state.prefs
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheckChange(checkedValues) {
    this.setState({ prefs: checkedValues });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: "* Select Movie Lover Status", value: 0 },
      { label: "Not interested", value: "Not interested" },
      { label: "Movie novice", value: "Movie novice" },
      { label: "Movie lover", value: "Movie lover" },
      { label: "Fanatic", value: "Fanatic" },
      { label: "Other", value: "Other" }
    ];

    const prefsOptions = [
      { label: "Drama", value: "Drama" },
      { label: "Comedy", value: "Comedy" },
      { label: "Romance", value: "Romance" },
      { label: "Animation", value: "Animation" },
      { label: "Children", value: "Children" },
      { label: "Adventure", value: "Adventure" },
      { label: "Fantasy", value: "Fantasy" },
      { label: "Action", value: "Action" },
      { label: "Crime", value: "Crime" },
      { label: "Thriller", value: "Thriller" },
      { label: "Horror", value: "Horror" },
      { label: "Mystery", value: "Mystery" },
      { label: "Sci-Fi", value: "Sci-Fi" },
      { label: "War", value: "War" },
      { label: "Musical", value: "Musical" },
      { label: "Documentary", value: "Documentary" },
      { label: "IMAX", value: "IMAX" },
      { label: "Western", value: "Western" },
      { label: "Film-Noir", value: "Film-Noir" }
    ];

    return (
      <div className="create-profile">
        <div
          className="container alert alert-dismissible alert-secondary"
          style={{ maxWidth: "50rem" }}
        >
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/dashboard" className="btn btn-secondary">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <hr />
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, nickname, etc."
                />
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Sydney, Melbourne)"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of how much you like movies"
                />
                <TextAreaFieldGroup
                  placeholder="* Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="checkboxes">
                  <Checkbox.Group
                    options={prefsOptions}
                    value={this.state.prefs}
                    onChange={this.onCheckChange}
                  />
                  <small className="form-text text-muted">
                    Which movie genres would you prefer
                  </small>
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-secondary btn-block mt-4"
                />
                <br />
              </form>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
