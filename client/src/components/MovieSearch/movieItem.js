import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import isEmpty from '../../validation/is-empty';

class MovieItem extends Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="card w-75 border-info mb-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{movie.genres}</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>

          {/* <a href="#" className="card-link">
            Card link
          </a>
          <a href="#" className="card-link">
            Another link
          </a> */}
        </div>
      </div>
    );
  }
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired
};

export default MovieItem;
