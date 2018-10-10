import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { getProfiles } from "../../actions/profileActions";
import Spinner from "../Common/Spinner";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount() {
    if (this.props.page) {
      this.props.getProfiles(this.props.page);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.profile.profiles === null && this.props.profile.loading) {
  //     this.props.history.push("/Not-found");
  //   }
  // }

  render() {
    const { profiles, loading, totalPages } = this.props.profile;

    // display user profiles
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

    // display pagination only if there are more than one page
    let pagination = null;

    if (totalPages > 1) {
      let currentPage = this.props.page;
      let firstPage, lastPage, previousPages, nextPages;
      let pageArray = [];

      //the first page button <<
      if (currentPage === "1") {
        firstPage = (
          <li className="page-item disabled">
            <a className="page-link text-dark">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only"> First </span>
            </a>
          </li>
        );
      } else {
        firstPage = (
          <li className="page-item">
            <a className="page-link text-dark" href={"/profiles/1"}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only"> First </span>
            </a>
          </li>
        );
      }
      //the last page button >>
      if (parseInt(currentPage, 10) === parseInt(totalPages, 10)) {
        lastPage = (
          <li className="page-item disabled">
            <a className="page-link text-dark">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only"> Last </span>
            </a>
          </li>
        );
      } else {
        lastPage = (
          <li className="page-item">
            <a className="page-link text-dark" href={`/profiles/${totalPages}`}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only"> Last </span>
            </a>
          </li>
        );
      }

      // previous button ...
      var i = currentPage > 4 ? currentPage - 3 : 1;
      if (i !== 1) {
        previousPages = (
          <li className="page-item disabled">
            <a className="page-link text-dark">...</a>
          </li>
        );
      }
      // next button ...
      if (i < totalPages - 6) {
        nextPages = (
          <li className="page-item disabled">
            <a className="page-link text-dark">...</a>
          </li>
        );
      }

      // other pages displayed
      for (
        i;
        i <= parseInt(currentPage, 10) + 3 && i <= parseInt(totalPages, 10);
        i++
      ) {
        if (i === parseInt(currentPage, 10)) {
          pageArray.push(
            <li className="page-item active" key={i}>
              <a className="page-link text-dark">{i}</a>
            </li>
          );
        } else {
          pageArray.push(
            <li className="page-item" key={i}>
              <a className="page-link text-dark" href={`/profiles/${i}`}>
                {i}
              </a>
            </li>
          );
        }
      }

      // the whole pagination bar
      pagination = (
        <ul className="pagination text-center justify-content-center">
          {firstPage}
          {previousPages}
          {pageArray}
          {nextPages}
          {lastPage}
        </ul>
      );
    }

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
