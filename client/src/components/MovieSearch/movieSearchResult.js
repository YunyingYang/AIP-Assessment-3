import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MovieItem from "./movieItem"; //写一个给每个电影的UI框架
import { withRouter } from "react-router-dom";
import { getMovies } from "../../actions/searchActions";

class MovieSearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      movies: {}
    };
  }

  componentDidMount() {
    // 下面三行用来set redux state
    if (this.props.match.params.search_content) {
      this.props.getMovies(this.props.match.params.search_content);
    }

    //axios用来获取数据库数据，然后付给this.state
    //这个大概没用，我还没想清楚，先留着 _🐹
    axios
      .post(`/api/movies/search/${this.props.match.search_content}`)
      .then(res => {
        this.setState({ movies: res.data });
      })
      .catch(err => {
        console.log("cannot get movie by get api/movies/mvdetails/:movie_id");
      });
  }

  render() {
    const { movies } = this.props.search;
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

    return <div className="col-md-12 container-fluid">{movieItems}</div>;
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
