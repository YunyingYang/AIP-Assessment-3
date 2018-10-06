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
          let firstPage, lastPage, previousPages, nextPages;
          let currentPage = this.props.page;

          console.log("current page");
          console.log(currentPage);

          //the first button <<
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
          // the last button >>
          // !!! should use == don't change to ===   by Mio
          if (currentPage == totalPages) {
              lastPage = (
                  <li className="page-item disabled">
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

          let pageArray = [];
          let i = currentPage > 5 ? currentPage - 4 : 1;
          // add a "..." button between "<<" and "currentPage - 4"  to indicate there are other pages
          if (i !== 1) {
            previousPages = (
                <li className="page-item disabled">
                  <span>...</span>
                </li>
            );
          }

          // create an array of all pages will be showed in pagination bar
          for (; i <= currentPage + 4 && i < totalPages; i++) {
            pageArray.push(i);
          }

          console.log("test - page array");
          console.log(pageArray);

          // // map array to create each button in pagination
          // let pages = pageArray.map(function(page) {
          //
          //   // if (pageArray.indexOf(page) === currentPage + 4 && pageArray.indexOf(page) < totalPages) {
          //   //   nextPages = (
          //   //       <li className="page-item disabled">
          //   //           <span>...</span>
          //   //       </li>
          //   //   );
          //   // }
          //
          //   if (page === currentPage) {
          //     return (
          //         <li className="page-item disabled" key={page}>
          //             <span>{page}</span>
          //         </li>
          //     );
          //   } else {
          //     return (
          //         <li className="page-item" key={page}>
          //             <Link to={`/api/movies/search/${this.props.search_content}/${page}`}>{page}</Link>
          //         </li>
          //     );
          //   }
          // });



          // the whole pagination bar
          pagination = (
              <ul className="pagination text-center justify-content-center">
                  {firstPage}
                  {previousPages}
                  {/*{pages}*/}
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
