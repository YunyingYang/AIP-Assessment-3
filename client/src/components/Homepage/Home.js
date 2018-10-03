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
      movies: {} // array of 13 movies
    };
  }

  componentDidMount() {
    // get all newest movies (2016) from db
    axios
      .get("/api/movies/home")
      .then(res => {
        // shuffle the response and get a sub-array of first 13 results
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 13);
        this.setState({ movies: selected });
      })
      .catch(err => console.log("Home: cannot get movies from mongoDB"));

    //get daily trending movies from tmdb
    // const url = new URL(
    //     "https://api.themoviedb.org/3/trending/movie/day?api_key=9ff347d908a575c777ebecebe3fdcf6b"
    // );
    //
    // axios
    //     .get(url)
    //     .then(res => {
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

        {/*登录以后就消失最上面的carousel，改成recom for you -- 测试 --*/}
        {/*<h5 className="text-white">Recommend For You</h5>*/}
        {/*<div className="card-deck">*/}
        {/*<MovieCardSmall movie={this.state.movies[7]} />*/}
        {/*<MovieCardSmall movie={this.state.movies[8]} />*/}
        {/*<MovieCardSmall movie={this.state.movies[9]} />*/}
        {/*<MovieCardSmall movie={this.state.movies[10]} />*/}
        {/*<MovieCardSmall movie={this.state.movies[11]} />*/}
        {/*<MovieCardSmall movie={this.state.movies[12]} />*/}
        {/*</div>*/}
        {/*<br />*/}
        {/*<h6 className="text-right">More...</h6>*/}
        {/*<br />*/}
        {/*<br />*/}

        <h5 className="text-white">Trending Movies</h5>
        <div className="card-deck">
          <MovieCardLarge movie={this.state.movies[0]} />
          <MovieCardLarge movie={this.state.movies[1]} />
        </div>
        <br />
        <br />
        <div className="card-deck">
          <MovieCardMedium movie={this.state.movies[2]} />
          <MovieCardMedium movie={this.state.movies[3]} />
          <MovieCardMedium movie={this.state.movies[4]} />
        </div>
        <br />
        <h6 className="text-right text-white">More...</h6>
        <br />
        <br />

        <h5 className="text-white">People Also Like...</h5>
        <div className="card-deck">
          <MovieCardLarge movie={this.state.movies[5]} />
          <MovieCardLarge movie={this.state.movies[6]} />
        </div>
        <br />
        <br />
        <div className="card-deck">
          <MovieCardSmall movie={this.state.movies[7]} />
          <MovieCardSmall movie={this.state.movies[8]} />
          <MovieCardSmall movie={this.state.movies[9]} />
          <MovieCardSmall movie={this.state.movies[10]} />
          <MovieCardSmall movie={this.state.movies[11]} />
          <MovieCardSmall movie={this.state.movies[12]} />
        </div>
        <br />
        <h6 className="text-right text-white">More...</h6>
        <br />
        <br />
      </div>
    );
  }
}

export default Home;
