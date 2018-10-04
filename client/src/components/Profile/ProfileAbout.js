import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import axios from "axios";
import { Link } from "react-router-dom";

class ProfileAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usermovieratings: []
    };
  }

  componentDidMount() {
    axios
      .get(`/api/usermovieratings/user/${this.props.user._id}`)
      .then(res => {
        this.setState({ usermovieratings: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { profile } = this.props;
    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    // Skill List
    const prefs = profile.prefs.map((pref, index) => (
      <div key={index} className="p-3 alert alert-dismissible alert-secondary">
        <i className="fa fa-heart text-danger" /> &nbsp;
        {pref}
        &nbsp;
      </div>
    ));

    const ratings = this.state.usermovieratings.map(
      (usermovierating, index) => (
        <Link
          to={`/api/movies/mvdetails/${usermovierating.movie._id}`}
          key={index}
        >
          <li className="p-3 alert alert-dismissible alert-secondary d-flex justify-content-between">
            <span>
              <i className="fa fa-eye" />
              &nbsp;
              {usermovierating.movie.title}
            </span>
            <span>&nbsp;</span>
            <span className="badge badge-pill badge-dark">
              {usermovierating.rating}
            </span>
          </li>
        </Link>
      )
    );

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-dark">
              {firstName}
              's Bio
            </h3>
            <p className="lead text-secondary">
              {isEmpty(profile.bio) ? (
                <span>
                  &nbsp;
                  <i className="fa fa-frown text-dark" />
                  &nbsp;&nbsp;
                  {firstName} does not have a bio
                </span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-dark">Tastes</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {prefs}
              </div>
            </div>
            <hr />
            <h3 className="text-center text-dark">Ratings</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                <div className="lead text-secondary">
                  {isEmpty(this.state.usermovieratings) ? (
                    <span>
                      &nbsp;
                      <i className="fa fa-frown text-dark" />
                      &nbsp;&nbsp;&nbsp;
                      {firstName} has not rated a movie
                    </span>
                  ) : (
                    <ul className="list-group">{ratings}</ul>
                  )}
                </div>
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
