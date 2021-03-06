import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactStars from "react-stars";
import axios from "axios";

import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../Common/Spinner";
import isEmpty from "../../validation/is-empty";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usermovieratings: [],
      user: this.props.auth.user
    };
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  // get user profile from database
  componentDidMount() {
    this.props.getCurrentProfile();
    axios
      .get(`/api/usermovieratings/user/${this.state.user.id}`)
      .then(res => {
        this.setState({ usermovieratings: res.data });
      })
      .catch(err => console.log("This user has not created a profile"));
  }

  // delete user's rating record of a movie
  onClickDelete(id) {
    axios
      .delete(`/api/usermovieratings/${id}`)
      .then(res => {
        axios
          .get(`/api/usermovieratings/user/${this.state.user.id}`)
          .then(res => {
            this.setState({ usermovieratings: res.data });
          })
          .catch(err => console.log("Error: cannot delete user rating"));
      })
      .catch(err => this.setState(console.log("Error: cannot delete user rating")));
  }

  render() {
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
          dashboardContent = (
              <div className="text-center">
                  <p className="lead text-secondary">
                      Welcome {this.state.user.name} ,&nbsp;click&nbsp;
                      <Link to={`/profile/${profile.handle}`}>
                          <span className="text-info">HERE</span>
                      </Link>
                      &nbsp;to view your profile page.
                  </p>
                  <br/>
                  <Link to="/edit-profile" className="btn btn-light">
                      <i className="fas fa-user-circle text-dark mr-1"/> Edit Profile
                  </Link>
                  <div style={{marginBottom: "60px"}}/>
              </div>
          );
      } else {
        //User is logged in but has no profile
        dashboardContent = (
          <div className="text-center">
            <p className="lead">Welcome {this.state.user.name}</p>
            <p className="text-muted">
              You have not yet setup a profile, please tell us a little about
              your self
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-dark">
              <i className="fa fa-edit" />
              Create Profile
            </Link>
          </div>
        );
      }
    }
    // show all movies the user has rated with ratings
    const ratings = this.state.usermovieratings.map(
      (usermovierating, index) => (
        <div key={index} className="col-md-12">
          <div className="card p-3 bg-light mb-3 col-md-12 w-100">
            <button
              type="button"
              className="close"
              onClick={() => this.onClickDelete(usermovierating.movie._id)}
            >
              <i className="fa fa-minus-circle" />
            </button>
            <Link to={`/api/movies/mvdetails/${usermovierating.movie._id}`}>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <span className="badge badge-pill badge-dark">
                <ReactStars
                  count={5}
                  size={15}
                  value={usermovierating.rating / 2}
                  color2={"#ffd700"}
                  edit={false}
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
      <div className="dashboard">
        <div
          className="container alert alert-dismissible alert-secondary"
          style={{ maxWidth: "50rem" }}
        >
          <div className="row">
            <div className="col-md-12" style={{ padding: "10px" }}>
              <h1 className="display-4 text-center">Dashboard</h1>
              <hr />
              {dashboardContent}
              <hr />
              <h2 className="text-info">&nbsp;&nbsp;Manage Your Ratings:</h2>
              <br />
              <div className="row">
                  {/* check if user has rated movies and render content accordingly */}
                <div className="d-flex flex-wrap justify-content-center align-items-center w-100">
                  {isEmpty(this.state.usermovieratings) ? (
                    <div className="text-dark text-center">
                      &nbsp;
                      <i className="fa fa-frown text-dark" />
                      &nbsp;&nbsp;
                      {this.state.user.name} has not rated any movie
                    </div>
                  ) : (
                    <ul className="list-group w-100">{ratings}</ul>
                  )}
                </div>
              </div>
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

// for redux
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
