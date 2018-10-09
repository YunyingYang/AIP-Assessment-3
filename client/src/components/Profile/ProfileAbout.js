import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import isEmpty from "../../validation/is-empty";

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
      .catch(err => console.log("This user has not rated movie"));
  }

  render() {
    const { profile } = this.props;
    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    const prefs = profile.prefs.map((pref, index) => (
      <div key={index} className="p-3 alert alert-dismissible alert-secondary">
        <i className="fa fa-heart text-danger" /> &nbsp;
        {pref}
        &nbsp;
      </div>
    ));

    const ratings = this.state.usermovieratings.map(
      (usermovierating, index) => (
        <div key={index} className="col-md-12">
          <div className="card p-3 bg-light mb-3 col-md-12 w-100">
            <Link to={`/api/movies/mvdetails/${usermovierating.movie._id}`}>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <span className="badge badge-pill badge-dark">
                <ReactStars
                  count={5}
                  size={15}
                  value={usermovierating.rating / 2}
                  color2={"#ffd700"}
                />
              </span>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <span className="text-muted">
                &nbsp;
                {usermovierating.movie.title}
              </span>
            </Link>
          </div>
        </div>
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
              <div className="d-flex flex-wrap justify-content-center align-items-center w-100">
                {prefs}
              </div>
            </div>
            <hr />
            <h3 className="text-center text-dark">Ratings</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center w-100">
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
