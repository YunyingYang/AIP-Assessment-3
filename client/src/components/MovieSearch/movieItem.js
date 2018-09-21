import React, { Component } from "react";
import axios from "axios";
import { Router, Route, Switch, Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./movieSearch.css";
import { getMovieItem } from "../../actions/searchActions";

class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tmdbDetail: {}
    };
    this.toggleMovieDetail = this.toggleMovieDetail.bind(this);
  }

  componentDidMount() {
    const { movie } = this.props;

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
        this.setState({ tmdbDetail: res.data });
      })
      .catch(err => this.setState(console.log("cannot find from tmdb")));

    axios.defaults.headers.common["Authorization"] = authheader;
  }

  // After click link, switch to mv detail page.
  toggleMovieDetail() {
    const { movie } = this.props;
    //在里面写action
    this.props.getMovieItem(movie);
  }

  render() {
    const { movie } = this.props;

    const picBaseUrl = new URL(
      "http://image.tmdb.org/t/p/w185_and_h278_bestv2/"
    );

    return (
      <div className="card w-100 border-warning">
        <table className="table">
          <tbody>
            <tr>
              <th scope="col" style={{ width: "30%" }}>
                <img
                  className="card-img pic_size1"
                  src={picBaseUrl + this.state.tmdbDetail.poster_path}
                  alt="Card image cap"
                />
              </th>
              <th scope="row" style={{ width: "70%" }}>
                <div className="card-body">
                  <Link to="/mvdetails" onClick={this.toggleMovieDetail}>
                    <h5 className="text-left black">{movie.title}</h5>
                  </Link>
                  <h6 className="text-left text-muted">{movie.genres}</h6>
                  <h6 className="text-left black">
                    Runtime: {this.state.tmdbDetail.runtime} min
                  </h6>
                  <h6 className="text-left black">
                    Release Date: {this.state.tmdbDetail.release_date}
                  </h6>
                  <h6
                    className="text-left black"
                    style={{ fontSize: "8px", color: "grey" }}
                  >
                    Overview: {this.state.tmdbDetail.overview}
                  </h6>
                  <h6 className="text-left black">
                    Average Vote: {this.state.tmdbDetail.vote_average} ( Vote
                    Account: {this.state.tmdbDetail.vote_count})
                  </h6>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  getMovieItem: PropTypes.func
};

const mapStateToProps = state => ({
  // auth: state.auth
  search: state.search
});

export default connect(
  mapStateToProps,
  { getMovieItem }
)(withRouter(MovieItem));
