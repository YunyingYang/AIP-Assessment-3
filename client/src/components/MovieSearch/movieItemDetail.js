import React, { Component } from "react";
import axios from "axios";
// import { Router, Route, Switch, Link, withRouter } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactStars from "react-stars";
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
      videoKey: null,
      casts: [],
      rating: 0,
      errors: {}
    };
    this.getTmdbData_detail = this.getTmdbData_detail.bind(this);
    this.getTmdbData_video = this.getTmdbData_video.bind(this);
    this.getTmdbData_cast = this.getTmdbData_cast.bind(this);
    this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.movie_id) {
      this.props.getMovieByMvId(this.props.match.params.movie_id);
    }

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

  // componentDidMount() {
  //   getMovieItemTmdb(this.state.movie);
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    console.log(userRatingData);
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
            className="rounded-circle"
            src={picBaseUrl + cast.profile_path}
            alt={cast.name}
            style={{ width: "113px", height: "160px" }}
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
      <ReactStars
        count={5}
        onChange={this.changeRating}
        size={24}
        value={this.state.rating / 2}
        color2={"#ffd700"}
      />
    );

    return (
      // {/* <div className="profiles"> */}
      //   {/* <div className="container">
      //     <div className="row">
      //       <div className="col-md-12"> */}
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th scope="col" style={{ width: "30%" }}>
                <br />
                <img
                  className="card-img pic_size2"
                  src={picBaseUrl + movieTmdb.poster_path}
                  alt="movie poster"
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
                  {isAuthenticated ? voteForm : null}
                </div>
              </th>
            </tr>

            <tr>
              <th>
                <br />
                <h1>Casts:</h1>{" "}
              </th>
              <th>
                <br />
                <tr>
                  <th>
                    {castImg[0]}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    {castImg[1]}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    {castImg[2]}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    {castImg[3]}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    {castImg[4]}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    {castImg[5]}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                </tr>
                <tr>
                  <th>
                    {castName[0]}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    {castName[1]}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    {castName[2]}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    {castName[3]}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    {castName[4]}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    {castName[5]}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                </tr>
              </th>
            </tr>

            <tr>
              <th>
                <br />
                <h1>{movie.title} Trailer: </h1>
              </th>
              <th>
                <br />
                {videoKey !== null ? (
                  <div className="trailer">
                    <iframe
                      title="youtube_trailer"
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
      //     {/* </div> */}
      //     {/* </div> */}
      //   {/* </div> */}
      // {/* </div> */}
    );
  }
}

MovieItemDetail.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  movieTmdb: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
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
