import React, { Component } from "react";
import axios from "axios";
import { Router, Route, Switch, Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./movieSearch.css";
import {
  getMovieByMvId,
  getMovieItemTmdb,
  saveSingleTmdb
} from "../../actions/searchActions";

class MovieItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      movieTmdb: {},
      videoKey: null
    };
    this.getTmdbData_detail = this.getTmdbData_detail.bind(this);
    this.getTmdbData_video = this.getTmdbData_video.bind(this);
  }

  componentWillMount() {
    if (this.props.match.params.movie_id) {
      this.props.getMovieByMvId(this.props.match.params.movie_id);
    }

    axios
      .get(`/api/movies/mvdetails/${this.props.match.params.movie_id}`)
      .then(res => {
        this.setState({ movie: res.data });
        this.getTmdbData_detail(res.data);
        this.getTmdbData_video(res.data);
      })
      .catch(err =>
        console.log("cannot get movie by get api/movies/mvdetails/${movie_id}")
      );
  }

  componentDidMount() {
    getMovieItemTmdb(this.state.movie);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.search.movie === null && this.props.search.loading) {
  //     this.props.history.push("/not-found");
  //   }
  // }

  getTmdbData_detail(movie) {
    const url = new URL(
      "https://api.themoviedb.org/3/movie/" +
        movie.tmdbId +
        "?api_key=9ff347d908a575c777ebecebe3fdcf6b&language=en-US"
    );
    // To prevent the Authorization fighting with tmdb api, delete it before axios get.
    const authheader = axios.defaults.headers.common["Authorization"] || null;
    delete axios.defaults.headers.common["Authorization"];
    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        this.setState({ movieTmdb: res.data });
        this.props.saveSingleTmdb(res.data);
      })
      .catch(err => this.setState(console.log("cannot find from tmdb")));
    axios.defaults.headers.common["Authorization"] = authheader;
  }

  getTmdbData_video(movie) {
    const url = new URL(
      "https://api.themoviedb.org/3/movie/" +
        movie.tmdbId +
        "/videos?api_key=9ff347d908a575c777ebecebe3fdcf6b&language=en-US"
    );
    // To prevent the Authorization fighting with tmdb api, delete it before axios get.
    const authheader = axios.defaults.headers.common["Authorization"] || null;
    delete axios.defaults.headers.common["Authorization"];
    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        this.setState({ videoKey: res.data.results[0].key });
        // this.props.saveSingleTmdb(res.data);
      })
      .catch(err => this.setState(console.log("cannot find from tmdb")));
    axios.defaults.headers.common["Authorization"] = authheader;
  }

  render() {
    const { movie, movieTmdb, videoKey } = this.state;

    const picBaseUrl = new URL(
      "http://image.tmdb.org/t/p/w185_and_h278_bestv2/"
    );

    var videoUrl = 0;
    if (videoKey !== null) {
      videoUrl = new URL(
        "https://www.youtube.com/embed/" +
          videoKey +
          "?autoplay=1&origin=http://example.com"
      );
      {
        /* <iframe id="ytplayer" type="text/html" width="640" height="360"
      src="http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
      frameborder="0"/> */
      }
    } else {
      videoUrl = 0;
    }

    return (
      <div className="card w-75 border-warning">
        <table className="table">
          <tbody>
            <tr>
              <th scope="col" style={{ width: "30%" }}>
                <img
                  className="card-img pic_size2"
                  src={picBaseUrl + movieTmdb.poster_path}
                  alt="Card image cap"
                />
              </th>
              <th scope="row" style={{ width: "70%" }}>
                <div className="card-body">
                  <h5 className="text-left black">{movie.title}</h5>{" "}
                  <h6 className="text-left text-muted">{movie.genres}</h6>
                  <br />
                  <h6 className="text-left black">
                    Runtime: {movieTmdb.runtime} min
                  </h6>
                  <h6 className="text-left black">
                    Release Date: {movieTmdb.release_date}
                  </h6>
                  <br />
                  <h6
                    className="text-left black"
                    style={{ fontSize: "8px", color: "grey" }}
                  >
                    Overview: {movieTmdb.overview}
                  </h6>
                  <br />
                  <h6 className="text-left black">
                    Average Vote: {movieTmdb.vote_average} ( Vote Account:{" "}
                    {movieTmdb.vote_count})
                  </h6>
                </div>
              </th>
            </tr>
            <tr>
              <th>
                <h1>{movie.title} Trailer: </h1>
              </th>
              <th>
                {videoKey !== null ? (
                  <div className="trailer">
                    <iframe
                      id="ytplayer"
                      type="text/html"
                      width="1280"
                      height="720"
                      src={videoUrl}
                      frameBorder="0"
                    />
                  </div>
                ) : (
                  <div className="trailer">
                    <p5>The trailer of this video has not been collected.</p5>
                  </div>
                )}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

MovieItemDetail.propTypes = {
  movie: PropTypes.object.isRequired,
  movieTmdb: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  // search: PropTypes.object.isRequired,
  getMovieByMvId: PropTypes.func.isRequired,
  getMovieItemTmdb: PropTypes.func,
  saveSingleTmdb: PropTypes.func
};

const mapStateToProps = state => ({
  // auth: state.auth
  search: state.search
});

export default connect(
  mapStateToProps,
  { getMovieByMvId, getMovieItemTmdb, saveSingleTmdb }
)(withRouter(MovieItemDetail));
