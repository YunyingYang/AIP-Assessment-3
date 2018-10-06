import React, { Component } from "react";
import axios from "axios";
// import { Router, Route, Switch, Link, withRouter } from "react-router-dom";
import { withRouter, Link } from "react-router-dom";
import ReactStars from "react-stars";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./movieSearch.css";
import {
  getMovieByMvId,
  getMovieItemTmdb,
  saveSingleTmdb
} from "../../actions/searchActions";
import isEmpty from "../../validation/is-empty";

class MovieItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      movieTmdb: {},
      videoKey: null,
      casts: [],
      rating: 0,
      ratings: [],
      errors: {}
    };
    this.getTmdbData_detail = this.getTmdbData_detail.bind(this);
    this.getTmdbData_video = this.getTmdbData_video.bind(this);
    this.getTmdbData_cast = this.getTmdbData_cast.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.movie_id) {
      this.props.getMovieByMvId(this.props.match.params.movie_id);
    }

    axios
      .get(`/api/usermovieratings/users/${this.props.match.params.movie_id}`)
      .then(res => {
        this.setState({ ratings: res.data });
      })
      .catch(err => {
        console.log("cannot get movie ratings");
      });

    axios
      .get(`/api/movies/mvdetails/${this.props.match.params.movie_id}`)
      .then(res => {
        this.setState({ movie: res.data });
        this.getTmdbData_detail(res.data);
        this.getTmdbData_video(res.data);
        this.getTmdbData_cast(res.data);
      })
      .catch(err => {
        console.log("cannot get movie by get api/movies/mvdetails/:movie_id");
      });

    axios
      .get(`/api/usermovieratings/${this.props.match.params.movie_id}`)
      .then(res => {
        this.setState({ rating: res.data.rating });
      })
      .catch(err => console.log(err));

    getMovieItemTmdb(this.state.movie);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

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

  getTmdbData_cast(movie) {
    const url = new URL(
      "https://api.themoviedb.org/3/movie/" +
        movie.tmdbId +
        "/credits?api_key=9ff347d908a575c777ebecebe3fdcf6b"
    );
    // To prevent the Authorization fighting with tmdb api, delete it before axios get.
    const authheader = axios.defaults.headers.common["Authorization"] || null;
    delete axios.defaults.headers.common["Authorization"];
    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        this.setState({ casts: res.data.cast });
        // this.props.saveSingleTmdb(res.data);
      })
      .catch(err => this.setState(console.log("cannot find from tmdb")));
    axios.defaults.headers.common["Authorization"] = authheader;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeRating(newRating) {
    this.setState({
      rating: newRating * 2
    });
    const userRatingData = {
      movieID: this.props.match.params.movie_id,
      rating: newRating * 2
    };
    axios
      .post("/api/usermovieratings", userRatingData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  render() {
    const { movie, movieTmdb, videoKey } = this.state;

    // const { errors } = this.state;

    const { isAuthenticated } = this.props.auth;
    // const { isAuthenticated, user } = this.props.auth;

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
    } else {
      videoUrl = 0;
    }

    let casts = this.state.casts;
    let castImg;
    let castName;

    if (casts === null) {
      //删了||loading
      // movieItems = <Spinner />;
    } else {
      if (casts.length > 0) {
        castImg = casts.map(cast => (
          <img
            key={cast.cast_id}
            src={picBaseUrl + cast.profile_path}
            alt={cast.name}
            style={{ width: "140px", height: "195px" }}
          />
        ));
      } else {
        castImg = <h4>No casts found...</h4>;
      }
    }

    if (casts === null) {
      //删了||loading
      // movieItems = <Spinner />;
    } else {
      if (casts.length > 0) {
        castName = casts.map(cast => <h6 key={cast.cast_id}>{cast.name} </h6>);
      } else {
        castName = <h4>No casts found...</h4>;
      }
    }

    const voteForm = (
      <div>
        <br />
        <h6 className="text-left black">Rating for this movie: </h6>
        <ReactStars
          count={5}
          onChange={this.changeRating}
          size={24}
          value={this.state.rating / 2}
          color2={"#ffd700"}
        />
      </div>
    );

    const ratings = this.state.ratings.map((rating, index) => (
      <li key={index} className="p-3 list-group-item d-flex">
        <ReactStars
          count={5}
          size={22}
          value={rating.rating / 2}
          color2={"#ffd700"}
          edit={false}
        />
        <p>&nbsp;&nbsp;by&nbsp;</p>
        <Link to={`/profile/user/${rating.user._id}`}>
          <h4 className="text-dark">
            &nbsp;
            {rating.user.name}
          </h4>
        </Link>
      </li>
    ));

    return (
      <div className="container">
        <div className="row">
          {/* 第一个card */}
          <div className="col-md-12">
            <div className="card col-md-12 p-3">
              <div className="row">
                <div className="col-md-4">
                  <img
                    className="card-img pic_size2 w-100"
                    src={picBaseUrl + movieTmdb.poster_path}
                    alt="movie poster"
                  />
                  {/* <img
                  className="w-100"
                  src="https://via.placeholder.com/350x350"
                /> */}
                </div>
                <div className="col-md-8">
                  <div className="card-block">
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
                      style={{ fontSize: "14px", color: "grey" }}
                    >
                      Overview: {movieTmdb.overview}
                    </h6>
                    <br />
                    <h6 className="text-left black">
                      Average Vote: {movieTmdb.vote_average} ( Vote Account:{" "}
                      {movieTmdb.vote_count})
                    </h6>
                    {isAuthenticated ? voteForm : null}
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
          {/* 第2个card */}
          <div className="col-md-12">
            <div className="card col-md-12 p-3">
              <h5 className="card-header">- About Casts -</h5>

              <div className="row">
                <div className="col-md-12">
                  <div className="card-block">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-2">
                          <div className="card">
                            <div className="card-img">{castImg[0]}</div>
                            {castName[0]}
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="card">
                            <div className="card-img">{castImg[1]}</div>
                            {castName[1]}
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="card">
                            <div className="card-img">{castImg[2]}</div>
                            {castName[2]}
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="card">
                            <div className="card-img">{castImg[3]}</div>
                            {castName[3]}
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="card">
                            <div className="card-img">{castImg[4]}</div>
                            {castName[4]}
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="card">
                            <div className="card-img">{castImg[5]}</div>
                            {castName[5]}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <a href="https://www.google.com" className="btn btn-primary">
                    read more...
                  </a> */}
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
          {/* 第3个card */}
          <div className="col-md-12">
            <div className="card col-md-12 p-3">
              <h5 className="card-header">- Trailer -</h5>
              <br />
              <div className="row">
                <div className="col-md-1" />
                <div className="col-md-10">
                  {videoKey !== null ? (
                    <div className="trailer">
                      <iframe
                        title="youtube_trailer"
                        id="ytplayer"
                        type="text/html"
                        width="960"
                        height="540"
                        src={videoUrl}
                        frameBorder="0"
                      />
                    </div>
                  ) : (
                    <div className="trailer">
                      <p>The trailer of this video has not been collected.</p>
                    </div>
                  )}
                  <div className="col-md-1" />
                </div>
              </div>
              <br />
            </div>
            <br />
          </div>
          {/* 第4个card */}
          <div className="col-md-12">
            <div className="card col-md-12 p-3">
              <h5 className="card-header">- Users' rating -</h5>

              <div className="row">
                <div className="col-md-12">
                  <div className="card-block">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="review-rating-div" id="rating">
                            {isEmpty(this.state.ratings) ? (
                              <span>
                                &nbsp;
                                <i className="fa fa-frown text-dark" />
                                &nbsp;&nbsp;&nbsp; This movie has not been rated
                                by a Filmtopia user
                              </span>
                            ) : (
                              <ul className="list-group">{ratings}</ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

MovieItemDetail.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  movie: PropTypes.object,
  movieTmdb: PropTypes.object,
  loading: PropTypes.object,
  // search: PropTypes.object.isRequired,
  getMovieByMvId: PropTypes.func.isRequired,
  getMovieItemTmdb: PropTypes.func,
  saveSingleTmdb: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  search: state.search
});

export default connect(
  mapStateToProps,
  { getMovieByMvId, getMovieItemTmdb, saveSingleTmdb }
)(withRouter(MovieItemDetail));
