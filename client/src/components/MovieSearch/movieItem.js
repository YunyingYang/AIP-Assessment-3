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
      tmdbResult: {}
    };
  }

  componentDidMount() {
    const { movie } = this.props;
    const url = new URL(
      "https://api.themoviedb.org/3/movie/" +
        movie.tmdbId +
        "?api_key=9ff347d908a575c777ebecebe3fdcf6b&language=en-US"
    );
    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        this.setState({ tmdbResult: res.data });
      })
      .catch(err => this.setState(console.log("cannot find from tmdb")));
  }

  render() {
    const { movie } = this.props;

    const picBaseUrl = new URL(
      "http://image.tmdb.org/t/p/w185_and_h278_bestv2/"
    );

    return (
      <div className="card w-75 border-warning mb-3" style={{ width: "18rem" }}>
        <tr>
          <th>
            <img
              className="card-img-left pic_size1"
              src={picBaseUrl + this.state.tmdbResult.poster_path}
              alt="Card image cap"
            />
          </th>
          <th>
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{movie.genres}</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>

              {/* <a href="#" className="card-link">
            Card link
          </a>
          <a href="#" className="card-link">
            Another link
          </a> */}
            </div>
          </th>
        </tr>
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
