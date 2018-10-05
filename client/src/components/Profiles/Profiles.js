import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profileActions";
import { Link, withRouter } from "react-router-dom";



class Profiles extends Component {
  constructor(props) {
    super(props);

    //  not used -----
    this.state = {
      currentPage: 1
    };
  }

  componentDidMount() {
      if (this.props.page) {
          this.props.getProfiles(this.props.page);
      }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profiles === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profiles, loading, totalPages } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }


    // test pagination ------------------

    let pagination = null;
    // display pagination only if there are more than one page
    if (totalPages > 1 && totalPages <= 5) {
      let first, last;
      let currentPage = this.state.currentPage;
      //the first button <<
      if (currentPage === 1) {
        first = (
          <li className="page-item disabled">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only"> First </span>
          </li>
        );
      } else {
        first = (
          <li className="page-item">
            <Link to="/profiles/1">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only"> First </span>
            </Link>
          </li>
        );
      }
      // the last button >>
      if (currentPage === totalPages) {
        last = (
          <li className="page-item disabled">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only"> Last </span>
          </li>
        );
      } else {
        last = (
          <li className="page-item">
            <Link to={`/profiles/${totalPages}`}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only"> Last </span>
            </Link>
          </li>
        );
      }

      // create an array: length = totalPages, each element = each page, e.g. [1, 2, 3]
      let pageArray = Array(totalPages)
        .fill()
        .map((v, i) => i + 1);
      // map array to create each button in pagination
      let pages = pageArray.map(page => (
        <li className="page-item" key={page}>
          <Link to={`/profiles/${page}`}> {page} </Link>
        </li>
      ));

      // the whole pagination bar
      pagination = (
        <ul className="pagination text-center justify-content-center">
          {first}
          {pages}
          {last}
        </ul>
      );
    }
    // else{} 还要写一个如果总page大于5， 只显示当前page左右五个页面，完了再搞

    return (
      <div className="profiles">
        <div className="container alert alert-dismissible alert-secondary">
          <div className="row">
            <div className="col-md-12">
              <h1
                className="display-4 text-center"
                style={{ color: "#030303" }}
              >
                Movie Lover Profiles
              </h1>
              <p className="lead text-center">Find others with same tastes!</p>
              <hr />
              {profileItems}
              <br />
              {pagination}
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

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(withRouter(Profiles));
