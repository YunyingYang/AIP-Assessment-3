import React, { Component } from "react";
import axios from "axios";

import Carousel from './Carousel';
import MovieCardLarge from './MovieCardLarge';
import MovieCardMedium from './MovieCardMedium';
import MovieCardSmall from './MovieCardSmall';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            movies: {}
        }
    };

    componentDidMount() {

        //get the daily trending movies
        const url = new URL(
            "https://api.themoviedb.org/3/trending/movie/day?api_key=9ff347d908a575c777ebecebe3fdcf6b"
        );

        axios
            .get(url)
            .then(res => {
                console.log(res.data);
                this.setState({ movies: res.data.results });
            })
            .catch(err => console.log("cannot get trending movies"));
    }

    render() {
        // it's gonna render the 1st time when page loads & will re-render after getting response
        // only after getting response can it pass data to child
        // so at the 1st time this.state is undefined
        if (!this.state.movies[0])
            return <div>Loading...</div>;

        return (
            <div>
                <Carousel />
                <br />
                <br />

                <h5>Trending Movies</h5>
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
                <h6 className="text-right">More...</h6>
                <br />
                <br />

                <h5>People also like...</h5>
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
                <h6 className="text-right">More...</h6>

                <br />
                <br />
            </div>
        );
    }
}

export default Home;
