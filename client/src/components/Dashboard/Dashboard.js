import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import axios from "axios";
import isEmpty from "../../validation/is-empty";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usermovieratings: [],
      user: this.props.auth.user
    };
    this.onClickDelete = this.onClickDelete.bind(this); //！
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    axios
      .get(`/api/usermovieratings/user/${this.state.user.id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ usermovieratings: res.data });
      })
      .catch(err => console.log(err));
  }

  onClickDelete(id) {
    axios
      .delete(`/api/usermovieratings/${id}`)
      .then(res => {
        console.log(res.data);
        axios
          .get(`/api/usermovieratings/user/${this.state.user.id}`)
          .then(res => {
            console.log(res.data);
            this.setState({ usermovieratings: res.data });
          })
          .catch(err => console.log(err));
        // var ratingArray = this.state.usermovieratings;
        // var removeIndex = ratingArray.map(function (rating) { return rating.id; })
        //     .indexOf(id);
        // ratingArray.splice(removeIndex, 1);
        // this.setState({ usermovieratings: ratingArray })
        //TODO:删除页面上的条目或者rerender？
      })
      .catch(err => this.setState(console.log("cannot delete")));
  }

  render() {
    //const { user } = this.props.auth;
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
              Welcome,&nbsp;
              <Link to={`/profile/${profile.handle}`}>
                <span className="text-dark">{this.state.user.name}</span>
              </Link>
            </p>
            <Link to="/edit-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-dark mr-1" /> Edit Profile
            </Link>
            <div style={{ marginBottom: "60px" }} />
          </div>
        );
      } else {
        // User is logged in but has no profile
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
    const ratings = this.state.usermovieratings.map(
      (usermovierating, index) => (
        <div key={index} className="p-3 card bg-light mb-3">
          <button
            type="button"
            className="close"
            onClick={() => this.onClickDelete(usermovierating.movie._id)}
          >
            <i className="fa fa-minus-circle" />
          </button>
          <Link to={`/api/movies/mvdetails/${usermovierating.movie._id}`}>
            <span className="text-muted">
              &nbsp;
              {usermovierating.movie.title}
            </span>
            <span>&nbsp;</span>
            <span className="badge badge-pill badge-secondary">
              {usermovierating.rating}
            </span>
          </Link>
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
              <h3 className="text-center text-dark">Manage Your Ratings</h3>
              <div className="row">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {isEmpty(this.state.usermovieratings) ? (
                    <div className="text-dark text-center">
                      &nbsp;
                      <i className="fa fa-frown text-dark" />
                      &nbsp;&nbsp;
                      {this.state.user.name} has not rated a movie
                    </div>
                  ) : (
                    <ul className="list-group">{ratings}</ul>
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
