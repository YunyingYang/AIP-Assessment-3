import React, {Component} from 'react';
import FanartTvApi from "fanart.tv-api";

import Star from './Star';
import img from '../../images/1.jpg';

const style = {
    width: '400px',
    height: '500px'
};

class MovieCardLarge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: {}
        };
    }

    componentDidMount() {
        // get movie stills
        const fanart = new FanartTvApi({
            apiKey: "33f74d6cff548383dab95ca4f8901333"
        });

        fanart.getMovieImages(this.props.movie.id)
            .then(res => {
                console.log(res);
                this.setState({ images: res.moviebackground[0] });
            })
            .catch(err => console.log("cannot get movie stills"));
    }

    render() {
        const imgURL = this.state.images.url;

        return (
        <div className="card bg-light text-black" style={style}>
            <img className="card-img-top" src={imgURL} alt="movie poster" />
            <div className="card-body">
                <h5 className="card-title">{this.props.movie.title}</h5>
                <Star className="mr-3" rate={this.props.movie.vote_average} />
                <p className="card-text">{this.props.movie.overview}</p>
            </div>
        </div>
        );
    }
}

export default MovieCardLarge;
