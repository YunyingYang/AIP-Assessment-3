import React, { Component } from "react";
import axios from "axios";
import { Router, Route, Switch, Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./movieSearch.css";

class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tmdbDetail: {}
    };
  }

  componentDidMount() {
    const { movie } = this.props;
    let config = {
      header: {
        header1: "X-RateLimit"
      }
    };
    const url = new URL(
      "https://api.themoviedb.org/3/movie/" +
        movie.tmdbId +
        "?api_key=9ff347d908a575c777ebecebe3fdcf6b&language=en-US"
    );

    axios
      .get(url, config)
      .then(res => {
        console.log(res.data);
        this.setState({ tmdbDetail: res.data });
      })
      .catch(err => this.setState(console.log("cannot find from tmdb")));
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
              <th scope="col">
                <img
                  className="card-img pic_size1"
                  src={picBaseUrl + this.state.tmdbDetail.poster_path}
                  alt="Card image cap"
                />
              </th>
              <th scope="row">
                <div className="card-body">
                  <h5 className="text-left black">{movie.title}</h5>
                  <h6 className="text-left text-muted">{movie.genres}</h6>
                  <h6 className="text-left black">
                    Runtime: {this.state.tmdbDetail.runtime} min
                  </h6>
                  <h6 className="text-left black">
                    Release Date: {this.state.tmdbDetail.release_date}
                  </h6>
                  <h6 className="text-left black">
                    Runtime: {this.state.tmdbDetail.runtime}
                  </h6>
                  <h6 className="text-left black">
                    Release Date: {this.state.tmdbDetail.release_date}
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
  movie: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(MovieItem));
