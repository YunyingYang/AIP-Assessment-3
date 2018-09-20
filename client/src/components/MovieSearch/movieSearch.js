import React, { Component } from "react";
import PropTypes from "prop-types";
// import classnames from "classnames";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MovieItem from "./movieItem"; //写一个给每个电影的UI框架
// import { getMovies } from "../../actions/searchActions";
import { withRouter } from "react-router-dom";
// import ad1 from "../../images/ad_sample1.jpg";

class MovieSearch extends Component {
  constructor() {
    super();
    this.state = {
      // name: '',
      // email: '',
      // password: '',
      // password2: '',
      errors: {}
      // searchResult: []
    };

    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // this.props.getProfiles();
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
          <MovieItem key={movie._id} movie={movie} />
        ));
      } else {
        movieItems = <h4>No movies found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p> */}
              {movieItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieSearch.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
  getMovies: PropTypes.func
};

const mapStateToProps = state => ({
  search: state.search
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(MovieSearch));
