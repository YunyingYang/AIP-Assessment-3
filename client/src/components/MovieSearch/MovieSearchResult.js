import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { getMovies } from "../../actions/searchActions";
import MovieItem from "./MovieItem";
import Spinner from "../Common/Spinner";

class MovieSearchResult extends Component {
  componentDidMount() {
    // set redux state
    if (this.props.search_content && this.props.page) {
      this.props.getMovies(this.props.search_content, this.props.page);
    }
  }

  render() {
    const { movies, totalPages } = this.props.search;

    // display movie items
    let movieItems;
    if (movies === null) {
      return <Spinner />;
    } else {
      if (movies.length > 0) {
        movieItems = movies.map(movie => (
          <div key={movie._id}>
            <MovieItem key={movie._id} movie={movie} />
            <br />
          </div>
        ));
      } else {
        movieItems = <h4 className="text-muted">No movies found...</h4>;
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
            <a
              className="page-link text-dark"
              href={`/api/movies/search/${this.props.search_content}/1`}
            >
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
            <a
              className="page-link text-dark"
              href={`/api/movies/search/${
                this.props.search_content
              }/${totalPages}`}
            >
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
              <a
                className="page-link text-dark"
                href={`/api/movies/search/${this.props.search_content}/${i}`}
              >
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
      <div className="col-md-12 container-fluid">
        {movieItems}
        <br />
        {pagination}
      </div>
    );
  }
}

MovieSearchResult.propTypes = {
  auth: PropTypes.object,
  getMovies: PropTypes.func
};

const mapStateToProps = state => ({
  search: state.search
});

export default connect(
  mapStateToProps,
  { getMovies }
)(withRouter(MovieSearchResult));
