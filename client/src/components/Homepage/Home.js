import React, { Component } from "react";
import axios from "axios";

import Carousel from "./Carousel";
import MovieCardLarge from "./MovieCardLarge";
import MovieCardMedium from "./MovieCardMedium";
import MovieCardSmall from "./MovieCardSmall";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      movies: {} // array of 13 movies from db
    };
  }

  componentDidMount() {
    // randomly get 13 movies from db
    axios
      .get("/api/movies/home")
      .then(res => {
        // shuffle the response and get get sub-array of first 13 results
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 13);
        this.setState({ movies: selected });
      })
      .catch(err => console.log("cannot get homepage movies"));

    //get daily trending movies
    // const url = new URL(
    //     "https://api.themoviedb.org/3/trending/movie/day?api_key=9ff347d908a575c777ebecebe3fdcf6b"
    // );
    //
    // axios
    //     .get(url)
    //     .then(res => {
    //         console.log(res.data);
    //         this.setState({ movies: res.data.results });
    //     })
    //     .catch(err => console.log("cannot get trending movies"));
  }

  render() {
    // it's gonna render the 1st time when page loads & will re-render after getting response
    // only after getting response can it pass data to child
    // so at the 1st time this.state is undefined
    if (!this.state.movies[0]) return <div>Loading...</div>;

    return (
      <div>
        <Carousel />
        <br />
        <br />

        <h5>Trending Movies</h5>
        <div className="card-deck">
          <MovieCardLarge
            id={this.state.movies[0]._id}
            movie={this.state.movies[0]}
          />
          <MovieCardLarge
            id={this.state.movies[1]._id}
            movie={this.state.movies[1]}
          />
        </div>
        <br />
        <br />

        {/*<div className="card-deck">*/}
        {/*<MovieCardMedium id={this.state.movies[2]._id} movie={this.state.movies[2]} />*/}
        {/*<MovieCardMedium id={this.state.movies[3]._id} movie={this.state.movies[3]} />*/}
        {/*<MovieCardMedium id={this.state.movies[4]._id} movie={this.state.movies[4]} />*/}
        {/*</div>*/}
        {/*<br />*/}
        {/*<h6 className="text-right">More...</h6>*/}
        {/*<br />*/}
        {/*<br />*/}

        {/*<h5>People also like...</h5>*/}
        {/*<div className="card-deck">*/}
        {/*<MovieCardLarge id={this.state.movies[5]._id} movie={this.state.movies[5]} />*/}
        {/*<MovieCardLarge id={this.state.movies[6]._id} movie={this.state.movies[6]} />*/}
        {/*</div>*/}
        <br />
        <br />
        <div className="card-deck">
          <MovieCardSmall
            id={this.state.movies[7]._id}
            movie={this.state.movies[7]}
          />
          <MovieCardSmall
            id={this.state.movies[8]._id}
            movie={this.state.movies[8]}
          />
          <MovieCardSmall
            id={this.state.movies[9]._id}
            movie={this.state.movies[9]}
          />
          <MovieCardSmall
            id={this.state.movies[10]._id}
            movie={this.state.movies[10]}
          />
          <MovieCardSmall
            id={this.state.movies[11]._id}
            movie={this.state.movies[11]}
          />
          <MovieCardSmall
            id={this.state.movies[12]._id}
            movie={this.state.movies[12]}
          />
        </div>
        <br />
        <h6 className="text-right">More...</h6>

        <br />
        <br />
      </div>
    );
  }
}

export default Home;
