import React, {Component} from 'react';
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Star from './Star';
import img from '../../images/2.jpg';

const style = {
    width: '400px',
    height: '400px'
};


class MovieCardLarge extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        console.log(this.props.movie);

        // var movie = this.props.movie;
        // console.log(movie);
    }


// {
//     "adult": false,
//     "backdrop_path": "/96B1qMN9RxrAFu6uikwFhQ6N6J9.jpg",
//     "genre_ids": [
//         28,
//         12,
//         878
//         ],
//     "id": 348350,
//     "original_language": "en",
//     "original_title": "Solo: A Star Wars Story",
//     "overview": "Through a series of daring escapades deep within a dark and dangerous criminal underworld, Han Solo meets his mighty future copilot Chewbacca and encounters the notorious gambler Lando Calrissian.",
//     "poster_path": "/3IGbjc5ZC5yxim5W0sFING2kdcz.jpg",
//     "release_date": "2018-05-15",
//     "title": "Solo: A Star Wars Story",
//     "video": false,
//     "vote_average": 6.7,
//     "vote_count": 1782,
//     "popularity": 223.512
// },


    render() {

        const imageURL = new URL(
            "http://image.tmdb.org/t/p/w185_and_h278_bestv2"
        );

        return (
            <div className="card bg-light text-black" style={style}>
                {/*<img className="card-img-top" src={imageURL + movie.poster_path} alt="movie poster" />*/}
                <img className="card-img-top" src={img} alt="movie poster" />
                <div className="card-body">
                    {/*<h5 className="card-title">{movie.title}</h5>*/}
                    {/*<Star className="mr-3" rate={movie.vote_average} />*/}
                    {/*/!*<p className="card-text">{this.props.genres}</p>*!/*/}
                    {/*<p className="card-text">{movie.overview}</p>*/}
                </div>
            </div>
        );
    }
}

export default MovieCardLarge;
