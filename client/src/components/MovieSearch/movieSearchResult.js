import React, { Component } from "react";
import { connect } from "react-redux";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import { getMovies } from "../../actions/searchActions";
import MovieItem from "./movieItem"; //写一个给每个电影的UI框架
import ProfileItem from "../Profiles/ProfileItem";
import Spinner from "../common/Spinner";


class MovieSearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      movies: {},
    };
  }

  componentDidMount() {
    // 下面三行用来set redux state
    if (this.props.search_content && this.props.page) {
      this.props.getMovies(this.props.search_content, this.props.page);
    }


    //axios用来获取数据库数据，然后付给this.state
    //这个大概没用，我还没想清楚，先留着 _🐹
    // axios
    //   .post(`/api/movies/search/${this.props.match.search_content}`)
    //   .then(res => {
    //     this.setState({ movies: res.data });
    //   })
    //   .catch(err => {
    //     console.log("cannot get movie by get api/movies/mvdetails/:movie_id");
    //   });
    //
  }

  render() {
    const { movies, totalPages } = this.props.search;

    // display movie items
      let movieItems;
      if (movies === null) {
        //删了||loading
        // movieItems = <Spinner />;
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
                  <li className="page-item disabled" >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only"> First </span>
                  </li>
              );
          } else {
              firstPage = (
                  <li className="page-item">
                      <Link to={`/api/movies/search/${this.props.search_content}/1`}>
                          <span aria-hidden="true">&laquo;</span>
                          <span className="sr-only"> First </span>
                      </Link>
                  </li>
              );
          }

          //the last page button >>
          if (currentPage == totalPages) {
              lastPage = (
                  <li className="page-item disabled" >
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only"> Last </span>
                  </li>
              );
          } else {
              lastPage = (
                  <li className="page-item">
                      <Link to={`/api/movies/search/${this.props.search_content}/${totalPages}`}>
                          <span aria-hidden="true">&raquo;</span>
                          <span className="sr-only"> Last </span>
                      </Link>
                  </li>
              );
          }

          // other pages displayed
          var i = currentPage > 4 ? currentPage - 3 : 1;
          if (i !== 1) {
              previousPages = (
                  <li className="page-item disabled">
                      <span>prev...</span>
                  </li>
              );
          }

          if (i < totalPages - 6) {
              nextPages = (
                  <li className="page-item disabled">
                      <span>next...</span>
                  </li>
              );
          }

          for (; i <= parseInt(currentPage) + 3 && i <= parseInt(totalPages); i++) {
            if (i == currentPage) {
              pageArray.push(
                  <li className="page-item active" key={i}>
                      <span>{i}</span>
                  </li>
              );
            } else {
              pageArray.push(
                  <li className="page-item" key={i}>
                      <Link to={`/api/movies/search/${this.props.search_content}/${i}`}>{i}</Link>
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
  // logoutUser: PropTypes.func.isRequired,
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
