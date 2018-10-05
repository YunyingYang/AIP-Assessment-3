import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MovieItem from "./movieItem"; //写一个给每个电影的UI框架
import {Link, withRouter} from "react-router-dom";
import { getMovies } from "../../actions/searchActions";
import Spinner from "../common/Spinner";
import ProfileItem from "../Profiles/ProfileItem";

class MovieSearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      movies: {},
        currentPage: 1
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
  }

  render() {
    const { movies, totalPages } = this.props.search;

    // test
      console.log("client -- test- -- all search results");
      console.log(movies);
      console.log(totalPages);


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

      ////////////////////////////////////
      // test pagination ------------------
      console.log("movie ---  component --- test");
      console.log(this.props.search);



      let pagination = null;
      // display pagination only if there are more than one page
      //还要写一个  大于1小于5    和  大于5
      if (totalPages >= 1 ) {
          let first, last;
          let currentPage = this.state.currentPage;
          //the first button <<
          if (currentPage === 1) {
              first = (
                  <li className="page-item disabled" >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only"> First </span>
                  </li>
              );
          } else {
              first = (
                  <li className="page-item">
                      <Link to={`/api/movies/search/${this.props.search_content}/1`}>
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
                      <Link to={`/api/movies/search/${this.props.search_content}/${totalPages}`}>
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
                  <Link to={`/api/movies/search/${this.props.search_content}/${page}`}> {page} </Link>
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
