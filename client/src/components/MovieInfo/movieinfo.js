import React, { Component } from 'react';
import Details from '../MovieDetail/movieDetails';
import MovieList from '../MovieList/movieList';


class MovieInfo extends Component {



  render(){
    return(
      <div>

        <MovieList/>
        <br/>

        <Details />
        <br/>

      </div>
    );
  }
}

export default MovieInfo;
