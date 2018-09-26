import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Carousel from './Carousel';
import MovieCardLarge from './MovieCardLarge';
import MovieCardMedium from './MovieCardMedium';
import MovieCardSmall from './MovieCardSmall';
import MovieItem from "../MovieSearch/movieItem";
import axios from "axios";
import FanartTvApi from 'fanart.tv-api';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            movies: {}
        }
    };

    componentWillMount() {

//         const fanart = new FanartTvApi({
//             apiKey: "33f74d6cff548383dab95ca4f8901333",
//         });
//
// // An example of all the available functions chained together.
//         fanart.getMovieImages('10195')
//             .then(res => {
//             console.log(res);
//             // return fanart.getLatestMoviesImages();
//             })
//             .catch(err => console.error(err));

        //get the weekly trending movies
        const url = new URL(
            "https://api.themoviedb.org/3/trending/movie/week?api_key=9ff347d908a575c777ebecebe3fdcf6b"
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
        console.log(this.state.movies);

        return (
            <div>
                <Carousel/>
                <br/>
                <br/>

                <h5>Trending Movies</h5>
                <div className="card-deck">
                    <MovieCardLarge movie={this.state.movies[0]}/>
                    <MovieCardLarge movie={this.state.movies[1]}/>

                </div>
                <br/>
                <br/>
                <div className="card-deck">
                    <MovieCardMedium movie={this.state.movies[2]}/>
                    <MovieCardMedium movie={this.state.movies[3]}/>
                    <MovieCardMedium movie={this.state.movies[4]}/>
                </div>
                <br/>
                <h6 className="text-right">More...</h6>
                <br/>
                <br/>

                <h5>People also like...</h5>
                <div className="card-deck">
                    <MovieCardLarge movie={this.state.movies[5]}/>
                    <MovieCardLarge movie={this.state.movies[6]}/>
                </div>
                <br/>
                <br/>
                <div className="card-deck">
                    <MovieCardSmall movie={this.state.movies[7]}/>
                    <MovieCardSmall movie={this.state.movies[8]}/>
                    <MovieCardSmall movie={this.state.movies[9]}/>
                    <MovieCardSmall movie={this.state.movies[10]}/>
                    <MovieCardSmall movie={this.state.movies[11]}/>
                    <MovieCardSmall movie={this.state.movies[12]}/>
                </div>
                <br/>
                <h6 className="text-right">More...</h6>

                <br/>
                <br/>
            </div>
        );
    }
}

export default Home;
