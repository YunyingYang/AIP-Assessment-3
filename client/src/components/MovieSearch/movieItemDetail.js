import React, { Component } from "react";
import axios from "axios";
import { Router, Route, Switch, Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./movieSearch.css";
import { getMovieItemTmdb } from "../../actions/searchActions";

class MovieItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieTmdb: {}
    };
    // this.toggleMovieDetail = this.toggleMovieDetail.bind(this);
  }

  componentDidMount() {
    const { movieTmdb, movie } = this.props.search;
    this.setState({ movieTmdb: movieTmdb });
    // const { movie } = this.props.search;
    // this.props.getMovieItemTmdb(movie);
  }

  render() {
    const { movie } = this.props.search;

    const picBaseUrl = new URL(
      "http://image.tmdb.org/t/p/w185_and_h278_bestv2/"
    );

    return (
      <div className="card w-100 border-warning">
        <table className="table">
          <tbody>
            <tr>
              <th scope="col" style={{ width: "30%" }}>
                {/* <img
                  className="card-img pic_size2"
                  src={picBaseUrl + movieTmdb.poster_path}
                  alt="Card image cap"
                /> */}
              </th>
              <th scope="row" style={{ width: "70%" }}>
                <div className="card-body">
                  <h5 className="text-left black">{movie.title}</h5>{" "}
                  <h6 className="text-left text-muted">{movie.genres}</h6>
                  <br />
                  <h6 className="text-left black">
                    Runtime: {this.state.movieTmdb.runtime} min
                  </h6>
                  <h6 className="text-left black">
                    Release Date: {this.state.movieTmdb.release_date}
                  </h6>
                  <br />
                  <h6
                    className="text-left black"
                    style={{ fontSize: "8px", color: "grey" }}
                  >
                    Overview: {this.state.movieTmdb.overview}
                  </h6>
                  <br />
                  <h6 className="text-left black">
                    Average Vote: {this.state.movieTmdb.vote_average} ( Vote
                    Account: {this.state.movieTmdb.vote_count})
                  </h6>
                </div>
              </th>
            </tr>
            <tr>
              {/* {genres.length > 0 ? (
                <ul className="list-group">{genres[0]}</ul>
              ) : (
                <p className="text-center">No genres Listed</p>
              )} */}
              {/* <div className="Video">
                <iframe
                  id="ytplayer"
                  type="text/html"
                  width="420"
                  height="300"
                  src="https://www.youtube.com/embed/CGzKnyhYDQI?autoplay=1&origin=https://www.youtube.com/watch?v=Q-z0csLnwxU"
                  frameBorder="0"
                />
              </div> */}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

MovieItemDetail.propTypes = {
  // movie: PropTypes.object.isRequired,
  // movies: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  getMovieItemTmdb: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // auth: state.auth
  search: state.search
});

export default connect(
  mapStateToProps,
  { getMovieItemTmdb }
)(withRouter(MovieItemDetail));
